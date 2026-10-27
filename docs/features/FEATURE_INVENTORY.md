# College OS — Feature Inventory

**Status:** draft for review

**Last updated:** 27 October 2026

**Scope basis:** `COLLEGE_OS_SOT.md` v1.2 (amended), Project Plan v1.1

**Purpose:** the approved feature list, so we can review scope before writing detailed feature documents.

This is a feature list, not a technical design. No database schemas, API contracts, or code are defined here.

---

## Approved scope at a glance

| Scope | Count | Contents |
| :--- | ---: | :--- |
| Core MVP modules | **12** | The 11 original modules plus **Academic Resources & Study Materials** (added in SOT v1.2) |
| Core institutional entity | 1 | Official College Profile |
| Phase 2 modules | **4** | Internships, Hackathons, Campus Community Feed, Digital Lost & Found |

The core/Phase 2 boundary follows Section 18 of the Project Plan and Sections 19–20 of the SOT. Phase 2 features do not delay the core MVP.

---

## How to read this

- **IDs** are short, stable labels used when discussing a feature (for example `STU-04`). They do not change once assigned. A removed feature's ID is retired, not reused.
- **Backend needed** means: does this need real server work before it can function?
  Today the backend is an empty Express stub (`backend/server.js`), so almost everything needs server work.
  - **Yes** = real server logic has to be built.
  - **Partly** = some parts already work in the browser, the rest needs a server.
  - **No** = already works without a server.
- **Phase 2** means the feature is approved but scheduled after the core MVP. Phase 2 entries appear in their normal domain section, not in a separate section.
- **Routes** exist in the app today unless the entry says otherwise.
- **Pending decisions** are genuinely open questions, not hidden requirements.

### Feature counts

| Group | Core MVP | Phase 2 | Total |
| :--- | ---: | ---: | ---: |
| Authentication | 7 | 0 | 7 |
| Student features | 7 | 4 | 11 |
| Faculty features | 8 | 0 | 8 |
| Shared features | 7 | 0 | 7 |
| AI features | 4 | 0 | 4 |
| **Total** | **33** | **4** | **37** |

---

# 1. Authentication

How people get into the system. The SOT is strict here: accounts are created by the college, never by self sign-up. Institutional roles (`student`, `faculty`, `hod`, `principal`, `vp`, `admin`) exist as authorized roles with defined scopes. The HOD, Principal/VP, and Admin roles are preserved here and in `SHARED-02`; dedicated dashboards for them are not part of the approved scope.

### AUTH-01 — Institutional User Provisioning & Account Lifecycle

- **Who uses it:** College administration (no screen in approved scope)
- **Routes:** none yet
- **What it does:** Creates every student and staff record before anyone can log in, assigns the institutional role, and manages the account lifecycle: invited, active, suspended, graduated.
- **Backend needed:** Yes — nothing exists yet.
- **Pending decisions:** How records are imported (bulk file or one by one) and what format. Who is authorized to create HOD, Principal/VP, and Admin records. What happens to records and data when a student graduates.
- **Future document:** `authentication/institutional-user-provisioning.md`

### AUTH-02 — Student Account Activation (OTP)

- **Who uses it:** Students, first time only
- **Routes:** `/auth/student/activate`, `/auth/student/confirm`, `/auth/student/password`
- **What it does:** Three steps. The student proves identity with enrollment number and official college email or verified contact, receives a time-bound OTP (one-time code), confirms the read-only details the college already recorded, then sets their own password.
- **Backend needed:** Yes — the OTP and account creation are simulated in the browser.
- **Pending decisions:** Which OTP delivery service is approved. Code lifetime and resend limits. How duplicate activation is prevented. Whether the current password policy is final.
- **Future document:** `authentication/student-account-activation.md`

### AUTH-03 — Student Login

- **Who uses it:** Students
- **Routes:** `/auth/student` (the site root `/` redirects here)
- **What it does:** Signs in with enrollment number or college email plus password, then opens the student dashboard.
- **Backend needed:** Yes — the demo accepts any password.
- **Pending decisions:** The screen currently offers "Create an Account", which contradicts the no-open-registration rule in the SOT. That action must be removed or redefined.
- **Future document:** `authentication/student-login.md`

