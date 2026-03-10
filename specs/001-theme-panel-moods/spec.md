# Feature Specification: Theme Panel Theme List

**Feature Branch**: `001-theme-panel-moods`  
**Created**: 2026-03-10  
**Status**: Implemented  
**Input**: User description: "Feature cho todo list là tạo theme list gồm có galaxy, cute, normal, ... có panel change theme trên UI"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Pick a visible theme from the UI (Priority: P1)

As a user, I want a visible theme panel with named options so I can switch the app mood directly instead of cycling through a hidden toggle flow.

**Why this priority**: This is the core product behavior the user asked for.

**Independent Test**: Open the app, use the theme panel, and confirm the selected theme applies instantly.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** the user selects `normal`, `galaxy`, or `cute`, **Then** the UI changes immediately to that theme.
2. **Given** a theme is active, **When** the theme panel is visible, **Then** the active theme is clearly highlighted.

---

### User Story 2 - Persist the selected theme (Priority: P2)

As a user, I want the app to remember my chosen theme after reload so I do not need to reselect it every time.

**Why this priority**: Persistence turns the feature into a stable preference instead of a temporary visual toy.

**Independent Test**: Select a theme, reload the page, and confirm the same theme is restored.

**Acceptance Scenarios**:

1. **Given** the user selected `cute`, **When** the page reloads, **Then** `cute` stays active.
2. **Given** localStorage still contains legacy `dark` or `light` values, **When** the app loads, **Then** the app maps them safely to `normal`.

---

### User Story 3 - Keep the panel usable on mobile (Priority: P3)

As a mobile user, I want the theme panel to remain readable and tappable on phone screens so the feature still feels polished on small devices.

**Why this priority**: Mobile quality is explicitly important for this app and the theme panel must not break layout.

**Independent Test**: Open the app on a narrow viewport and confirm the panel stacks cleanly with no horizontal overflow.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** the theme panel renders, **Then** its options stack cleanly and remain easy to tap.
2. **Given** a mobile viewport, **When** the user scrolls the page, **Then** the feature introduces no horizontal overflow.

### Edge Cases

- What happens when localStorage contains a legacy theme from the old toggle system?
- What happens when the user switches themes repeatedly in the same session?
- What happens when the theme panel is shown on a very narrow mobile screen?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a visible theme panel on the UI.
- **FR-002**: System MUST allow users to directly select at least `normal`, `galaxy`, and `cute` themes.
- **FR-003**: System MUST apply the selected theme immediately.
- **FR-004**: System MUST persist the selected theme in localStorage.
- **FR-005**: System MUST restore the persisted theme on reload.
- **FR-006**: System MUST visually indicate the active theme.
- **FR-007**: System MUST preserve mobile usability and avoid horizontal overflow.
- **FR-008**: System MUST safely map legacy `dark` and `light` values to `normal`.

### Key Entities *(include if feature involves data)*

- **Theme Option**: A named visual mode (`normal`, `galaxy`, `cute`) with label, active state, and styling token set.
- **Theme Preference**: The locally persisted value that stores the currently selected theme.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can switch between `normal`, `galaxy`, and `cute` from a visible panel in one tap.
- **SC-002**: Reloading the app preserves the previously selected theme in normal localStorage-supported sessions.
- **SC-003**: The active theme remains visually identifiable in the panel for all supported themes.
- **SC-004**: The theme panel remains usable on a mobile viewport without horizontal overflow.
