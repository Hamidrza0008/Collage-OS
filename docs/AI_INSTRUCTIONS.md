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

## Attached UI Reference Images — Asset Generation & Theme Rules

Whenever a UI/reference image is attached for designing or implementing a page, carefully inspect the complete image before creating the UI.

### 1. Recreate Reference Images as Project Assets
- Identify every meaningful image/visual asset used inside the attached reference UI.
- This includes:
  - Hero/banner images
  - Illustrations
  - Background visuals
  - Avatars/profile images
  - Project thumbnails
  - Event/notice images
  - Decorative visual elements
  - Any other actual image used as part of the UI
- Recreate/generate these visual assets as closely as possible to the reference image.
- Do not replace important reference visuals with random placeholder images, unrelated stock images, or generic gradients when an actual visual is shown in the reference.
- The generated assets should visually match the reference in terms of subject, composition, style, proportions, and overall appearance.

### 2. Generate Both Light & Dark Versions
For every image/visual that needs a different appearance between themes:
- Generate a Light Theme version.
- Generate a Dark Theme version.
- Both versions should represent the same visual/content and should feel like theme variants of the same asset.
- Do not simply invert colors. Adapt the asset properly for the dark UI when required.

### 3. Save Assets Page-Wise
All generated/recreated assets must be stored inside the project's assets/public asset structure in a page-wise manner.

Example:

```text
public/
  assets/
    home/
      light/
      dark/
    academics/
      light/
      dark/
    assignments/
      light/
      dark/
    notices/
      light/
      dark/
    announcements/
      light/
      dark/
```

Use the existing project asset structure if one already exists. Do not create unnecessary duplicate folders if an equivalent structure is already present.

Use clear, descriptive filenames, for example:

```text
hero-light.png
hero-dark.png
student-card-light.png
student-card-dark.png
event-banner-light.png
event-banner-dark.png
```

### 4. Actually Use the Generated Assets in the UI
Generating assets is NOT enough.

After generating and saving the assets:
- Build the UI according to the reference image.
- Identify every place where the reference image uses an actual visual asset.
- Use the corresponding generated project asset at that exact UI location.
- Do not leave placeholder images where a generated asset is available.
- Do not generate assets that are never used.
- Keep the asset-to-UI mapping clean and intentional.

### 5. Light/Dark Theme Must Work Throughout the UI
Every page being implemented must support both Light and Dark themes, consistent with the existing project theme system.

The existing UI already supports a Light/Dark theme approach, so:
- Preserve the existing theme architecture.
- Do not create a separate unrelated theme system.
- Do not break the existing theme toggle.
- The same page/layout should work correctly in both themes.
- Theme-dependent assets must automatically switch between their Light and Dark versions when the theme changes.

For example:

```jsx
// Conceptual example
light asset → /assets/home/light/hero.png
dark asset  → /assets/home/dark/hero.png
```

When the user switches the application theme:
- Light UI → use Light assets.
- Dark UI → use Dark assets.

### 6. Reference Image ≠ Screenshot to Copy as One Image
Never use the entire attached UI screenshot as a single background/image to fake the page.

The reference image is a DESIGN REFERENCE.

Rebuild the actual UI using:
- React/JSX components
- Tailwind CSS
- Existing project components
- Generated/recreated visual assets
- Existing theme system

The final page must be a real, functional UI rather than a screenshot placed inside the page.

### 7. Preserve Visual Consistency
When implementing multiple pages:
- Keep the same design language across all pages.
- Maintain consistent spacing, typography, border radius, shadows, cards, navigation, sidebar, buttons, and theme behavior.
- Light and Dark versions should feel like the same College OS design system.
- Do not randomly change the visual language from one page to another unless the reference specifically requires it.

### 8. Before Finishing Any Page
Before considering a page complete, verify:

- [ ] All important reference images/visuals have been identified.
- [ ] Required assets have been generated/recreated.
- [ ] Light and Dark asset variants exist where needed.
- [ ] Assets are saved in the correct page-wise asset folder.
- [ ] Generated assets are actually used in the UI.
- [ ] No unnecessary placeholder images remain.
- [ ] Light theme is visually correct.
- [ ] Dark theme is visually correct.
- [ ] Theme toggle correctly switches theme-dependent assets.
- [ ] Existing project theme architecture has not been broken.
- [ ] The final implementation is a real UI, not a screenshot/background workaround.

These rules apply to every future page implemented from an attached UI/reference image.

---

## Important Final Rule

The existing College OS architecture should be respected.
The AI should inspect first, understand second, and modify third.
Never blindly generate or restructure the project.
Do not change locked architecture unless explicitly instructed by the project owner.
