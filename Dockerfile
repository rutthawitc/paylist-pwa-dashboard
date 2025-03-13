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
ENV NEXTAUTH_SECRET=6PXH2hIl9/02wPJ3uOPYjT/gHTp6K61n+85vxkAFXz4=
ENV JWT_SECRET=6PXH2hIl9/02wPJ3uOPYjT/gHTp6K61n+85vxkAFXz4=
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
ENV NEXTAUTH_SECRET=6PXH2hIl9/02wPJ3uOPYjT/gHTp6K61n+85vxkAFXz4=
ENV JWT_SECRET=6PXH2hIl9/02wPJ3uOPYjT/gHTp6K61n+85vxkAFXz4=
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