### AUTH-04 — Faculty & Staff Account Activation (OTP)

- **Who uses it:** Faculty and staff, first time only
- **Routes:** `/auth/faculty/activate`
- **What it does:** The same activation flow using Employee ID instead of enrollment number. Role and department derive from the provisioned record.
- **Backend needed:** Yes.
- **Pending decisions:** The demo has no matching faculty activation function, so this is UI only. Confirm whether HOD and executive roles activate through this same flow (SOT Section 6.4–6.5 indicates they use Staff Login).
- **Future document:** `authentication/faculty-staff-activation.md`

### AUTH-05 — Staff Login & Role Routing

- **Who uses it:** Faculty, HOD, Principal, VP, Admin
- **Routes:** `/auth/faculty`, `/auth/staff/login`
- **What it does:** One login entry point for all non-student users. The backend resolves the authoritative role and routes the person to the workspace that role permits.
- **Backend needed:** Yes — the demo always returns a faculty user.
- **Pending decisions:** Two URLs serve the same screen; pick one as canonical. Role routing targets for HOD, Principal, VP, and Admin must be defined before those roles can log in usefully, even though their dashboards are out of scope.
- **Future document:** `authentication/staff-login-and-role-routing.md`

### AUTH-06 — Password Reset & Change

- **Who uses it:** Students, faculty, staff
- **Routes:** `/auth/forgot-password`
- **What it does:** Confirms identity through the official college email, verifies an OTP, and sets a new password. Also covers a signed-in user changing their own password.
- **Backend needed:** Yes.
- **Pending decisions:** The demo uses a fixed code `849201`. Decide reset-code versus reset-link, whether existing sessions are revoked after a reset, attempt limits, and what a suspended account is allowed to do.
- **Future document:** `authentication/password-reset.md`

### AUTH-07 — Session, Logout & Route Protection

- **Who uses it:** Everyone
- **Routes:** applies to every `/student/**` and `/faculty/**` page
- **What it does:** Keeps the authenticated session, blocks protected pages when signed out, blocks cross-role access, and clears the session on logout.
- **Backend needed:** Yes — this is the largest current security gap.
- **Pending decisions:** **Security issue.** The browser currently stores a plain readable cookie (`college_os_session=true`), which anyone can set by hand to appear signed in. The SOT requires a server-issued, HttpOnly session token. This must be rebuilt, not patched. Active-session review and revocation belong here rather than in a separate security feature.
- **Future document:** `authentication/session-and-route-protection.md`

---

# 2. Student Features

What a student sees and does after signing in. Academic views share data with the matching faculty features; the student side is read and submit only.

### STU-01 — Student Dashboard

- **Who uses it:** Students
- **Routes:** `/student`
- **What it does:** The daily starting page: next class, upcoming deadlines, attendance standing, recent notices, events, and a Campus AI shortcut. It aggregates data owned by the academic features.
- **Backend needed:** Yes — every figure is demo data.
- **Pending decisions:** Which figures are official and how each is calculated. It must read from the same sources as the academic modules rather than separate demo files.
- **Future document:** `student/student-dashboard.md`

### STU-02 — Academic Performance, Marks & Grade Cards

- **Who uses it:** Students
- **Routes:** `/student/academics`, `/student/academics/grade-card`, `/student/academics/subjects`, `/student/academics/subjects/[code]`
- **What it does:** Shows CGPA and SGPA, semester trend, subject grades, internal assessment marks, and a full transcript, with print and download grade card actions. Subject pages give the essential subject, faculty, and syllabus context for these marks.
- **Backend needed:** Yes.
- **Pending decisions:** GPA formula, grade scale, who may release results, and when marks become visible. Print and download currently do nothing real.
- **Scope note:** There is no separate Subject Catalog module. Subject information is part of this academic view. The existing "Ask Faculty" action on the subject page is **not approved scope** and should be removed from the UI.
- **Future document:** `student/academic-performance-and-grade-cards.md`

### STU-03 — Timetable & Academic Calendar

