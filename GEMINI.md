# Project Overview

This is a Next.js project called **Digital Blueprint**, a curated directory of digital tools for the Architecture, Engineering, and Construction (AEC) industry. It's built with Next.js, Supabase, and TailwindCSS, and deployed on Vercel.

## Key Features

- **Tech Directory:** Filterable directory of tools with categories, tags, and tool cards.
- **Backend:** Supabase-powered backend with a PostgreSQL database and storage.
- **Analytics:** Plausible is used for event tracking.
- **UI:** The UI is built with ShadCN UI and TailwindCSS.
- **Community Submissions:** A form for users to submit new tools.

# Building and Running

## 1. Installation

Install the dependencies using `npm` or `pnpm`:

```bash
npm install
```

or

```bash
pnpm install
```

## 2. Environment Variables

Create a `.env.local` file and add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com
```

You can find the Supabase credentials in your Supabase project dashboard.

## 3. Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 4. Building the Project

To build the project for production, use the following command:

```bash
npm run build
```

The build artifacts will be stored in the `.next` directory.

## 5. Other Scripts

- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code using Next.js's built-in ESLint configuration.
- `npm run import-tools`: Imports tools from a file.
- `npm run generate-favicons`: Generates favicons.

# Development Conventions

## File Structure

The file structure is organized as follows:

- `/app`: Next.js routes, including blog, categories, and submit pages.
- `/components`: UI and layout components.
- `/lib`: Supabase client, analytics, and helper functions.
- `/styles`: Tailwind config and global CSS.
- `/public`: Static assets like logos and favicons.
- `/scripts`: Scripts for various tasks.

## Database

The database schema is defined in `lib/supabase.ts` using TypeScript types. The following tables are used:

- `categories`
- `tools`
- `tags`
- `platforms`
- `tool_tags`
- `tool_platforms`
- `gear_categories`
- `gear`
- `gear_tags`

## Analytics

Plausible is used for analytics. The following events are tracked in `lib/analytics.ts`:

- `Tool Viewed`
- `Submit Tool`
- `Blog CTA Click`
- `Affiliate Click`
