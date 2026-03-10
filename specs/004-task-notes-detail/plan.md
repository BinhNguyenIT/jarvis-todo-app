# Implementation Plan — 004 Task Notes & Detail View

## Context
- Base project: `/root/.openclaw/workspace/todo-app`
- Spec: `/specs/004-task-notes-detail/spec.md`
- Tech stack: Plain HTML/CSS/JS, localStorage persistence

## Strategy
Enhance the task model with an optional `note` string and expand the UI to capture and display it. Maintain the existing minimal architecture while adding well-structured UI affordances.

## Steps
1. **Form Enhancements**
   - Add a labeled `textarea` below the title input inside `index.html`.
   - Provide helper text mentioning optional status and 500 char limit.
   - Ensure styles support multi-line input without breaking the grid layout.

2. **Schema + Persistence**
   - Update the seed data, add todo, edit todo, serialization, and render logic in `app.js` to include the `note` field.
   - Introduce helper functions for trimming and bounding note length.
   - Ensure backward compatibility when reading stored todos without `note`.

3. **Editing Flow**
   - Replace current `window.prompt` editing approach with a custom modal dialog so both title and note can be changed at once in one flow.

4. **Rendering Notes**
   - Add a `.todo-note` element inside each list item under the main text. Hide when empty.
   - Truncate in CSS or JS for long notes (max 160 characters). Provide a "View" button to open a detail dialog showing the full note.

5. **Detail View**
   - Implement a simple dialog (maybe `<dialog>` or custom overlay) to show full note text with close button.
   - Reuse the same modal container for editing to keep DOM tidy.

6. **Styling**
   - Extend `styles.css` to support textarea, note display, modal overlay, and responsive adjustments.

7. **Verification**
   - Manual QA: create note, view note, edit note, refresh, confirm persistence.
   - Basic lint/formatting check if available (none -> rely on manual run+console).

8. **Documentation**
   - Update README features list and spec summary as needed.

## Risks & Mitigations
- **Modal complexity**: Keep custom dialog simple; degrade gracefully to `prompt` as fallback if necessary.
- **Layout overflow**: Use `word-break` rules on `.todo-note` to prevent horizontal scroll.

## Definition of Done
- Input form captures notes.
- Notes show in list and detail view.
- Editing updates notes.
- Data persists with backward compatibility.
- Specs folder updated and feature is ready for manual browser QA.