- **Who uses it:** Students
- **Routes:** `/student/academics/timetable`
- **What it does:** Week, day, month, and agenda views of the student's section timetable, plus exams, holidays, and personal reminders.
- **Backend needed:** Yes.
- **Pending decisions:** Only administrators may edit timetables per the SOT, so students read only. Still open: room and clash handling, and academic-year rollover.
- **Future document:** `student/timetable-and-academic-calendar.md`

### STU-04 — Attendance Monitoring

- **Who uses it:** Students
- **Routes:** no page of its own — shown inside `/student/academics` and `/student/academics/subjects/[code]`
- **What it does:** Subject-wise attendance percentage with shortage alerts against the SOT threshold of 75%.
- **Backend needed:** Yes.
- **Pending decisions:** Does arriving late count as present? Can a student dispute a wrong entry, and who resolves it? Is attendance calculated per lecture or per day (this must match `FAC-04`)?
- **Future document:** `student/attendance-monitoring.md`

### STU-05 — Assignments & Submissions

- **Who uses it:** Students
- **Routes:** `/student/assignments`, `/student/assignments/[id]`
- **What it does:** Lists assignments with deadline and status, shows details and grading criteria, accepts a file submission, and shows submission history and instructor feedback. Deadline changes and new assignments raise in-app notifications.
- **Backend needed:** Yes — upload and submit are simulated in the browser.
- **Pending decisions:** Resubmission policy, late penalty, file size and type limits, and where submissions are stored.
- **Future document:** `student/assignments-and-submissions.md`

### STU-06 — Student Profile & Portfolio

- **Who uses it:** Students; other students and faculty view the public version
- **Routes:** `/student/profile`, `/student/profile/edit`, `/student/profile/[id]`
- **What it does:** Combines college-verified details (name, enrollment number, department, semester, section) with student-controlled content: photo, bio, skills, GitHub and portfolio links, badges, and linked projects.
- **Backend needed:** Yes.
- **Pending decisions:** The read-only boundary for institution-controlled fields is not enforced anywhere yet. Profile and account settings live here; there is no separate general settings module.
- **Future document:** `student/student-profile-and-portfolio.md`

### STU-07 — Projects Showcase & Likes

- **Who uses it:** Students (faculty can view through the directory)
- **Routes:** `/student/projects`, `/student/projects/[id]`
- **What it does:** Students publish technical projects with description, tech stack, repository and live links, and images. Projects carry multi-member contributor attribution, appear on each collaborator's profile, and can be liked by authenticated campus users.
- **Backend needed:** Yes — everything is stored in the browser today.
- **Pending decisions:** **Unresolved conflict.** The SOT requires multi-member attribution, but the documented `projects` schema stores a single `studentId`. This must be decided before building.
- **Scope note:** Public comments and team-join workflows currently in the UI are **not approved** for the core MVP and should not be treated as requirements. Team formation belongs to the Hackathons Phase 2 module.
- **Future document:** `student/projects-showcase.md`

### STU-08 — Internships Ecosystem (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/internships`, `/student/internships/[id]`, `/student/internships/applications`
- **What it does:** A curated internships module covering listings, opportunity details, applying, and application tracking with statuses, notes, documents, and withdrawal. Application tracking is part of this module, not a separate feature.
- **Backend needed:** Yes.
- **Pending decisions:** Who curates and verifies listings, and whether listings are internal or external. Application status taxonomy and who may update a status. The SOT also names referral matching; it is not built and needs confirmation before it is added.
- **Future document:** `student/internships-ecosystem.md`

### STU-09 — Hackathons & Competitions (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/internships` (Hackathons tab)
- **What it does:** Discovery of hackathons and competitions, event details, and registration. Team formation is part of this module.
- **Backend needed:** Yes.
- **Pending decisions:** Team formation rules: team size, invitations, leadership, and whether teams can be formed before registration closes. Hackathons are kept distinct from internships and are not merged into that module.
- **Future document:** `student/hackathons-and-competitions.md`

