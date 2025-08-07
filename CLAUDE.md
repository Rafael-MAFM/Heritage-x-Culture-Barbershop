# Claude Code Instructions

## Important Rules
- **NEVER run `npm run dev`** - The user will handle starting the development server

## Common Dev Issues & Fixes

### Vite 504 "Outdated Optimize Dep" Error
If you see errors like:
- `Failed to load resource: the server responded with a status of 504 (Outdated Optimize Dep)`
- `date-fns.js?v=54a571c2:1` or similar dependency errors

**Fix:** Clear Vite's dependency cache:
```bash
# Stop the dev server first (Ctrl+C)
# Then run ONE of these commands:

# Windows:
rmdir /s /q node_modules\.vite

# Mac/Linux:
rm -rf node_modules/.vite

# Then restart: npm run dev
```

**Why this happens:** When new dependencies are added (like `date-fns`, `@supabase/supabase-js`), Vite's optimization cache becomes outdated and needs to be cleared.

### Blank/Broken UI Issues

If the UI won't load or shows nothing:

**1. Check Browser Console**
- Press F12 → Console tab
- Look for red error messages
- Common issues: import errors, missing dependencies, auth failures

**2. Check System Status**
- Look for system status indicator in bottom-right corner
- Shows what's working vs what needs configuration

**3. Common Fixes**
```bash
# Clear Vite cache and rebuild
rmdir /s /q node_modules\.vite
npm install
# Then restart dev server

# If still broken, check for TypeScript errors
npm run build
```

**4. Supabase Configuration**
- App will run in "Demo Mode" without Supabase configured
- Check `.env` file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Authentication features require proper Supabase setup

### Cal.com Dependency Error (ENOENT)
If you see errors like:
- `Error: ENOENT: no such file or directory, open '...@calcom/embed-react/dist/Cal.es.mjs'`
- Vite trying to access removed Cal.com package

**Fix: Complete Clean Install**
```bash
# Stop dev server first (Ctrl+C)
# Remove everything and reinstall clean
rmdir /s /q node_modules
del package-lock.json
npm install
# Then restart: npm run dev
```

**Why this happens:** Vite cached the old dependency tree that included Cal.com. A fresh install removes all traces.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
