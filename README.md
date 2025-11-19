# Project Overview
[App Name — TBD] is a productivity app combining a calendar and task manager that acts like a rule-based personal secretary — no AI, just deterministic scheduling using task metadata and user preferences.

## Core Features
### Calendar
- Multiple views: monthly, weekly, yearly, custom range
- Add, view, update, and delete events
- Support for recurring events and reminders

### Tasks
Events and reminders are unified as Tasks, each holding metadata used for intelligent scheduling.

Task fields:
- Title, description, completion state
- Estimated duration (effortLevel)
- Priority (priority)
- Dependencies
- Deadline
- Do dates (work sessions): multiple planned time blocks before the deadline
- Context tags (e.g., @home, @office, @computer)
- Pinned / hard deadline (isPinned)

User Preferences:
Used to guide auto-scheduling:
- Work hours and unavailable slots
- Preferred focus periods
- Minimum rest time between sessions
- Task category priorities

## Core Goal
Automatically organize the calendar, schedule tasks efficiently, reschedule when needed, and balance workload — behaving like a personal secretary.

## Technical Overview
Stack:
- Frontend + backend: SvelteKit v5
- Styling: TailwindCSS
- Database: in-memory for now, plan to migrate later

## Project Structure #! TO REMOVE
```
  src/
 ├─ app.css / app.html / app.d.ts
 ├─ lib/
 │    ├─ assets/        # icons, images
 │    ├─ features/      # feature-specific code (calendar, tasks, etc.)
 │    │    ├─ models/
 │    │    ├─ stores/
 │    │    ├─ ui/
 │    │    └─ utils/
 │    ├─ server/        # backend logic & database schema
 │    ├─ shared/        # reusable models, utils
 └─ routes/             # SvelteKit pages & layouts

```
