# Plan — 003 Remove Auth Gate

## Approach
Roll back the login layer cleanly by deleting auth-specific assets and simplifying the boot flow. Since the todo app previously rendered without auth, the goal is to restore that behavior while keeping newer UI refinements intact.

## Work breakdown
1. Document feature (spec/plan/tasks)
2. Audit existing auth files (`auth.js`, `auth.test.js`, related markup in `index.html`, state in `app.js`)
3. Remove the auth section from HTML and associated styles if any
4. Strip auth imports, event listeners, and session logic from `app.js`
5. Remove now-unused `auth.js` and `auth.test.js`
6. Update README and any spec references that mention auth
7. Adjust `package.json` test script — either replace with a lint/sanity check or remove tests entry entirely
8. Run `npm test` (or the updated command) to verify
9. Manual smoke test: load in browser via `python3 -m http.server` and confirm no errors

## Technical notes
- Ensure removing auth blocks does not break existing DOM references; keep the rest of the IDs/classes intact
- If removing tests leaves no automation, consider setting `npm test` to a noop that succeeds (e.g., `echo "No tests"`)
- Verify there are no dangling global references (e.g., `Auth` object)

## Risks
- Missing an auth-related event listener could leave errors in console
- Removing tests entirely might reduce safety; clearly note it

## Verification
- `npm test` (updated command) succeeds
- Manual load of the page shows todo UI immediately without JS errors