### STU-10 — Campus Community Feed (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/feed`, `/student/feed/[id]`, `/student/feed/groups/[id]`
- **What it does:** An authenticated campus discussion feed with posts, likes, comments, bookmarks, and reporting.
- **Backend needed:** Yes.
- **Pending decisions:** Moderation policy, whether anonymous posting is allowed, and whether faculty may participate. A separate community-groups subsystem is **not approved**; the existing group pages should not be treated as approved scope without a decision.
- **Future document:** `student/campus-community-feed.md`

### STU-11 — Digital Lost & Found (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/lost-and-found`, `/student/lost-and-found/my-reports`
- **What it does:** Structured reporting of lost and found items, browsing and matching, owner contact, and a claim workflow with verification.
- **Backend needed:** Yes.
- **Pending decisions:** Who holds an item, how ownership is proven during a claim, who resolves a disputed claim, and how long reports are retained.
- **Audit requirement:** Claim submissions, verification decisions, and handovers must be recorded for audit, because they move physical property between people.
- **Future document:** `student/digital-lost-and-found.md`

---

# 3. Faculty Features

Every faculty action is bounded to the classes and subjects assigned to that faculty member. Zero lateral access to other departments, classes, or subjects.

### FAC-01 — Faculty Dashboard

- **Who uses it:** Faculty
- **Routes:** `/faculty`
- **What it does:** Today's classes, class overview, recent student activity, pending tasks, announcements, events, and a Campus AI card. It aggregates data owned by the faculty academic features.
- **Backend needed:** Yes.
- **Pending decisions:** How "pending tasks" and "student activity" are defined and calculated. Both are hardcoded today.
- **Future document:** `faculty/faculty-dashboard.md`

### FAC-02 — Assigned Classes & Rosters

- **Who uses it:** Faculty
- **Routes:** `/faculty/classes`
- **What it does:** Shows only the classes, sections, and subjects assigned to the signed-in faculty member, with student counts and summary context.
- **Backend needed:** Yes.
- **Pending decisions:** **Key decision.** There is no real model for which faculty teaches which class. It is a demo list today, and every faculty permission depends on it.
- **Future document:** `faculty/assigned-classes-and-rosters.md`

### FAC-03 — Assigned Students Directory

- **Who uses it:** Faculty
- **Routes:** `/faculty/students`
- **What it does:** The faculty member's view of the Explore Directory: students within their own assigned classes, with academic summary, contact details, and projects.
- **Backend needed:** Yes.
- **Pending decisions:** Which personal details may be shown. Access outside assigned classes must be blocked and tested.
- **Future document:** `faculty/assigned-students-directory.md`

### FAC-04 — Attendance Management & Roll-Call

- **Who uses it:** Faculty
- **Routes:** `/faculty/attendance`
- **What it does:** Select a class, mark each student present, absent, or late, review summaries and trends, and correct a mistaken entry.
- **Backend needed:** Yes.
- **Pending decisions:** Attendance granularity (per lecture or per day), late weighting, and the correction workflow. The "bulk CSV upload" action is a placeholder alert today.
- **Audit requirement:** Manual edits and corrections must record who changed the entry and when.
- **Future document:** `faculty/attendance-management.md`

### FAC-05 — Assignments: Authoring, Review & Grading

- **Who uses it:** Faculty
- **Routes:** `/faculty/assignments`
- **What it does:** Creates assignments with deadline, rubric, and attachments; reviews student submissions; downloads submissions; and grades them.
- **Backend needed:** Yes.
- **Pending decisions:** **Gap.** The "Evaluate" action only shows an alert. Grading needs a real screen, and scores must feed `STU-02` and `FAC-06`. Rubric model, late policy, and feedback release are open.
- **Future document:** `faculty/assignment-authoring-and-grading.md`

### FAC-06 — Marks Entry & Results Publishing

- **Who uses it:** Faculty
- **Routes:** `/faculty/marks`
- **What it does:** Selects class, subject, and exam, enters marks, calculates grades, records absentees, validates entries, then publishes and locks results.
- **Backend needed:** Yes.
- **Pending decisions:** Exam types and maximum marks, grade formula, who may publish and lock, and how corrections are made after publishing. Administrative sign-off is described in the SOT but has no defined workflow.
- **Audit requirement:** Every mark change and lock must record the authorizing faculty member.
- **Future document:** `faculty/marks-entry-and-publishing.md`

