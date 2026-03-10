# Feature Spec — 002 Login Auth

## Summary
Add a simple username/password login gate in front of the Todo app so the user must sign in before seeing the mission board.

## Problem
The current app opens directly into the task UI. The requested feature needs a lightweight login flow with validation and tests.

## Goals
- Require username and password before unlocking the app UI
- Validate inputs clearly on the client side
- Keep the implementation lightweight and local-first
- Add automated tests for login validation behavior

## Non-goals
- Real backend auth
- Account registration
- Password reset
- Multi-user sync

## User stories
- As a user, I can enter a username and password to access the app
- As a user, I see a clear validation message when fields are invalid
- As a user, I remain signed in on refresh until I sign out

## Requirements
1. Show a login screen before the todo app content when the user is signed out
2. The login form must include:
   - username
   - password
   - submit button
3. Validation rules:
   - username is required
   - username must be at least 3 characters after trimming
   - password is required
   - password must be at least 6 characters
4. On successful login:
   - store signed-in state locally
   - reveal the todo app UI
   - show the signed-in username somewhere in the UI
5. Provide a logout action that clears signed-in state and returns to the login screen
6. Validation errors should be shown inline without reloading the page
7. Add automated tests that cover at least:
   - empty username/password
   - short username
   - short password
   - valid credentials

## Acceptance criteria
- Signed-out users only see the login card
- Invalid input blocks login and shows a useful message
- Valid input signs in successfully and unlocks the app
- Refresh preserves login state via local storage
- Tests pass locally with the project test command
