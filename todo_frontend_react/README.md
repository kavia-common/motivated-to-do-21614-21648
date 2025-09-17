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

## Development
Install dependencies and start:

```bash
npm install
npm start
```

Note: Tailwind CSS builds on `npm run build` automatically. For a manual CSS build during development you can run:
```bash
npm run build:css
```
and restart dev server if needed.

## Supabase Table
Create a `todos` table with columns:
- `id: uuid (primary key, default uuid_generate_v4())`
- `user_id: uuid (references auth.users.id) with RLS policies restricting to current_user`
- `title: text`
- `completed: boolean default false`
- `created_at: timestamp default now()`

Enable RLS and add policies to allow CRUD for authenticated users on their own rows.

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
