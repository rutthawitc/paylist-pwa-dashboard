# Next.js 16 Upgrade Guide

This guide provides step-by-step instructions for upgrading the Paylist PWA Dashboard from Next.js 14.2.4 to Next.js 16.

## Prerequisites

- Node.js 18.18 or higher (recommended: Node.js 20+)
- Basic understanding of React and Next.js
- Backup of your current project

## Step 1: Update Dependencies

### Update Next.js and React

```bash
npm install next@latest react@latest react-dom@latest
```

### Update TypeScript (if needed)

```bash
npm install typescript@latest @types/node@latest
```

### Update other related dependencies

```bash
npm install @tanstack/react-table@latest
npm install next-auth@latest
npm install @prisma/client@latest
npm install prisma@latest
```

## Step 2: Update package.json

Update your `package.json` with the new versions:

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-table": "^8.20.0",
    "next-auth": "^5.0.0",
    "@prisma/client": "^5.17.0",
    "prisma": "^5.17.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^20.17.0"
  }
}
```

## Step 3: Update Next.js Configuration

### Update `next.config.js`

Next.js 16 introduces new configuration options and deprecates some older ones:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 improvements
  experimental: {
    // Enable server components by default (if using App Router)
    serverComponentsExternalPackages: [],
  },
  
  // Improved image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Enhanced output configuration
  output: 'standalone',
  
  // React strict mode (recommended)
  reactStrictMode: true,
  
  // New in Next.js 16: Enhanced SWC minification
  swcMinify: true,
  
  // App directory optimizations
  optimizePackageImports: [
    '@radix-ui/react-*',
    '@tanstack/react-table',
  ],
}

export default nextConfig
```

## Step 4: Update App Router Components

### Update Server Components

Next.js 16 has improved Server Components. Update your server components to use the latest patterns:

```typescript
// Before (Next.js 14)
export default async function Dashboard() {
  const data = await getData()
  return <div>{/* JSX */}</div>
}

// After (Next.js 16) - Enhanced with better caching
export const revalidate = 60 // Cache for 60 seconds

export default async function Dashboard() {
  const data = await getData({ cache: 'force-cache' })
  return <div>{/* JSX */}</div>
}
```

### Update Client Components

For client components using React state:

```typescript
'use client'

import { useState, useEffect } from 'react'
// Next.js 16: Use the new use action hook pattern where applicable
import { useFormState } from 'react-dom'

export function DataTable() {
  // Use the new patterns for better performance
  const [data, setData] = useState([])
  
  useEffect(() => {
    // Enhanced data fetching
    fetchData().then(setData)
  }, [])
  
  return <div>{/* Component JSX */}</div>
}
```

## Step 5: Update Authentication

### Update NextAuth Configuration

Next.js 16 has improved security features. Update your auth configuration:

```typescript
// auth.config.ts
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    // Your providers
  ],
  // Enhanced security in Next.js 16
  session: {
    strategy: 'jwt',
    maxAge: 45 * 60, // 45 minutes
    updateAge: 15 * 60, // Update session every 15 minutes
  },
  // Improved JWT configuration
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  // Enhanced callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user
      }
      return session
    },
    // New in Next.js 16: Enhanced authorization callback
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isOnProtectedPage = request.nextUrl.pathname.startsWith('/protected')
      
      if (isOnProtectedPage && !isLoggedIn) {
        return false
      }
      
      return true
    }
  }
} satisfies NextAuthConfig
```

## Step 6: Update Database Configuration

### Update Prisma Configuration

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Enhanced database connection for Next.js 16
export const db = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// Export types for better TypeScript support
export * from '@prisma/client'
```

## Step 7: Update API Routes

### Enhanced API Route Pattern

```typescript
// app/api/audit-logs/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const logs = await db.auditLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        userId: session.user.id
      }
    })
    
    const total = await db.auditLog.count({
      where: {
        userId: session.user.id
      }
    })
    
    return NextResponse.json({
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch logs' }, 
      { status: 500 }
    )
  }
}
```

## Step 8: Update Build Configuration

### Update PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'paylist-pwa-dashboard',
      script: './.next/standalone/server.js',
      cwd: './.next/standalone',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Next.js 16 optimizations
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      // Enhanced monitoring
      monitoring: true,
      // Better error handling
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
}
```

## Step 9: Update Environment Variables

### Enhanced Environment Configuration

```env
# Next.js 16 specific variables
NEXT_TELEMETRY_DISABLED=1

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/paylist?schema=public"

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Notification Settings
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
LINE_NOTIFY_TOKEN=your-line-notify-token

# App Settings
NODE_ENV=production
LOG_LEVEL=info

# New in Next.js 16: Enhanced image optimization
NEXT_IMAGE_ALLOWED_HOSTS=http://localhost:3000,https://your-domain.com

# Caching configuration
NEXT_CACHE_MAX_AGE=3600
```

## Step 10: Update TypeScript Configuration

### Enhanced `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/app/*": ["./src/app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Step 11: Test the Upgrade

### Run Development Server

```bash
npm run dev
```

### Run Build Process

```bash
npm run build
```

### Test Key Features

1. **Authentication**: Test login/logout functionality
2. **Data Tables**: Verify all data displays correctly
3. **File Upload**: Test HTML upload functionality
4. **API Routes**: Test all API endpoints
5. **Responsive Design**: Check mobile/desktop layouts

## Step 12: Production Deployment

### Build for Production

```bash
npm run build
```

### Start with PM2

```bash
npm run pm2:start
```

### Verify Deployment

- Check application logs
- Test all major functionality
- Monitor performance metrics

## Common Issues and Solutions

### Issue 1: TypeScript Errors

**Solution**: Update type definitions and check for breaking changes in dependencies.

### Issue 2: Build Failures

**Solution**: Clear build cache and reinstall dependencies:
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Issue 3: Runtime Errors

**Solution**: Check console for specific error messages and update deprecated APIs.

### Issue 4: Performance Issues

**Solution**: Enable Next.js 16 optimizations:
- Use `app/` directory for Server Components
- Implement proper caching strategies
- Optimize images with new format support

## Migration Checklist

- [ ] Update all dependencies to compatible versions
- [ ] Update Next.js configuration
- [ ] Migrate components to use new patterns
- [ ] Update authentication configuration
- [ ] Test all functionality thoroughly
- [ ] Update environment configuration
- [ ] Verify build process works
- [ ] Deploy to staging environment
- [ ] Perform final testing
- [ ] Deploy to production

## Additional Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Migration Guide](https://nextjs.org/docs/upgrading)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Performance Optimization](https://nextjs.org/docs/advanced-features/optimizing)

## Support

If you encounter issues during the upgrade process:

1. Check the [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
2. Review the [Next.js Discord](https://nextjs.org/discord)
3. Consult the [official documentation](https://nextjs.org/docs)
4. Check dependency-specific migration guides

---

**Note**: Always backup your project before performing major upgrades. Test thoroughly in a development environment before deploying to production.