### FAC-07 — Teaching Timetable & Schedule Change Requests

- **Who uses it:** Faculty
- **Routes:** `/faculty/timetable`
- **What it does:** Weekly and daily teaching schedule derived from assigned classes, with class detail and a request to reschedule or arrange a substitute.
- **Backend needed:** Yes.
- **Pending decisions:** Who approves a change request and where the request goes. Only administrators may write timetables per the SOT.
- **Future document:** `faculty/teaching-timetable-and-change-requests.md`

### FAC-08 — Academic Resources & Study Materials

- **Who uses it:** Faculty (upload and manage); Students (browse and download)
- **Routes:** `/faculty/resources` (faculty); no student route yet
- **What it does:** Faculty upload PDFs, notes, and other approved study material and associate each item with a subject and class or batch. Students browse material for their own subjects and classes, and download what they are permitted to access.
- **Backend needed:** Yes.
- **Pending decisions:** Approved file types and maximum upload size. Which student surface shows the material, since no student route exists yet. Retention and removal rules. This module is approved scope as of SOT v1.2; it is not a learning-management system.
- **Future document:** `faculty/academic-resources-and-study-materials.md`

---

# 4. Shared Features

Capabilities used by more than one role. Each is defined once so no two features invent competing versions.

### SHARED-01 — User Identity & Profile Foundation

- **Who uses it:** Everyone
- **Routes:** no page of its own; used by every profile and authentication screen
- **What it does:** One account per person, linked to exactly one student or faculty profile, with institution-controlled fields separated from user-controlled fields.
- **Backend needed:** Yes.
- **Pending decisions:** Whether profiles are separate collections or embedded. Unique indexes and how duplicate records are handled. How an official field is corrected.
- **Future document:** `shared/user-identity-and-profiles.md`

### SHARED-02 — Roles & Permissions (RBAC)

- **Who uses it:** Everyone
- **Routes:** no page; enforced on every protected route and endpoint
- **What it does:** Enforces the authoritative role and scope from the SOT: students see their own records, faculty only assigned classes and subjects, HOD the department, Principal/VP the campus, Admin system configuration. The backend role is authoritative; frontend role values are never trusted.
- **Backend needed:** Yes — today the browser only hides menus, which is not access control.
- **Pending decisions:** The exact HOD and Principal/VP read-and-write boundaries. Whether a denied request returns "forbidden" or "not found". How denials are logged.
- **Scope note:** HOD, Principal/VP, and Admin are preserved as roles with permissions and access restrictions. Their dedicated dashboards are not approved feature entries; the permissions must still be enforced.
- **Future document:** `shared/roles-and-permissions.md`

### SHARED-03 — Notices & Announcements

- **Who uses it:** Students, faculty, HOD, Principal/VP, Admin
- **Routes:** `/student/notices`, `/student/notices/[id]`, `/faculty/notices`
- **What it does:** Official broadcasts at three levels: college-wide (administrative), department (HOD), and class-level (faculty for assigned classes). Supports priority flags, attachments, and read/detail views.
- **Backend needed:** Yes.
- **Pending decisions:** **Unresolved conflict.** The SOT defines `college`, `hod`, and `faculty` notice levels, while the documented `notices` schema uses `all`, `students`, and `faculty` audiences. One model must be chosen.
- **Notification behaviour:** New and urgent notices raise in-app notifications within this feature. There is no separate notification subsystem.
- **Audit requirement:** Publishing, editing, and deleting a notice must record the author and role.
- **Future document:** `shared/notices-and-announcements.md`

### SHARED-04 — Campus Events

- **Who uses it:** Students, faculty, HOD, Principal/VP, Admin
- **Routes:** `/student/events`, `/student/events/[id]`, `/faculty/events`
- **What it does:** Event directory and calendar for symposiums, workshops, hackathons, and guest lectures, with details, venue, registration link, and registration.
- **Backend needed:** Yes.
- **Pending decisions:** **Gap.** The SOT allows authorized faculty to manage events, but the faculty events page can only browse and open details. Event ownership, approval, capacity, waitlist, and cancellation are undefined.
- **Notification behaviour:** Event announcements and registration confirmations raise in-app notifications within this feature.
- **Future document:** `shared/campus-events.md`

