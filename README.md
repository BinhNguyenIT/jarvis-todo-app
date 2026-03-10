# JARVIS Todo App

A polished static Todo app built with plain HTML, CSS, and JavaScript.

## Features
- Add tasks with priority and optional due date
- Mark done / undone
- Edit and delete tasks
- Filters: all / active / done / due today / high priority
- Smart sorting by status, priority, and due date
- Progress bar and dashboard stats
- Theme panel on the UI with `normal`, `galaxy`, and `cute` moods
- Theme persistence via localStorage
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

## Specs
- `specs/todo-galaxy-mood.md` — feature spec for the Galaxy mood theme
- `specs/001-theme-panel-moods/` — official Spec Kit feature directory for the theme panel and theme list UI
