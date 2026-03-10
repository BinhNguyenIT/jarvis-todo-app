# Feature Spec — 004 Task Notes & Detail View

## Summary
Add optional notes/description support to every task plus a lightweight detail view so users can capture more context than just the title. Notes should be editable, visible in the list, and stored alongside tasks in localStorage.

## Problem
Power users often need to record context (links, meeting notes, sub bullets) for a task. Today the app only stores a one-line title, forcing people to memorize details elsewhere. This breaks focus and reduces usefulness for planning.

## Goals
- Let users capture an optional multi-line note when creating or editing a task.
- Surface the note in the list without overwhelming the layout.
- Persist notes with todos in localStorage and include them in exports/imports (future proof).
- Keep editing simple: one modal/inline editor shared for title + note.

## Non-goals
- Rich text formatting, markdown rendering, or attachments.
- Collaborative comments or multiple notes per task.
- Server sync of note content.

## User Stories
1. As a user, I can add an optional note while creating a new task.
2. As a user, I can edit a task note later from the task list.
3. As a user, I can quickly read the first part of the note directly under the task title and expand for more when needed.
4. As a user, notes persist between sessions alongside other task fields.

## Requirements
1. Add a new `textarea` field labeled "Notes" to the add-task form (optional, max 500 chars).
2. Update task schema in `app.js` to include `note` (string, default "").
3. When editing a task, prompt for both title and existing note so both can change in one flow.
4. Render notes under the task title in the list. Truncate long notes to ~160 chars with ellipsis and provide a "View" affordance to reveal the full text in a tooltip/dialog.
5. Include the note copy in the meta text when a task is completed, so the context remains visible.
6. Ensure serialization/deserialization keeps `note` intact in localStorage.

## Acceptance Criteria
- Creating a task with a note saves and shows the note immediately.
- Editing a task allows updating the note; empty notes hide the display row entirely.
- LocalStorage payload includes `note` for each task and remains backward compatible with existing saved data.
- Mobile breakpoints keep the note readable without breaking layout (stacked under title).
- Manual QA: add task with note, edit note, refresh page, confirm note persists.