### SHARED-05 — Explore Directory & Peer Discovery

- **Who uses it:** Students, faculty
- **Routes:** `/student/search`, `/student/profile/[id]`, `/faculty/students`
- **What it does:** Directory search and discovery of peers by skills, branch, or semester, with public profile inspection and project discovery.
- **Backend needed:** Yes.
- **Pending decisions:** Whether a dedicated directory page is needed or the current split across search and profiles is sufficient. What a student may hide from the directory.
- **Scope note:** There is no separate universal search subsystem. Search lives here and is limited to directory and discovery content. The command palette remains a UI convenience only.
- **Future document:** `shared/explore-directory.md`

### SHARED-06 — File Upload & Secure Download

- **Who uses it:** Everyone, through the features that accept files
- **Routes:** no page of its own
- **What it does:** Stores and authorizes files for approved workflows: assignment submissions, project media, notice attachments, event banners, and academic resources.
- **Backend needed:** Yes — no storage exists today.
- **Pending decisions:** Where files are stored, signed download URLs, size and type limits, malware scanning, orphan cleanup, and retention. Which role may download which file must be defined per workflow.
- **Future document:** `shared/file-upload-and-download.md`

### SHARED-07 — Official College Profile

- **Who uses it:** Everyone; edited by authorized administrators
- **Routes:** no dedicated page; branding appears in the portal, sidebar, and error pages
- **What it does:** The singleton institutional identity: name, code, established year, address, official contacts, website, institutional bio, and the administrators authorized to publish on the college's behalf. Kept separate from any individual admin account.
- **Backend needed:** Yes.
- **Pending decisions:** Whether a public college page is in scope or only the institutional record and admin editing. How branding assets are managed.
- **Future document:** `shared/official-college-profile.md`

---

# 5. AI Features

The plan is one shared Campus AI engine behind both assistants. Role scope, not a separate engine, determines what each user may ask.

### AI-01 — Student Campus AI

- **Who uses it:** Students
- **Routes:** `/student/campus-ai`
- **What it does:** Answers questions about the student's own timetable, attendance, marks, assignments, notices, and official college documents, with source attribution and an explicit "information unavailable" response when the records do not contain the answer.
- **Backend needed:** Yes — no real AI exists. Replies are keyword-matched demo text.
- **Pending decisions:** Provider and model. Whether conversations are stored, and for how long. The exact refusal wording and citation format.
- **Future document:** `ai/student-campus-ai.md`

### AI-02 — Faculty Campus AI

- **Who uses it:** Faculty
- **Routes:** `/faculty/campus-ai`
- **What it does:** The same assistant for faculty, bounded to assigned classes and subjects: class attendance, marks, assignments, student context, notices, and policies.
- **Backend needed:** Yes — the same keyword demo as the student version.
- **Pending decisions:** **Sensitive.** How much student detail the assistant may return: whole-class summaries only, or individual records. Whether it may perform actions such as creating an assignment, or only answer. Whether usage is logged.
- **Future document:** `ai/faculty-campus-ai.md`

### AI-03 — Campus AI Engine (shared)

- **Who uses it:** All roles with AI access
- **Routes:** no page; server-side capability
- **What it does:** Validates the session, resolves the authoritative role, applies least-privilege context assembly, routes structured queries to the operational database and document queries to retrieval, and refuses to speculate when records are missing. Credentials, OTPs, and secrets are excluded from context.
- **Backend needed:** Yes.
- **Pending decisions:** Router contract, refusal taxonomy, and prompt-injection handling. No provider is chosen, on purpose.
- **Role scope:** Student uses personal scope. Faculty uses assigned-class scope. HOD uses department scope. Principal/VP uses campus scope. Admin performs retrieval audit and system metrics. These permissions are enforced here and in `SHARED-02`; they are not separate AI features.
- **Future document:** `ai/campus-ai-engine.md`

### AI-04 — Institutional Document Knowledge Base (RAG)

