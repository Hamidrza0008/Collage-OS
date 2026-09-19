# COLLEGE OS — AI DEVELOPMENT INSTRUCTIONS

## 1. Read Instructions Before Working

Before starting any development task:

- Read `/docs/AI_INSTRUCTIONS.md`.
- Check other relevant documentation files inside `/docs` if they exist.
- Inspect the existing code and folder structure before making changes.
- Never assume that a file, component, API, model, or feature already exists.
- Reuse existing code when appropriate instead of creating duplicates.

`AI_INSTRUCTIONS.md` is the master development instruction file.

---

## 2. Project Architecture

College OS follows a modular, page-based component architecture.

The main rule is:

```
Route → page.jsx → Main Page Component → Page Sections/Components
```

Every route's `page.jsx` should remain a thin entry point.

Example:

`app/dashboard/page.jsx`

```jsx
import Dashboard from "@/components/dashboard/Dashboard";

export default function Page() {
  return <Dashboard />;
}
```

Do NOT put the complete page UI directly inside `page.jsx`.

---

## 3. Main Page Component

Every major route/page should have a corresponding main page component inside `components`.

Example:
`app/dashboard/page.jsx` → `components/dashboard/Dashboard.jsx`

The main page component acts as the assembler for that page.

Example:

`Dashboard.jsx`

```jsx
import DashboardHeader from "./DashboardHeader";
import QuickStats from "./QuickStats";
import AttendanceOverview from "./AttendanceOverview";
import UpcomingAssignments from "./UpcomingAssignments";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <QuickStats />
      <AttendanceOverview />
      <UpcomingAssignments />
    </>
  );
}
```

The main page component should primarily assemble the page rather than becoming one huge component.

---

## 4. Component Organization

Page-specific components should stay inside their relevant feature/page folder.

Example:

```
components/
└── dashboard/
    ├── Dashboard.jsx
    ├── DashboardHeader.jsx
    ├── QuickStats.jsx
    ├── AttendanceOverview.jsx
    └── UpcomingAssignments.jsx
```

Another example:

```
components/
└── assignments/
    ├── Assignments.jsx
    ├── AssignmentHeader.jsx
    ├── AssignmentFilters.jsx
    └── AssignmentCard.jsx
```

Do not create one massive global components folder containing unrelated page-specific components.

---

## 5. Component Responsibility

Each component should have a clear responsibility.

Avoid:
- One huge component containing the entire page.
- Repeating the same UI in multiple places.
- Creating unnecessary abstractions.
- Creating components for tiny pieces that do not need independent behavior or reuse.

Prefer meaningful sections/components that make the page easier to maintain.

---

## 6. Before Modifying Existing Code

Before changing anything:
1. Inspect the relevant route.
2. Inspect its `page.jsx`.
3. Find the corresponding main page component.
4. Inspect related child components.
5. Understand existing styling and patterns.
6. Reuse existing components whenever possible.
7. Only then make the required change.

Do not blindly overwrite existing implementation.

---

## 7. Do Not Change Architecture Without Permission

Do not:
- Move existing folders unnecessarily.
- Rename established components unnecessarily.
- Replace the current architecture with another architecture.
- Introduce a new pattern when an existing project pattern already works.
- Create duplicate components.
- Create unnecessary files.

If an architectural change is genuinely required, explain the reason first.

---

## 8. UI Implementation Rules

When implementing a UI from a reference image/design:
- Reproduce the intended layout accurately.
- Maintain the existing project design system.
- Keep the implementation modular.
- Preserve responsive behavior.
- Follow the existing light/dark theme architecture.
- Do not unnecessarily redesign the UI.
- Do not change unrelated sections.

If the task is specifically about a visual change, focus on the requested visual change instead of modifying unrelated functionality.

---

## 9. Existing Project Patterns Have Priority

When adding a new feature:
- Follow existing naming conventions.
- Follow existing folder conventions.
- Follow existing import conventions.
- Follow existing styling patterns.
- Follow existing state-management patterns.
- Follow existing API/data-fetching patterns.

Do not introduce a different approach simply because it is personally preferred.

---

## 10. Dependencies

Do not install a new package unless it is actually necessary.

Before adding a dependency:
- Check whether the project already has a suitable dependency.
- Prefer existing project tools.
- Avoid unnecessary libraries and abstractions.

---

## 11. Preserve Existing Functionality

When implementing a new feature or modifying a component:
- Do not break existing functionality.
- Do not remove working functionality without explicit permission.
- Do not modify unrelated files unnecessarily.
- Keep changes focused on the requested task.

---

## 12. Documentation System

All important project documentation should be maintained inside:
`/docs`

Future documentation files may include:
- `PROJECT_PLAN.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `UI_GUIDELINES.md`
- `CAMPUS_AI.md`
- `API.md`
- etc.

`AI_INSTRUCTIONS.md` remains the master instruction file.
When another documentation file is relevant to a task, read it before implementing that task.

---

## 13. Source of Truth

When project documentation contains a locked decision, treat it as the source of truth.
Do not silently change a documented decision.
If the current code conflicts with documented architecture, inspect both and clearly identify the conflict before making a major architectural change.

---

## 14. Code Quality

Write code that is:
- Clean
- Maintainable
- Modular
- Readable
- Consistent with the existing project
- Production-oriented

Avoid unnecessary complexity.
Do not over-engineer simple features.

---

## 15. Final Verification

After completing a task:
- Check the modified files.
- Check for obvious errors.
- Verify imports.
- Verify component relationships.
- Make sure the requested functionality is actually implemented.
- Make sure no unrelated functionality was accidentally changed.

---

## Important Final Rule

The existing College OS architecture should be respected.
The AI should inspect first, understand second, and modify third.
Never blindly generate or restructure the project.
Do not change locked architecture unless explicitly instructed by the project owner.
