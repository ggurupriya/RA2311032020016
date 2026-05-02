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
