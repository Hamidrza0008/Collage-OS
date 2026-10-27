# College OS — Feature Documentation

> **Status:** Active documentation system
> **Owner:** College OS engineering and product review
> **Authority:** Subordinate to `COLLEGE_OS_SOT.md` (locked source of truth)

---

## 1. Purpose of This Directory

`docs/features/` is the planning and specification workspace for College OS features.

It exists to answer four questions before implementation begins:

1. **What** features does College OS intend to support?
2. **Who** is allowed to use each feature, and under what institutional scope?
3. **Which data, routes, APIs, and shared rules** does each feature depend on?
4. **What evidence** proves a feature is specified, implemented, and verified?

This directory does **not** replace the locked source of truth, and it does **not** authorize implementation. It translates approved requirements into a reviewable feature map and, later, into individual feature specifications.

---

## 2. Source-of-Truth and Evidence Hierarchy

When documents disagree, use this order. Do not silently resolve a conflict in favour of the codebase.

| Priority | Source | Use |
| :--- | :--- | :--- |
| 1 | `COLLEGE_OS_SOT.md` (locked v1.1) and other formally approved requirements | Intended product behaviour and scope |
| 2 | Approved project plans, architecture decisions, and locked feature inventories | Clarification of approved scope |
| 3 | Actual repository routes, components, navigation, forms, mock datasets, and backend code | What is implemented today, not necessarily what must exist |
| 4 | `docs/roadmap.md`, `README.md`, and audit reports | Reported status and historical context; verify before trusting |

**Rules:**

- A screen existing in the UI is **implementation evidence**, not a product requirement.
- A requirement appearing in the SOT is **not** proof that it is implemented.
- A roadmap checkbox is a claim to verify, not authoritative scope.
- Conflicts must be recorded in `FEATURE_INVENTORY.md`. Never edit the locked SOT to make a conflict disappear.
- SOT changes require a formal version increment, as required by the SOT change-control rules.

---

## 3. Documentation Chain

```
COLLEGE_OS_SOT.md                     Locked product requirements and guardrails
        │
        ▼
docs/features/FEATURE_INVENTORY.md     Feature map, scope, status, dependencies, risks
        │
        ▼
docs/features/<domain>/<ID>-<name>.md  One approved feature specification per feature
        │
        ▼
API traceability                       Endpoint-to-feature mapping, kept inside each spec
        │                              and, if needed later, a consolidated API index
        ▼
Implementation                         Frontend and backend code
        │
        ▼
Verification                           Acceptance criteria, tests, and status updates
```

API traceability is part of each feature specification. A feature spec must list the API operations it owns or consumes, including method, path, actor, authorization rule, request shape, response shape, and owner. Shared endpoints must be declared once in the owning shared feature spec and referenced by other features.

Do not create a second, competing API contract in a feature document when a shared contract already exists.

---

## 4. Naming Convention

### Feature IDs

Feature IDs are stable and never reused.

| Prefix | Domain | Examples |
| :--- | :--- | :--- |
| `AUTH` | Authentication and institutional access | `AUTH-01` |
| `SHARED` | Shared platform and cross-cutting capabilities | `SHARED-03` |
| `STU` | Student-specific features | `STU-06` |
| `FAC` | Faculty-specific features | `FAC-04` |
| `ADMIN` | HOD, Principal/VP, and administrative capabilities | `ADMIN-01` |
| `AI` | AI and intelligent-assistant capabilities | `AI-02` |
| `SYS` | Supporting system capabilities | `SYS-03` |

Rules:

- IDs use a zero-padded two-digit number: `STU-01`, not `STU-1`.
- IDs are assigned once and are never renumbered when features are reordered.
- A retired feature keeps its ID and is marked `Superseded`; the ID is never reused for a different feature.
- Routes, pages, components, collections, and table rows are **not** feature IDs. One feature may span many routes.

### Feature Specification Files

Proposed path pattern:

```
docs/features/<domain-folder>/<PREFIX>-<NN>-<kebab-case-feature-name>.md
```

Domain folders:

```
docs/features/
├── README.md
├── FEATURE_INVENTORY.md
├── authentication/
├── shared/
├── student/
├── faculty/
├── admin/
├── ai/
└── system/
```

Example:

```
docs/features/faculty/FAC-04-attendance-management-and-roll-call.md
```

The filename must begin with the exact feature ID. The title inside the file must match the inventory name unless a reviewed rename is approved.

---

## 5. Required Structure of a Feature Specification

Every future feature specification should contain, at minimum:

