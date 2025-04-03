# คู่มือการใช้งาน Docker สำหรับโปรเจค Paylist PWA Dashboard

## สารบัญ

1. [การตั้งค่าไฟล์ Docker](#การตั้งค่าไฟล์-docker)
2. [การสร้าง Docker Image](#การสร้าง-docker-image)
3. [การเซฟและโอนย้าย Docker Image](#การเซฟและโอนย้าย-docker-image)
4. [การติดตั้งและรัน Docker Image บน Server](#การติดตั้งและรัน-docker-image-บน-server)
5. [การแก้ไขปัญหาที่พบบ่อย](#การแก้ไขปัญหาที่พบบ่อย)

---

## การตั้งค่าไฟล์ Docker

โปรเจคนี้ใช้ไฟล์หลัก 3 ไฟล์ในการตั้งค่า Docker:

### 1. Dockerfile

```dockerfile
# Base on Node.js Debian slim image for better Prisma compatibility
FROM node:20.18.3-slim AS base

# Set working directory
WORKDIR /app

# Install dependencies required for Prisma with Debian
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .

# Set consistent JWT environment variables during build
ENV NEXTAUTH_SECRET=your-secret-key
ENV JWT_SECRET=your-secret-key
ENV NEXTAUTH_URL=http://localhost:3000

# Generate Prisma client
RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Add a non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Set the correct permission for prerender cache
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Auth.js configuration
ENV NEXTAUTH_SECRET=your-secret-key
ENV JWT_SECRET=your-secret-key
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_URL_INTERNAL=http://localhost:3000
ENV AUTH_TRUST_HOST=true
ENV NEXTAUTH_COOKIE_DOMAIN=localhost
ENV NEXTAUTH_SECURE_COOKIE=false
ENV NEXTAUTH_COOKIE_PATH=/

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. docker-compose.yml

```yaml
services:
  paylist-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      # Database connection
      - DATABASE_URL=${DATABASE_URL}
      # Auth.js configuration
      - NEXTAUTH_SECRET=${AUTH_SECRET}
      - NEXTAUTH_URL=http://localhost:3000
      - AUTH_TRUST_HOST=true
      - NEXTAUTH_SECURE_COOKIE=false
    env_file:
      - .env
    restart: unless-stopped
```

### 3. .dockerignore

```
# Include any files or directories that you don't want to be copied to your
# container here.
.git
.github
docker-compose*

**/.DS_Store
**/node_modules
**/.pnp
**/.pnp.js

# testing
**/coverage

# next.js
**/.next/
**/out/
**/build
**/.swc/

# misc
**/.env
**/.env.local
**/.env.development.local
**/.env.test.local
**/.env.production.local

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**หมายเหตุ**: ไฟล์ `.env` ถูกเปลี่ยนจาก `.env*` ใน .dockerignore เพื่อให้สามารถใช้ไฟล์ .env ได้ในระหว่างการสร้าง container

---

## การสร้าง Docker Image

การสร้างและรัน Docker image สามารถทำได้ด้วยคำสั่ง Docker Compose:

```bash
# สร้างและรัน container
docker-compose up --build

# รันในโหมด detached (ทำงานเบื้องหลัง)
docker-compose up --build -d

# หยุดการทำงานของ container
docker-compose down
```

---

## การเซฟและโอนย้าย Docker Image

### การเซฟ Image เป็นไฟล์ .tar

```bash
# ตรวจสอบรายชื่อ image ที่มีอยู่
docker images

# เซฟ image เป็นไฟล์ .tar
docker save -o paylist-app.tar paylist-pwa-dashboard-paylist-app:latest
```

### การโอนย้ายไฟล์ไปยัง Server

```bash
# โอนไฟล์ .tar ไปยัง server
scp paylist-app.tar username@your-linux-server:/path/to/destination/

# โอนไฟล์ docker-compose.yml ไปยัง server
scp docker-compose.yml username@your-linux-server:/path/to/destination/
```

---

## การติดตั้งและรัน Docker Image บน Server

### 1. โหลด Image จากไฟล์ .tar

```bash
# เข้าสู่ server
ssh username@your-linux-server

# โหลด image จากไฟล์ .tar
docker load -i /path/to/destination/paylist-app.tar

# ตรวจสอบว่า image ถูกโหลดเรียบร้อย
docker images
```

### 2. สร้างไฟล์ docker-compose.yml บน Server

สร้างไฟล์ `docker-compose.yml` หรือแก้ไขไฟล์ที่โอนไปแล้ว:

```yaml
services:
  paylist-app:
    image: paylist-pwa-dashboard-paylist-app:latest
    ports:
      - '3000:3000' # หรือเปลี่ยนเป็น "80:3000" เพื่อใช้งานบนพอร์ต HTTP มาตรฐาน
    environment:
      - NODE_ENV=production
      # ข้อมูลการเชื่อมต่อฐานข้อมูล
      - DATABASE_URL=postgresql://username:password@hostname:port/database
      # การตั้งค่า Auth.js
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://your-domain-or-ip:3000
      - AUTH_TRUST_HOST=true
      - NEXTAUTH_SECURE_COOKIE=false
      # ค่าอื่นๆ ที่จำเป็น
      - NEXT_PUBLIC_APP_URL=http://your-domain-or-ip:3000
    restart: unless-stopped
```

### 3. รัน Docker Container

```bash
# รัน container
docker-compose up -d

# ตรวจสอบสถานะของ container
docker-compose ps

# ดูล็อกของ container
docker-compose logs -f
```

---

## การแก้ไขปัญหาที่พบบ่อย

### 1. ปัญหาการเชื่อมต่อฐานข้อมูล

ตรวจสอบว่า `DATABASE_URL` ถูกต้องและฐานข้อมูลสามารถเข้าถึงได้จาก Docker container:

```bash
# ตรวจสอบล็อกเพื่อหาข้อผิดพลาดเกี่ยวกับการเชื่อมต่อฐานข้อมูล
docker-compose logs | grep -i database
docker-compose logs | grep -i prisma
```

### 2. ปัญหา Auth.js

ปัญหาที่พบบ่อยเกี่ยวกับ Auth.js:

- **JWT Session Error**: ตรวจสอบว่าค่า `NEXTAUTH_SECRET` ตรงกันระหว่าง build time และ runtime
- **CSRF Error**: ตรวจสอบการตั้งค่า cookie และ CSRF token
- **URL Mismatch**: ตรวจสอบว่า `NEXTAUTH_URL` ชี้ไปที่ URL ที่ถูกต้อง

---

# Docker Usage Guide for Paylist PWA Dashboard

## Table of Contents

1. [Docker Configuration Files](#docker-configuration-files)
2. [Building Docker Image](#building-docker-image)
3. [Saving and Transferring Docker Image](#saving-and-transferring-docker-image)
4. [Installing and Running Docker Image on Server](#installing-and-running-docker-image-on-server)
5. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Docker Configuration Files

This project uses 3 main files for Docker configuration:

### 1. Dockerfile

```dockerfile
# Base on Node.js Debian slim image for better Prisma compatibility
FROM node:20.18.3-slim AS base

# Set working directory
WORKDIR /app

# Install dependencies required for Prisma with Debian
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .

# Set consistent JWT environment variables during build
ENV NEXTAUTH_SECRET=your-secret-key
ENV JWT_SECRET=your-secret-key
ENV NEXTAUTH_URL=http://localhost:3000

# Generate Prisma client
RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Add a non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Set the correct permission for prerender cache
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Auth.js configuration
ENV NEXTAUTH_SECRET=your-secret-key
ENV JWT_SECRET=your-secret-key
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_URL_INTERNAL=http://localhost:3000
ENV AUTH_TRUST_HOST=true
ENV NEXTAUTH_COOKIE_DOMAIN=localhost
ENV NEXTAUTH_SECURE_COOKIE=false
ENV NEXTAUTH_COOKIE_PATH=/

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. docker-compose.yml

```yaml
services:
  paylist-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      # Database connection
      - DATABASE_URL=${DATABASE_URL}
      # Auth.js configuration
      - NEXTAUTH_SECRET=${AUTH_SECRET}
      - NEXTAUTH_URL=http://localhost:3000
      - AUTH_TRUST_HOST=true
      - NEXTAUTH_SECURE_COOKIE=false
    env_file:
      - .env
    restart: unless-stopped
```

### 3. .dockerignore

```
# Include any files or directories that you don't want to be copied to your
# container here.
.git
.github
docker-compose*

**/.DS_Store
**/node_modules
**/.pnp
**/.pnp.js

# testing
**/coverage

# next.js
**/.next/
**/out/
**/build
**/.swc/

# misc
**/.env
**/.env.local
**/.env.development.local
**/.env.test.local
**/.env.production.local

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**Note**: The `.env` entry was changed from `.env*` in .dockerignore to allow using the .env file during container creation.

---

## Building Docker Image

Building and running the Docker image can be done with Docker Compose commands:

```bash
# Build and run container
docker-compose up --build

# Run in detached mode (background)
docker-compose up --build -d

# Stop container
docker-compose down
```

---

## Saving and Transferring Docker Image

### Saving Image as .tar File

```bash
# Check list of available images
docker images

# Save image as .tar file
docker save -o paylist-app.tar paylist-pwa-dashboard-paylist-app:latest
```

### Transferring Files to Server

```bash
# Transfer .tar file to server
scp paylist-app.tar username@your-linux-server:/path/to/destination/

# Transfer docker-compose.yml to server
scp docker-compose.yml username@your-linux-server:/path/to/destination/
```

---

## Installing and Running Docker Image on Server

### 1. Load Image from .tar File

```bash
# Login to server
ssh username@your-linux-server

# Load image from .tar file
docker load -i /path/to/destination/paylist-app.tar

# Verify image was loaded
docker images
```

### 2. Create docker-compose.yml on Server

Create a `docker-compose.yml` file or edit the transferred one:

```yaml
services:
  paylist-app:
    image: paylist-pwa-dashboard-paylist-app:latest
    ports:
      - '3000:3000' # or change to "80:3000" to use standard HTTP port
    environment:
      - NODE_ENV=production
      # Database connection
      - DATABASE_URL=postgresql://username:password@hostname:port/database
      # Auth.js configuration
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://your-domain-or-ip:3000
      - AUTH_TRUST_HOST=true
      - NEXTAUTH_SECURE_COOKIE=false
      # Other necessary values
      - NEXT_PUBLIC_APP_URL=http://your-domain-or-ip:3000
    restart: unless-stopped
```

### 3. Run Docker Container

```bash
# Run container
docker-compose up -d

# Check container status
docker-compose ps

# View container logs
docker-compose logs -f
```

---

## Troubleshooting Common Issues

### 1. Database Connection Issues

Verify that `DATABASE_URL` is correct and the database is accessible from the Docker container:

```bash
# Check logs for database connection errors
docker-compose logs | grep -i database
docker-compose logs | grep -i prisma
```

### 2. Auth.js Issues

Common issues with Auth.js:

- **JWT Session Error**: Check that `NEXTAUTH_SECRET` matches between build time and runtime
- **CSRF Error**: Verify cookie and CSRF token configuration
- **URL Mismatch**: Ensure `NEXTAUTH_URL` points to the correct URL
