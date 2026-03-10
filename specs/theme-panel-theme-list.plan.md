# Implementation Plan — Theme Panel Theme List

## Goal
Implement a visible theme panel on the Todo app UI with at least `normal`, `galaxy`, and `cute` themes, preserving persistence and mobile usability.

## Constraints
- Plain HTML/CSS/JS only
- No backend
- No heavy animation
- Keep existing todo functionality intact

## Assumptions
- `normal` replaces the previous generic daily-driver mode and can safely absorb legacy `dark/light` stored values.
- The existing hero/header area is the right place for the theme panel.

## Files expected to change
- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `specs/theme-panel-theme-list.md`

## Plan
1. Replace the single theme toggle with a visible theme panel in the hero/header UI.
2. Refactor theme state logic to use named theme options instead of cycling behavior.
3. Add or refine theme tokens/styles for `normal`, `galaxy`, and `cute`.
4. Ensure active theme highlighting and localStorage persistence.
5. Verify mobile responsiveness for the theme panel.
6. Update README and keep the feature spec in the repo.

## Validation
- JS syntax check passes
- Theme persists after reload
- Theme panel works on desktop and mobile
- Active theme is visually obvious
