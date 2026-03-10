# Plan — 002 Login Auth

## Approach
Implement a lightweight client-side auth gate using localStorage. Keep validation logic in a separate reusable module so it can be tested with Node's built-in test runner.

## Work breakdown
1. Create spec artifacts for the feature
2. Add a pure auth utility module for validation and session persistence helpers
3. Add login UI markup and signed-in user display/logout button
4. Hide the main app until login succeeds
5. Wire app initialization to auth state
6. Add automated tests for validation logic
7. Update package scripts and README if needed

## Technical notes
- Use a dedicated storage key for auth session state
- Do not add a backend; this is intentionally a local demo gate
- Prefer simple inline error messaging over modal alerts
- Keep existing todo behavior unchanged after login

## Risks
- Pure client-side auth is not secure for production; acceptable here because the request was for a simple login flow
- Adding a gate must not break existing local todo storage

## Verification
- Run automated tests
- Manually verify login, validation, persistence, and logout in the browser
