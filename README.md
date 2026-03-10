# JARVIS Todo App

A polished static Todo app built with plain HTML, CSS, and JavaScript.

## Features
- Add tasks with priority and optional due date
- Mark done / undone
- Edit and delete tasks
- Filters: all / active / done / due today / high priority
- Smart sorting by status, priority, and due date
- Progress bar and dashboard stats
- Dark/light/galaxy mood toggle with localStorage persistence and system-preference fallback
- Persist todo data to localStorage
- Mobile-friendly glassmorphism UI

## Run locally

```bash
cd todo-app
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173>

## Deploy to Vercel
This project is static, so it can be deployed directly.

If Vercel CLI is installed and logged in:

```bash
vercel --prod
```
