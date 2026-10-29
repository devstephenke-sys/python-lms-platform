# Database Setup Guide

## Setting up Neon Postgres Database

### Option 1: Using Vercel Marketplace (Recommended for Vercel Deployment)

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Click "Add Database" → "Neon Postgres"
4. Follow the setup wizard to create a new database
5. Vercel will automatically add the `DATABASE_URL` environment variable

### Option 2: Using Neon Directly

1. Sign up at [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env.local` file:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

### Option 3: Using Prisma Postgres (Temporary/Development)

Run this command to create a temporary Prisma Postgres database (deletes after 24h unless claimed):

```bash
npx create-db
```

## Running Database Migrations

Once you have the `DATABASE_URL` set, run:

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Or for production
npx prisma migrate deploy
```

## Using Prisma Studio (Optional)

To view and edit your data:

```bash
npx prisma studio
```

## Environment Variables Required

Make sure your `.env.local` file contains:

```env
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

## Notes

- The `.env` file is gitignored for security
- Use `.env.local` for local development
- For Vercel deployment, use Vercel environment variables
- The database schema is defined in `prisma/schema.prisma`
