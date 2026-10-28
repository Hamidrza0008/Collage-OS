# College OS — Feature Documentation

This folder is where we plan features before building them.

It holds the approved feature list (`FEATURE_INVENTORY.md`), the standard specification template (`FEATURE_SPECIFICATION_TEMPLATE.md`), shared engineering conventions (`shared/backend-conventions.md`), and the individual feature specification documents.

---

## How this folder works

1. We review and approve `FEATURE_INVENTORY.md`.
2. We pick one feature from it.
3. That feature gets its own `.md` file following `FEATURE_SPECIFICATION_TEMPLATE.md` with the full detail: requirements, who can do what, what data it needs, which APIs it will use, the main workflows, and how we will test it. Common engineering rules reference `shared/backend-conventions.md`.
4. We review and approve that document.
5. Only then do we write code.

A feature being listed in the inventory does **not** mean we can start building it.

---

## Folder layout

```
docs/features/
├── README.md                           ← this file
├── FEATURE_INVENTORY.md                ← the approved feature list
├── FEATURE_SPECIFICATION_TEMPLATE.md   ← standard template for all feature specs
├── authentication/                     ← one document per auth feature
├── student/
├── faculty/
├── shared/
│   ├── backend-conventions.md          ← shared backend engineering standards
│   ├── user-identity-and-profiles.md   ← SHARED-01 specification
│   └── roles-and-permissions.md        ← SHARED-02 specification
└── ai/
```

File names are lowercase with hyphens, and match the feature name. For example:

- `shared/user-identity-and-profiles.md`
- `shared/roles-and-permissions.md`
- `student/student-dashboard.md`
- `faculty/attendance-management.md`
- `ai/faculty-campus-ai.md`

Each feature also has a short stable ID, such as `STU-04`, `FAC-08`, `SHARED-01`, or `SHARED-02`, used when discussing and cross-referencing it. The ID appears in the inventory and in the feature document heading. IDs are never reassigned, so adding or removing a feature does not disturb the others.

---

## Rules

- **`COLLEGE_OS_SOT.md` is the final authority.** If anything here disagrees with it, the locked source of truth wins. We record the disagreement instead of quietly changing it.
- **Do not edit the locked source-of-truth documents** from this folder.
- **Listing is not approval.** No backend work starts until that feature's own document is approved.
- **Shared things are defined once.** Users, profiles, classes, attendance, marks, notices, events, files, notifications, and search must be described once and reused by every feature, so two features cannot invent two different versions.
- **No schemas or API contracts in the inventory.** Data models and API shapes belong in the individual feature document, not in `FEATURE_INVENTORY.md`.