- **Who uses it:** All roles with AI access; documents managed by authorized staff
- **Routes:** no page; ingestion and management tooling not built
- **What it does:** Stores official college documents such as examination ordinances, academic handbooks, hostel guidelines, and syllabi in a searchable form so answers quote the relevant passage with a source instead of guessing.
- **Backend needed:** Yes.
- **Pending decisions:** Who owns and approves the document corpus. Which embedding model and vector store are approved. Chunking strategy, citation format, and how department-only documents are isolated.
- **Future document:** `ai/document-knowledge-base.md`

---

# 6. Cross-cutting requirements and platform concerns

These are real requirements, but they are not separate product features and are not counted above.

| Concern | Where it is handled |
| :--- | :--- |
| **Notifications** | No standalone subsystem. Notices, assignments, events, internships, and Lost & Found raise in-app notifications within their own workflows. The existing bell panel and student notification page are UI surfaces for these events. |
| **Auditing** | Required for authentication and role changes, attendance edits, mark changes and locks, notice publishing, and Lost & Found claim resolution. Each owning feature records who acted and when. There is no separate audit product. |
| **API validation and error handling** | Shared engineering conventions, to be documented once in `shared/backend-conventions.md` before the first endpoint is built. Not a product module. |
| **File handling** | `SHARED-06` defines storage, validation, and authorized download for every workflow that accepts files. |
| **App shell, navigation, theme, typography, responsive layout, error pages** | Existing UI/platform implementation. They are maintained as frontend concerns and do not need separate backend feature specifications. |
| **Profile, account, and security settings** | Folded into `STU-06` (student profile), `SHARED-01` (faculty profile and account fields), and `AUTH-06`/`AUTH-07` (password and session security). There is no separate general settings module. |

### Existing UI routes without an approved feature entry

These screens exist in the repository but are not part of the approved scope. They must not be treated as requirements.

| Route | Treatment |
| :--- | :--- |
| `/student/internships/resume-builder` | Not approved. Remove or leave out of scope. |
| `/student/saved` | Not approved. Bookmarking is not a product requirement. |
| `/student/notifications` | UI surface only. No separate notification module. |
| `/student/settings`, `/student/settings/security` | Folded into profile and authentication. Not a separate module. |
| `/faculty/settings` | Folded into faculty profile. Not a separate module. |

---

# 7. Open decisions

Only the items that genuinely block design work:

1. **Session security.** Replace the client-set cookie with a server-issued HttpOnly session. This is a live security gap.
2. **Identity model.** Confirm one account linked to one student or faculty profile, and where profiles live.
3. **Classes and faculty assignment.** Define course, class, section, and teaching assignment. Every faculty permission depends on it.
4. **Project multi-member attribution.** The SOT requires multiple contributors; the schema stores one `studentId`.
5. **Notice audience model.** Reconcile `college`/`hod`/`faculty` with `all`/`students`/`faculty`.
6. **Faculty AI data boundary.** Decide how much student detail the assistant may return.
7. **Academic Resources storage.** Approved file types, size limits, retention, and the student access surface.

---

# 8. What changed in this revision

The inventory was reduced to approved scope only.

- **Added:** Academic Resources & Study Materials (`FAC-08`), approved in SOT v1.2.
- **Removed:** Resume Builder, two-factor authentication as a standalone feature, Saved Items, universal Global Search, leadership AI, and the HOD/Principal/VP/Admin dashboard entries.
- **Merged:** Application Tracking into the Internships Ecosystem. Subject details into academic performance. Notification behaviour into Notices, Assignments, Events, and other workflows. Profile and security settings into the identity and authentication features.
- **Reclassified:** App shell, theme, responsive layout, error pages, and API conventions are platform and engineering concerns, not product features. The standalone audit log and notification subsystem are requirements inside the features that need them.
- **Retained:** OTP activation and reset, institutional provisioning, account lifecycle, RBAC for all five institutional roles, all four Phase 2 modules, and the Official College Profile.

---

# 9. What this document is not

This is the approved feature list for review. It does not authorize implementation and does not define schemas or API contracts. No backend code should be written until the relevant feature document is written and approved.
