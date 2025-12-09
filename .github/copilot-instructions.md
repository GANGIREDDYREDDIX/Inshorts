# Inshorts University Announcement Platform

## Architecture Overview

This is a MERN monorepo for university announcements with AI-powered content generation:
- **Client** (`client/`): React 19 + Vite + Tailwind CSS v4 with Framer Motion animations
- **Server** (`server/`): Express + MongoDB with Google Gemini AI integration
- **Monorepo scripts**: Run from root with `npm start` (uses concurrently) or `npm run install:all`

## Key Workflows

**Development:**
```bash
npm start              # Runs both client (port 3000+) and server (port 5001) concurrently
cd client && npm run dev    # Client only (Vite dev server)
cd server && npm start      # Server only (Express on 0.0.0.0:5001)
```

**Environment Setup:**
- Server requires `.env` with: `MONGO_URI`, `GEMINI_API_KEY`, `PORT`, `PEXELS_API_KEY` (optional)
- MongoDB auto-seeds default users: `teacher1`/`pass123` and `student1`/`pass123`

## Critical Patterns

### AI Content Generation (`server/services/ai.js`)
- **Summary generation**: Gemini 2.0 Flash generates exactly 60-word summaries from announcements
- **Image generation**: Pexels API (with `PEXELS_API_KEY`) or Picsum fallback
- Errors are caught gracefully with fallback messages; check server logs for API issues

### Announcement Flow
1. Teachers create announcements via `/api/announcements` POST with `title`, `description`, `authorId`
2. Server auto-generates `summary` (Gemini AI) and `imageUrl` (Pexels/Picsum)
3. Teachers can provide `summary` manually to skip AI generation
4. Updates regenerate AI content ONLY if fields change (see `routes/announcements.js` lines 55-75)

### Role-Based Routing (`client/src/App.jsx`)
- `PrivateRoute` component guards routes by checking `localStorage.getItem('user')`
- Teachers → `/dashboard` (CRUD announcements)
- Students → `/feed` (view-only with category filters)
- Login stored as JSON: `{ id, regId, role }`

### Data Model Conventions
- **Announcements** have `originalDescription` (full text) + `summary` (AI-generated 60 words)
- **Categories**: `'All' | 'Academic' | 'Administrative/Misc' | 'Co-curricular/Sports/Cultural' | 'Placement'`
- **Tags**: Array of up to 3 strings for image generation context

## Common Gotchas

- **Hardcoded API URL**: Client uses `http://localhost:5001/api` directly (no env var)
- **No JWT**: Authentication returns user object, stored in localStorage (plaintext password comparison in `auth.js`)
- **Edit behavior**: Empty `summary` field forces AI regeneration; provide existing summary to skip
- **Image regeneration**: Triggered when `title` OR `tags` change (see `announcements.js` line 73)
- **Mobile-first UI**: `StudentFeed.jsx` has separate mobile/desktop layouts with Framer Motion scroll animations

## Tech Stack Specifics

- **React 19**: Uses new `react-dom/client` patterns
- **Tailwind v4**: Uses `@tailwindcss/vite` plugin (not PostCSS)
- **Framer Motion**: Extensive use of `<AnimatePresence>` and `motion` components in feeds
- **Mongoose**: CommonJS module usage (`require`) in server, ESM (`import`) in client
- **Server binding**: Listens on `0.0.0.0` for container deployment compatibility
