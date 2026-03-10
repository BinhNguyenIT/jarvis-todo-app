# Feature Spec — 003 Remove Auth Gate

## Summary
Return the JARVIS Todo app to its open-by-default experience by removing the recently added local login gate. Users should land directly on the mission board with no credentials required.

## Problem
The interim auth screen was meant as a lightweight demo, but it now blocks fast access to the todo UI. Harry wants the app to load instantly again while keeping the rest of the UX untouched.

## Goals
- Remove the auth/login UI so the main app renders immediately
- Clean up the supporting auth JavaScript, tests, and wiring
- Adjust documentation and scripts that referenced the auth gate
- Keep existing todo, theme, and storage logic intact

## Non-goals
- Adding any new authentication flows
- Introducing new backend services
- Major redesign of the UI outside of removing the auth shell

## User stories
- As a user, I open the app and immediately see the todo interface with no login prompt
- As a contributor, I no longer see unused auth code or tests in the repo

## Requirements
1. Remove the login markup from `index.html`, leaving the main app structure as-is
2. Delete auth-specific JS modules, tests, and localStorage handling
3. Update `app.js` to no longer reference auth helpers or state
4. Update README/docs to remove references to auth and explain the open access
5. Ensure `npm test` either runs a new relevant check or is removed if no tests remain (and document the change)
6. Verify the app still boots cleanly without JavaScript errors

## Acceptance criteria
- Loading the site shows the todo UI immediately
- No auth-related UI, code, or tests remain
- README reflects the current experience
- `npm test` command aligns with the repository contents (either passes with new tests or is clearly updated if no tests)
- Manual smoke test confirms app functionality without auth errors
