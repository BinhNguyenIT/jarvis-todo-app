# JARVIS Todo App

A polished static Todo app built with plain HTML, CSS, and JavaScript.

## Features
- Add tasks with priority, optional due date, and optional notes
- Mark done / undone
- Edit and delete tasks from a custom modal
- Filters: all / active / done / due today / high priority
- Smart sorting by status, priority, and due date
- Inline note snippets with a detail view for longer notes
- Progress bar and dashboard stats
- Theme panel on the UI with `normal`, `galaxy`, and `cute` moods
- Theme persistence via localStorage
- Persist todo data, including notes, to localStorage
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
- `specs/004-task-notes-detail/` — spec + plan + tasks for task notes, note snippets, and the shared detail/edit modal flow
- `specs/003-remove-auth-gate/` — spec + plan + tasks for removing the temporary login gate

## Tests

No automated tests remain after removing the auth helper module. The `npm test` script is a placeholder so CI succeeds but does not run checks.