1. **Header** — feature ID, name, domain, status, owner, last reviewed date.
2. **Purpose and problem** — what user or institutional problem it solves.
3. **Scope** — in scope, out of scope, and related deferred items.
4. **Primary actors and permissions** — role, scope, and explicit denials.
5. **Requirements** — functional and non-functional, numbered for traceability.
6. **Architecture guardrails** — constraints inherited from the SOT and shared specs.
7. **Data model** — entities, fields, ownership, indexes, and provisional status.
8. **API traceability** — endpoints owned and consumed, with authorization rules.
9. **Workflow diagrams** — primary flows and state transitions.
10. **Authorization rules** — student ownership, faculty assignment scope, HOD department scope, principal campus scope, admin system scope.
11. **Validation and error handling** — request rules, failure modes, and user feedback.
12. **DOs and DON'Ts** — implementation constraints specific to the feature.
13. **Dependencies** — feature, data, API, and infrastructure dependencies.
14. **Acceptance criteria** — testable statements, including negative authorization tests.
15. **Open questions and decisions** — unresolved items with owners.
16. **Evidence** — routes, components, documents, and audit references.
17. **Change log** — version and review history.

---

## 6. Status Vocabulary

### Documentation Status

| Status | Meaning |
| :--- | :--- |
| **Draft** | Inventory entry or specification exists but has not completed review. |
| **In Review** | Under active cross-feature, security, or architecture review. |
| **Approved / Locked** | Reviewed and approved. Changes require a change-log entry and re-review. |
| **In Implementation** | Implementation has started against an approved specification. |
| **Verified** | Implemented and verified against acceptance criteria, including authorization tests. |
| **Superseded** | Replaced by another feature or specification. ID is retained and never reused. |
| **Deferred** | Approved as future scope but intentionally not scheduled. |

### Scope Classification

| Classification | Meaning |
| :--- | :--- |
| **Core MVP** | Belongs to the SOT's 11 foundational modules, authentication, or an unavoidable supporting capability required by them. |
| **Documented expansion** | Formally listed as Phase 2 or otherwise documented as planned expansion. |
| **Future / deferred** | Documented but explicitly postponed or not scheduled. |
| **Unclear** | Implemented, implied, or requested, but not clearly approved for the current scope. A decision is required. |

### Implementation Status

| Status | Meaning |
| :--- | :--- |
| **Verified UI** | The user interface exists and was inspected. Data may still be mock unless the notes say otherwise. |
| **Partial UI** | Some screens, states, or workflows exist; material parts are missing. |
| **Missing UI** | No user-facing surface exists. |
| **Mock-only** | The end-to-end workflow is simulated on the client; no production service exists. |
| **Missing backend** | No server, database, or API implementation exists for a capability that is primarily backend or data-layer. |
| **Existing backend** | A real backend implementation exists and was verified. None were found during the initial inventory. |
| **Unverified** | Claimed or suspected, but not confirmed in the repository or documentation. |

Implementation status is **not** a quality score. It describes what exists today.

---

## 7. Review and Update Workflow

1. **Inventory review** — confirm feature boundaries, IDs, actors, scope, priority, and dependencies.
2. **Inventory approval** — lock the inventory baseline. Changes after this point are tracked.
3. **Specification drafting** — write one feature `.md` at a time, in the approved priority order.
4. **Cross-feature review** — reconcile shared entities, APIs, permissions, and state transitions with neighbouring specs.
5. **Specification approval** — lock the spec before implementation.
6. **Implementation** — build against the approved spec only.
7. **Verification** — test functional and negative authorization cases; update status to `Verified`.
8. **Change control** — any material change reopens the spec and, if it changes locked architecture, requires an SOT version increment.

Reviewers must check:

- No duplicate or renamed feature IDs.
- No feature claims a shared entity differently from the owning shared spec.
- Every route is mapped to exactly one owning feature, even if it is also referenced by others.
- Every role has explicit allow and deny rules.
- Every open question has an owner or a decision deadline.
- No implementation status is upgraded without repository evidence.

---

## 8. Non-Negotiable Rules

1. **Inventory listing is not implementation approval.** A feature may appear here and still be blocked, deferred, or unresolved.
2. **No backend implementation begins from this inventory alone.** Each feature needs an approved specification.
3. **The locked SOT wins.** Do not weaken authentication, RBAC, privacy, or AI guardrails to match existing UI.
4. **Shared entities have one owner.** `users`, `studentProfiles`, `facultyProfiles`, `collegeProfile`, `courses`, `classes`, `enrollments`, `timetables`, `attendance`, `marks`, `assignments`, `notices`, `events`, and their shared APIs must be defined once and referenced everywhere else.
5. **Shared business rules stay consistent.** Examples: attendance threshold rules, grade calculation, faculty assignment scope, notice audience resolution, and AI context boundaries.
6. **No silent conflict resolution.** Record disagreements between the SOT, plans, audits, and code in the inventory.
7. **No invented architecture.** Do not introduce an LLM provider, vector database, file-storage vendor, or deployment topology before a decision is approved.
8. **Authorization is backend-authoritative.** Frontend route guards and hidden navigation are convenience, not security.
9. **Credentials never enter feature specs, logs, AI context, or API examples.** Use placeholders.
10. **Documentation must remain reviewable.** Prefer explicit, testable statements over broad aspirations.

---

## 9. What This Directory Is Not

This directory is not:

- A backend architecture document.
- A database schema specification.
- An API reference.
- A replacement for the SOT.
- A UI design system guide.
- Permission to modify application code.

Those artifacts belong in their own approved documents and must remain consistent with this feature map.
