# Database Migration Guide

## Overview

This guide explains how to migrate from SQLite to Neon Postgres for Vercel deployment.

## Changes Made

### 1. Prisma Schema
- Created `prisma/schema.prisma` with all models from SQLite
- Models: User, Progress, QuizAttempt, Certificate, CodeExecution
- Set up PostgreSQL datasource

### 2. New Database Files
- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/db/users-prisma.ts` - User management with Prisma
- `src/lib/db/progress-prisma.ts` - Progress tracking with Prisma
- `src/lib/db/codeExecution-prisma.ts` - Code execution logging with Prisma

### 3. Updated API Routes
- `src/app/api/auth/register/route.ts` - Uses Prisma
- `src/app/api/auth/login/route.ts` - Uses Prisma
- `src/app/api/progress/route.ts` - Uses Prisma
- `src/app/api/code/execute/route.ts` - Uses Prisma
- `src/app/api/code/history/route.ts` - Uses Prisma

### 4. Removed Dependencies
- `better-sqlite3` - SQLite database
- `@types/better-sqlite3` - TypeScript types

## Migration Steps

### Step 1: Set Up Neon Database

#### Option A: Vercel Marketplace (Recommended)
1. Go to your Vercel project
2. Navigate to Storage → Add Database → Neon Postgres
3. Follow the setup wizard
4. Vercel will automatically add `DATABASE_URL` to your environment variables

#### Option B: Direct Neon Setup
1. Sign up at [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

### Step 2: Install Dependencies

```bash
npm install prisma @prisma/client
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Run Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create the migration file
- Apply the schema to your Neon database
- Generate the Prisma Client

### Step 5: Verify Connection

```bash
npx prisma studio
```

This opens Prisma Studio to view your data.

### Step 6: Test the Application

```bash
npm run dev
```

Test the authentication, progress tracking, and code execution features.

## Data Migration (Optional)

If you have existing data in SQLite and want to migrate it:

1. Export SQLite data:
   ```bash
   sqlite3 data/lms.db .dump > backup.sql
   ```

2. Convert SQLite dump to PostgreSQL format (may require manual adjustments)

3. Import to Neon:
   ```bash
   psql $DATABASE_URL < converted_backup.sql
   ```

## Troubleshooting

### Error: "P1001: Can't reach database server"
- Check your `DATABASE_URL` is correct
- Ensure your Neon project is active
- Check network connectivity

### Error: "P1017: Can't reach database server"
- Database might be sleeping (Neon auto-suspends)
- First request may take a few seconds to wake up

### Error: "Migration failed"
- Drop all tables and re-run migration:
  ```bash
  npx prisma migrate reset
  ```

### TypeScript Errors
- Regenerate Prisma Client:
  ```bash
  npx prisma generate
  ```

## Next Steps

After migration:
1. Test all API endpoints
2. Verify authentication works
3. Check progress tracking
4. Test code execution logging
5. Deploy to Vercel staging
6. Monitor for any issues

## Rollback Plan

If issues arise:
1. Keep old SQLite files in version control
2. Can revert by:
   - Reinstalling `better-sqlite3`
   - Restoring old API routes
   - Using old database files

## Cost Impact

- Neon Free: 190 compute hours/month, 512MB storage
- Neon Pro: $20/month for 100 compute hours/month
- For TVET scale (200 students): Pro plan recommended

## Support

- Prisma Docs: https://www.prisma.io/docs
- Neon Docs: https://neon.tech/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
