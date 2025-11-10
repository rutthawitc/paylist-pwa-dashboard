# Paylist PWA Dashboard

A Progressive Web Application (PWA) dashboard for managing payment lists and notifications, built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔐 Authentication with NextAuth.js
- 📱 PWA Support (Offline Capabilities)
- 💬 Notification System (Telegram & Line Notify)
- 📊 Excel File Import/Export
- 🐳 Docker Containerization
- 🔍 Audit Logging
- 📱 Responsive Design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL or SQLite database
- Docker (for containerized deployment)

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/paylist-pwa-dashboard.git
   cd paylist-pwa-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 PM2 Deployment (Production)

### Prerequisites

- Node.js 18+ installed
- PM2 installed globally: `npm install -g pm2`
- PostgreSQL database accessible

### Deployment Steps

1. Clone and install dependencies:

   ```bash
   git clone https://github.com/your-username/paylist-pwa-dashboard.git
   cd paylist-pwa-dashboard
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.production.example .env
   # Edit .env with your production configuration
   ```

3. Run database migrations:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. Build the application:

   ```bash
   npm run build
   ```

5. Create logs directory:

   ```bash
   mkdir -p logs
   ```

6. Start with PM2:

   ```bash
   npm run pm2:start
   ```

### PM2 Management Commands

```bash
# Start the application
npm run pm2:start

# Stop the application
npm run pm2:stop

# Restart the application
npm run pm2:restart

# Reload with zero-downtime
npm run pm2:reload

# Delete from PM2
npm run pm2:delete

# View logs
npm run pm2:logs

# Monitor resources
npm run pm2:monit

# View PM2 status
pm2 status
```

### PM2 Auto-Startup

To ensure PM2 starts on system boot:

```bash
pm2 startup
pm2 save
```

### PM2 Configuration

The `ecosystem.config.js` file includes:
- **Cluster mode**: Utilizes all CPU cores
- **Auto-restart**: Restarts on crashes
- **Memory limit**: 1GB per instance
- **Log rotation**: Separate error/output logs
- **Zero-downtime reload**: Use `npm run pm2:reload`

## 🐳 Docker Deployment

### Prerequisites

- Docker Engine 20.10.0+
- Docker Compose 2.0.0+

### Using Docker Compose

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration.

3. Build and start the containers:

   ```bash
   docker-compose up --build -d
   ```

4. Access the application at [http://localhost:3000](http://localhost:3000)

### Building a Production Image

```bash
docker build -t paylist-pwa-dashboard:latest .
```

### Running the Production Image

```bash
docker run -p 3000:3000 --env-file .env paylist-pwa-dashboard:latest
```

## 📁 Project Structure

```text
.
├── app/                    # App Router
│   ├── (protected)/        # Protected routes
│   ├── api/                # API routes
│   └── auth/               # Authentication pages
├── components/             # Reusable components
│   ├── protected/          # Protected components
│   ├── ui/                 # UI components
│   └── ...
├── lib/                   # Utility functions
├── prisma/                # Database schema and migrations
├── public/                # Static files
└── schemas/               # Validation schemas
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/paylist?schema=public"

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Notification Settings
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
LINE_NOTIFY_TOKEN=your-line-notify-token

# App Settings
NODE_ENV=development
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
