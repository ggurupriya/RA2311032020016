# Stage 1 - Notification Priority System

In this stage, I built a backend service that fetches notifications from the provided API and displays the top 10 most important ones based on priority.

The main goal was to make sure that users don’t miss critical updates like placements or results when there are too many notifications.

## How Priority is Decided

Each notification is assigned a priority based on two factors:

### 1. Type of Notification
Different types of notifications are not equally important:

1. Placement → Highest priority
2. Result → Medium priority
3. Event → Lowest priority

This is implemented using weights:
1. Placement = 3
2. Result = 2
3. Event = 1

### 2. Recency (Time)

If two notifications have the same type, then the newer one is given higher priority.

So overall:
- Important + recent = highest priority

## How I Calculated Priority

I combined both weight and timestamp into a single score.

This helps in comparing notifications easily.

---

## Efficient Approach Used

Instead of sorting all notifications (which would be slower), I used a **Min Heap**.

### Why Min Heap?

- We only need top 10 notifications
- No need to sort everything
- Better performance when data grows

### How it works:

- Add notifications one by one
- Keep only top 10 in the heap
- Remove lowest priority when size exceeds 10

---

## Logging

I implemented a custom logging middleware.

For every request, it logs:
- HTTP method
- API endpoint
- status code
- response time

This helps in debugging and monitoring.

---

## Handling Continuous Notifications

Since new notifications can come anytime:

- The heap can be updated dynamically
- New notifications can be inserted
- Lowest priority ones are removed automatically

---

## Output

The API returns:
- Top 10 notifications
- Sorted by priority
- Includes weight and priority rank for clarity

---

# Stage 2 - Notification UI (Frontend)

In this stage, I built a responsive React/Vite application to display the notifications to the user, strictly adhering to modern UI/UX principles and Material UI styling.

## Key Features

### 1. Two-Page Architecture
- **All Notifications Page (`/`)**: Displays all general notifications with a paginated view. 
- **Priority Notifications Page (`/priority`)**: A dedicated interface to view the most critical notifications.

### 2. Priority & Filtering Controls
The Priority page leverages the expanded backend API query parameters:
- **`limit`**: A customizable Top "N" filter allowing users to select how many priority notifications they wish to see.
- **`notification_type`**: A dropdown filter to isolate notifications strictly by type (`Event`, `Result`, or `Placement`).

### 3. Visual Distinction & State
- **Viewed vs. New**: The UI visually distinguishes between new and already-viewed notifications. New notifications feature a solid colored border, opaque styling, and bold typography. Viewed notifications have an outlined badge, disabled checkmark, and lower opacity.
- **Dynamic Theming**: Dynamic color coding based on Notification Type using Material UI theme tokens (`Primary` for Events, `Success` for Results, `Warning` for Placements).

### 4. Technical Constraints Met
- Developed exclusively in React using Vite.
- Styled completely using `@mui/material` and `@emotion/react`.
- Application strictly configured to run on `http://localhost:3000`.
- Robust error handling with graceful fallbacks if the API is unreachable, ensuring the UI always remains completely functional and testable.
