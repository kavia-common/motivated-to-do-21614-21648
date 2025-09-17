# Motivated To-Do – React Frontend

Modern, mobile-responsive React app styled with Tailwind CSS (Ocean Professional theme). Integrates Supabase for authentication and data, and a FastAPI backend for health and quotes.

## Features
- Tailwind CSS + Ocean Professional theme (blue/amber, gradients, subtle shadows)
- Supabase Auth: sign up, sign in, session persistence
- Todo CRUD UI connected to Supabase table `todos`
- Motivational Quote panel via FastAPI `/quote`
- Health badge via FastAPI `/health`
- Clean component separation

## Environment Variables
Copy `.env.example` to `.env` and set values:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_SITE_URL` (public frontend URL used in email redirect)

## Supabase Dashboard Setup (IMPORTANT)
1. Authentication > URL Configuration:
   - Site URL: your frontend URL (e.g., http://localhost:3000 in dev)
   - Redirect URLs:
     - http://localhost:3000/**
     - https://yourapp.com/** (replace with your production domain)
2. Authentication > Providers: Enable Email/Password.
3. (Optional) Authentication > Email Templates: customize if needed.

## Development
Install dependencies and start:

```bash
npm install
npm start
```

Tailwind CSS is built as part of `npm run build`. For a manual CSS build during development:
```bash
npm run build:css
```
and restart dev server if needed.

## Supabase Table
Create a `todos` table with columns:
- `id: uuid (primary key, default gen_random_uuid())`
- `user_id: uuid (references auth.users.id) with RLS policies restricting to current_user`
- `title: text`
- `completed: boolean default false`
- `created_at: timestamptz default now()`

Enable RLS and add policies to allow CRUD for authenticated users on their own rows.
See `assets/supabase.md` for the exact SQL and policies used by this project.

## Auth Callback
This app includes a lightweight callback handler at `src/components/AuthCallback.js`. Configure email redirects to `${SITE_URL}/auth/callback`. With supabase-js v2 and `detectSessionInUrl: true`, sessions are handled automatically.

## Styling
Theme colors:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Applied with rounded corners, gradients, and subtle shadows for a modern minimal look.

## Build
```bash
npm run build
```
