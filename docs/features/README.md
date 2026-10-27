# College OS — Feature Documentation

This folder is where we plan features before building them.

Right now it holds one simple list of features: `FEATURE_INVENTORY.md`.
Later, each feature in that list will get its own detailed Markdown document.

---

## How this folder works

1. We review and approve `FEATURE_INVENTORY.md`.
2. We pick one feature from it.
3. That feature gets its own `.md` file with the full detail: requirements, who can do what, what data it needs, which APIs it will use, the main workflows, and how we will test it.
4. We review and approve that document.
5. Only then do we write code.

A feature being listed in the inventory does **not** mean we can start building it.

---

## Folder layout

```
docs/features/
├── README.md               ← this file
├── FEATURE_INVENTORY.md    ← the simple feature list
├── authentication/         ← one document per auth feature
├── student/
├── faculty/
├── shared/
├── ai/
└── future/                 ← features agreed but not being built yet
```

File names are lowercase with hyphens, and match the feature name. For example:

- `student/student-dashboard.md`
- `faculty/attendance-management.md`
- `ai/faculty-campus-ai.md`

The file name is how we refer to a feature. We do not need extra ID codes.

---

## Rules

- **`COLLEGE_OS_SOT.md` is the final authority.** If anything here disagrees with it, the locked source of truth wins. We record the disagreement instead of quietly changing it.
- **Do not edit the locked source-of-truth documents** from this folder.
- **Listing is not approval.** No backend work starts until that feature's own document is approved.
- **Shared things are defined once.** Users, profiles, classes, attendance, marks, notices, events, files, notifications, and search must be described once and reused by every feature, so two features cannot invent two different versions.
- **No schemas or API contracts here.** Data models and API shapes belong in the individual feature document, not in the inventory.
