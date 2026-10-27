# College OS — Feature Inventory

**Status:** draft for review

**Last updated:** 27 October 2026

**Purpose:** a plain list of every feature we plan to support, so we can review and approve the scope before writing detailed feature documents.

This is a feature list, not a technical design. No database schemas, API contracts, or code are defined here.

---

## How to read this

- **Backend needed** means: does this feature need real server work before it can actually function?
  Today the backend is an empty Express stub (`backend/server.js`), so almost everything needs server work.
  - **Yes** = real server logic has to be built.
  - **Partly** = some parts already work in the browser, the rest needs a server.
  - **No** = already works without a server.
- **Phase 2** means the locked source of truth (`COLLEGE_OS_SOT.md`) lists the feature as optional expansion, not part of the core MVP. Some of these already have UI built.
- **Pending** lists open questions. None of these are decided yet.

Every route listed below exists in the app today unless it says "no page yet".

---

## Summary

| Group | Features |
| :--- | ---: |
| Authentication | 8 |
| Student features | 16 |
| Faculty features | 9 |
| Shared features | 14 |
| AI features | 4 |
| Future features | 4 |
| **Total** | **55** |

The app currently has 53 page routes. Every one of them is covered below.

---

# 1. Authentication

How people get into the system. The locked source of truth is strict here: accounts are created by the college, never by self sign-up.

### 1.1 Institutional User Provisioning & Account Lifecycle

- **Who uses it:** College administration (no screen yet)
- **Routes:** none yet (planned under `/admin`)
- **What it does:** The college creates every student and staff record before anyone can log in, assigns the role, and manages states such as invited, active, suspended, graduated.
- **Backend needed:** Yes — nothing exists yet.
- **Pending decisions:** How are records brought in (file upload or one by one)? Who is allowed to create HOD, Principal, and Admin accounts? What happens to a record when a student graduates?
- **Future document:** `authentication/institutional-user-provisioning.md`

### 1.2 Student Account Activation

- **Who uses it:** Students, first time only
- **Routes:** `/auth/student/activate`, `/auth/student/confirm`, `/auth/student/password`
- **What it does:** Three steps. The student proves identity with enrollment number and college email, receives an OTP (a one-time code sent to the registered email or phone), confirms the details the college already filled in, then sets their own password.
- **Backend needed:** Yes — the OTP and the account creation are simulated in the browser.
- **Pending decisions:** Which OTP service do we use? How long is a code valid? How do we stop the same student activating twice? Are the current password rules final?
- **Future document:** `authentication/student-account-activation.md`

### 1.3 Student Login

- **Who uses it:** Students
- **Routes:** `/auth/student` (the site root `/` redirects here)
- **What it does:** Student signs in with enrollment number or college email plus password, then lands on the dashboard.
- **Backend needed:** Yes — the demo accepts any password.
- **Pending decisions:** The screen offers a "Create an Account" action, but the locked source of truth says only the college creates accounts. That action must be removed or redefined.
- **Future document:** `authentication/student-login.md`

### 1.4 Faculty & Staff Account Activation

- **Who uses it:** Faculty and staff, first time only
- **Routes:** `/auth/faculty/activate`
- **What it does:** Same three-step flow as students, but using Employee ID instead of enrollment number.
- **Backend needed:** Yes.
- **Pending decisions:** The demo login code has no matching faculty activation function, so this is UI only. Also: is HOD a role chosen here, or assigned later by an administrator?
- **Future document:** `authentication/faculty-staff-activation.md`

### 1.5 Staff Login & Role Routing

- **Who uses it:** Faculty, HOD, Principal, VP, Admin
- **Routes:** `/auth/faculty`, `/auth/staff/login`
- **What it does:** One login for all non-student users. After login the system reads the person's role and sends them to the right area.
- **Backend needed:** Yes — the demo always returns a faculty user.
- **Pending decisions:** Two URLs exist for one screen; we should pick one. HOD, Principal, VP, and Admin landing pages do not exist yet.
- **Future document:** `authentication/staff-login-and-role-routing.md`

### 1.6 Password Reset

- **Who uses it:** Students, faculty, staff
- **Routes:** `/auth/forgot-password`
- **What it does:** Choose role, confirm identity through the college email, verify an OTP, then set a new password.
- **Backend needed:** Yes.
- **Pending decisions:** The demo uses a fixed code `849201`. Decide: reset code or reset link, whether existing sessions are cancelled after a reset, attempt limits, and what a suspended account sees.
- **Future document:** `authentication/password-reset.md`

### 1.7 Session, Logout & Protected Routes

- **Who uses it:** Everyone
- **Routes:** applies to every `/student/**` and `/faculty/**` page
- **What it does:** Remembers who is logged in, sends people to login when they are not, blocks a student from opening faculty pages (and the reverse), and clears everything on logout.
- **Backend needed:** Yes — this is the biggest current gap.
- **Pending decisions:** **Security issue.** The browser currently stores a plain readable cookie (`college_os_session=true`), which anyone can fake by hand to appear logged in. The locked source of truth requires a secure, server-issued cookie the browser cannot read or edit. This has to be rebuilt, not patched.
- **Future document:** `authentication/session-and-route-protection.md`

### 1.8 Two-Factor Authentication & Account Security

- **Who uses it:** Students (no faculty version yet)
- **Routes:** `/student/settings/security`
- **What it does:** Turn on a second login step, see where the account is logged in, revoke a session, and view recent security activity.
- **Backend needed:** Yes — all of it is demo data.
- **Pending decisions:** Two-factor login is **not required** by the locked source of truth. Decide whether to keep it in scope, postpone it, or drop it. The security activity list is sample data, not a real log.
- **Future document:** `authentication/account-security-and-two-factor.md`

---

# 2. Student Features

What a student sees and does after logging in.

### 2.1 Student Dashboard

- **Who uses it:** Students
- **Routes:** `/student`
- **What it does:** The daily starting page: next class, upcoming deadlines, attendance level, recent notices, events, quick actions, and a Campus AI shortcut.
- **Backend needed:** Yes — every figure is demo data.
- **Pending decisions:** Which numbers are official? Attendance percentage and pending-task counts currently come from separate demo files and can disagree.
- **Future document:** `student/student-dashboard.md`

### 2.2 Academic Performance & Grade Cards

- **Who uses it:** Students
- **Routes:** `/student/academics`, `/student/academics/grade-card`
- **What it does:** Shows CGPA and SGPA, semester trend, subject grades, internal marks, and a full transcript, with print and download grade card actions.
- **Backend needed:** Yes.
- **Pending decisions:** GPA formula, grade scale, who is allowed to release results, and when marks become visible to students. Print and download currently do nothing real.
- **Future document:** `student/academic-performance-and-grade-cards.md`

### 2.3 Subject Catalog & Course Details

- **Who uses it:** Students
- **Routes:** `/student/academics/subjects`, `/student/academics/subjects/[code]`
- **What it does:** Browse enrolled subjects and open one to see syllabus, faculty, resources, attendance, internal marks, and related assignments.
- **Backend needed:** Yes.
- **Pending decisions:** The source of truth has no proper course or subject list — subjects appear only as text codes. This needs a real definition before most academic features can be built. The "Ask Faculty" action on the subject page currently does nothing.
- **Future document:** `student/subject-catalog-and-course-details.md`

### 2.4 Timetable & Academic Calendar

- **Who uses it:** Students
- **Routes:** `/student/academics/timetable`
- **What it does:** Week, day, month, and agenda views of classes, plus exams, holidays, and personal reminders.
- **Backend needed:** Yes.
- **Pending decisions:** Only administrators may edit timetables according to the source of truth, so students only read. Still open: room and clash handling, and what happens when the academic year rolls over.
- **Future document:** `student/timetable-and-academic-calendar.md`

### 2.5 Attendance Monitoring

- **Who uses it:** Students
- **Routes:** no page of its own — shown inside `/student/academics` and `/student/academics/subjects/[code]`
- **What it does:** Subject-wise attendance percentage with a warning when the student is close to the minimum required.
- **Backend needed:** Yes.
- **Pending decisions:** The UI assumes 75% — confirm that. Does arriving late count as present? Can a student dispute a wrong entry? Should this get its own page?
- **Future document:** `student/attendance-monitoring.md`

### 2.6 Assignments & Submissions

- **Who uses it:** Students
- **Routes:** `/student/assignments`, `/student/assignments/[id]`
- **What it does:** Lists assignments with deadline and status, shows details and grading criteria, and lets the student upload a file, submit, and view submission history and feedback.
- **Backend needed:** Yes — upload and submit are simulated in the browser.
- **Pending decisions:** Can a student resubmit? What is the late penalty? File size and type limits? Where are files stored?
- **Future document:** `student/assignments-and-submissions.md`

### 2.7 Student Profile & Portfolio

- **Who uses it:** Students; other students view the public version
- **Routes:** `/student/profile`, `/student/profile/edit`, `/student/profile/[id]`
- **What it does:** Combines college-verified details (enrollment number, department, semester) with student-written bio, skills, links, projects, and achievements.
- **Backend needed:** Yes.
- **Pending decisions:** Which fields a student may edit versus which stay read-only is not enforced anywhere yet.
- **Future document:** `student/student-profile-and-portfolio.md`

### 2.8 Projects Showcase

- **Who uses it:** Students (faculty can view)
- **Routes:** `/student/projects`, `/student/projects/[id]`
- **What it does:** Publish projects with description, tech stack, GitHub and live links, and images. Others can like, comment, and ask to join a team.
- **Backend needed:** Yes — everything is stored in the browser today.
- **Pending decisions:** **Conflict to resolve.** A project is meant to support several student members, but the documented schema stores only one student ID. Decide this before building.
- **Future document:** `student/projects-showcase.md`

### 2.9 Internships & Hackathons (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/internships`, `/student/internships/[id]`
- **What it does:** Browse internship openings and hackathons, open details, apply or register, and submit an opportunity for listing.
- **Backend needed:** Yes.
- **Pending decisions:** Marked Phase 2 in the source of truth but already built. Confirm whether it stays in scope. Who verifies listings? Are hackathon teams part of this?
- **Future document:** `student/internships-and-hackathons.md`

### 2.10 Application Tracking (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/internships/applications`
- **What it does:** Tracks internship applications, their status, personal notes, attached documents, and withdrawal.
- **Backend needed:** Yes.
- **Pending decisions:** Who updates the status, the student or the college? Are outside employers involved at all?
- **Future document:** `student/application-tracking.md`

### 2.11 Resume Builder

- **Who uses it:** Students
- **Routes:** `/student/internships/resume-builder`
- **What it does:** Builds a resume from profile data with a live preview, a quality score, and export.
- **Backend needed:** Yes.
- **Pending decisions:** This is not clearly listed in the source of truth, so confirm it is in scope. Real PDF export? The "smart assistant" panel inside it also raises the same privacy questions as the AI features.
- **Future document:** `student/resume-builder.md`

### 2.12 Lost & Found (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/lost-and-found`, `/student/lost-and-found/my-reports`
- **What it does:** Report a lost or found item, browse reports, contact the owner, claim an item, and see possible matches.
- **Backend needed:** Yes.
- **Pending decisions:** Who physically holds the item, how a claim is proven, who moderates posts, and how long reports are kept.
- **Future document:** `student/lost-and-found.md`

### 2.13 Campus Feed & Groups (Phase 2)

- **Who uses it:** Students
- **Routes:** `/student/feed`, `/student/feed/[id]`, `/student/feed/groups/[id]`
- **What it does:** Campus posts with likes, comments, bookmarks, and reporting, plus community groups with members, events, and projects.
- **Backend needed:** Yes.
- **Pending decisions:** Moderation rules, whether anonymous posting is allowed, and whether faculty can post. Direct messaging is still out of scope.
- **Future document:** `student/campus-feed-and-groups.md`

### 2.14 Saved Items

- **Who uses it:** Students
- **Routes:** `/student/saved`
- **What it does:** Bookmarks projects, internships, events, notices, and posts, and groups them into collections.
- **Backend needed:** Yes — saves live only in this browser today, so they disappear on another device.
- **Pending decisions:** Not mentioned in the source of truth. Decide which item types can be saved and whether collections can be shared.
- **Future document:** `student/saved-items.md`

### 2.15 Notification Center

- **Who uses it:** Students
- **Routes:** `/student/notifications`
- **What it does:** All alerts in one place with unread counts, filters, and a clear-read action.
- **Backend needed:** Yes — there is no real source of notifications yet.
- **Pending decisions:** Real-time delivery or only on page load? How long are notifications kept? (The delivery side is described under Shared Features.)
- **Future document:** `student/notification-center.md`

### 2.16 Student Settings

- **Who uses it:** Students
- **Routes:** `/student/settings`
- **What it does:** Account details, theme, font, notification preferences, security shortcuts, and help.
- **Backend needed:** Partly — theme and font already work in the browser; everything else is demo.
- **Pending decisions:** Which preferences should be saved to the account so they follow the student to another device?
- **Future document:** `student/student-settings.md`

---

# 3. Faculty Features

What a faculty member can do. Every faculty action is limited to the classes they are assigned.

### 3.1 Faculty Dashboard

- **Who uses it:** Faculty
- **Routes:** `/faculty`
- **What it does:** Today's classes, a quick class overview, recent student activity, pending tasks, announcements, events, and an AI card.
- **Backend needed:** Yes.
- **Pending decisions:** How "pending tasks" and "student activity" are calculated. Both are hardcoded today.
- **Future document:** `faculty/faculty-dashboard.md`

### 3.2 Assigned Classes & Rosters

- **Who uses it:** Faculty
- **Routes:** `/faculty/classes`
- **What it does:** Shows only the classes, sections, and subjects assigned to this faculty member, with student counts and summaries.
- **Backend needed:** Yes.
- **Pending decisions:** **Key decision.** There is no real model for "which faculty teaches which class" — it is a demo list. Every faculty permission depends on this, so it must be decided early.
- **Future document:** `faculty/assigned-classes-and-rosters.md`

### 3.3 Assigned Students Directory

- **Who uses it:** Faculty
- **Routes:** `/faculty/students`
- **What it does:** Students inside the faculty member's own classes, with academic summary, contact details, and projects.
- **Backend needed:** Yes.
- **Pending decisions:** A faculty member must never see students outside their assigned classes; this needs testing. Which personal details may be shown?
- **Future document:** `faculty/assigned-students-directory.md`

### 3.4 Attendance Management

- **Who uses it:** Faculty
- **Routes:** `/faculty/attendance`
- **What it does:** Pick a class, mark each student present, absent, or late, view summaries and trends, and correct a mistake.
- **Backend needed:** Yes.
- **Pending decisions:** Is attendance per lecture or per day? Does late count as present? The "bulk CSV upload" action is only a placeholder alert today.
- **Future document:** `faculty/attendance-management.md`

### 3.5 Assignments: Create, Review & Grade

- **Who uses it:** Faculty
- **Routes:** `/faculty/assignments`
- **What it does:** Create assignments with deadline, grading criteria, and attachments; review student submissions; download all; grade them.
- **Backend needed:** Yes.
- **Pending decisions:** **Gap.** The "Evaluate" button only shows an alert. Grading needs a real screen, and it must feed the marks students see.
- **Future document:** `faculty/assignment-authoring-and-grading.md`

### 3.6 Marks Entry & Results Publishing

- **Who uses it:** Faculty
- **Routes:** `/faculty/marks`
- **What it does:** Choose class, subject, and exam, enter marks, auto-calculate grades, mark absent students, validate, then publish and lock results.
- **Backend needed:** Yes.
- **Pending decisions:** Exam types and maximum marks, the grade formula, who may publish and lock, and how a correction is made after publishing.
- **Future document:** `faculty/marks-entry-and-publishing.md`

### 3.7 Teaching Timetable & Change Requests

- **Who uses it:** Faculty
- **Routes:** `/faculty/timetable`
- **What it does:** Weekly and daily teaching schedule with class details, plus a request to reschedule or arrange a substitute.
- **Backend needed:** Yes.
- **Pending decisions:** Who approves a change request? Right now the request goes nowhere. Only administrators can edit timetables according to the source of truth.
- **Future document:** `faculty/teaching-timetable-and-change-requests.md`

### 3.8 Academic Resources

- **Who uses it:** Faculty
- **Routes:** `/faculty/resources`
- **What it does:** Upload and organise teaching files, group them in folders, and share them with a class.
- **Backend needed:** Yes.
- **Pending decisions:** Not listed as a core module in the source of truth; confirm scope. There is also no student page to open these resources yet, so sharing has no destination.
- **Future document:** `faculty/academic-resources.md`

### 3.9 Faculty Settings

- **Who uses it:** Faculty
- **Routes:** `/faculty/settings`
- **What it does:** Faculty profile fields such as cabin and bio, plus preferences, security shortcuts, and help.
- **Backend needed:** Partly.
- **Pending decisions:** Which fields are college-controlled and which the faculty member may edit? There is no faculty two-factor page.
- **Future document:** `faculty/faculty-settings.md`

---

# 4. Shared Features

Capabilities used by more than one role. These are grouped together so we define each one only once.

### 4.1 User Identity & Profile Foundation

- **Who uses it:** Everyone
- **Routes:** no page of its own; used by every profile and login screen
- **What it does:** Keeps one account per person, linked to exactly one student or faculty profile, and separates college-controlled fields from personal ones.
- **Backend needed:** Yes.
- **Pending decisions:** Whether profiles live in their own records or inside the user record is undecided. Everything else depends on this, so it comes first.
- **Future document:** `shared/user-identity-and-profiles.md`

### 4.2 Roles and Permissions

- **Who uses it:** Everyone
- **Routes:** no page of its own; applies to every protected route
- **What it does:** Decides what each role may read and change: students only their own records, faculty only their assigned classes, and so on.
- **Backend needed:** Yes — today the browser only hides menus, which is not real protection.
- **Pending decisions:** The exact rules for HOD, Principal, VP, and Admin. Also whether a blocked request should say "not allowed" or "not found".
- **Future document:** `shared/roles-and-permissions.md`

### 4.3 Notices & Announcements

- **Who uses it:** Students, faculty, HOD, Principal, Admin
- **Routes:** `/student/notices`, `/student/notices/[id]`, `/faculty/notices`
- **What it does:** Official circulars with priority, attachments, and a target audience. Faculty can create, edit, and delete notices.
- **Backend needed:** Yes.
- **Pending decisions:** **Conflict to resolve.** The source of truth uses college, HOD, and faculty notice levels, but the documented schema uses all, students, and faculty audiences. Pick one model. HOD and Principal publishing screens do not exist yet.
- **Future document:** `shared/notices-and-announcements.md`

### 4.4 Events

- **Who uses it:** Students, faculty, HOD, Principal, Admin
- **Routes:** `/student/events`, `/student/events/[id]`, `/faculty/events`
- **What it does:** Browse events in a list or calendar, open details, register, and propose an event.
- **Backend needed:** Yes.
- **Pending decisions:** **Gap.** Faculty can view events but cannot create or publish one, even though the source of truth allows faculty to manage events. Seat limits, approval flow, and cancellation rules are undecided.
- **Future document:** `shared/events.md`

### 4.5 Explore & Peer Discovery

- **Who uses it:** Students, faculty
- **Routes:** no dedicated page — spread across `/student/search`, `/student/profile/[id]`, and `/faculty/students`
- **What it does:** Helps people find other students and their projects by branch, semester, and skill.
- **Backend needed:** Yes.
- **Pending decisions:** The source of truth names an "Explore Directory" as a core module, but there is no `/student/explore` page. Decide whether to build one or accept the current split. Also decide what a student is allowed to hide.
- **Future document:** `shared/explore-and-peer-discovery.md`

### 4.6 Global Search

- **Who uses it:** Students (faculty search still limited)
- **Routes:** `/student/search`, plus the ⌘K search in the top bar
- **What it does:** One search across students, projects, internships, events, notices, subjects, posts, and lost and found items.
- **Backend needed:** Yes — search currently runs on demo data in the browser.
- **Pending decisions:** Not mentioned in the source of truth. Search must respect permissions so a student can never find another student's private data.
- **Future document:** `shared/global-search.md`

### 4.7 Notifications (delivery system)

- **Who uses it:** Everyone
- **Routes:** no page of its own; powers the bell panel and the student notification center
- **What it does:** Creates and delivers alerts for deadlines, notices, events, applications, and account changes.
- **Backend needed:** Yes.
- **Pending decisions:** Which events should create a notification. In-app only, or email too? Real-time or on refresh?
- **Future document:** `shared/notifications.md`

### 4.8 File Upload & Secure Download

- **Who uses it:** Everyone
- **Routes:** no page of its own; used by assignments, notices, resources, projects, and events
- **What it does:** Stores uploaded files and checks who is allowed to download each one.
- **Backend needed:** Yes.
- **Pending decisions:** **Key gap.** No file storage exists at all. Decide where files live, size and type limits, and how downloads are protected from people sharing a direct link.
- **Future document:** `shared/file-upload-and-download.md`

### 4.9 API Validation & Error Handling

- **Who uses it:** Everyone (indirectly)
- **Routes:** no page; applies to every future server endpoint
- **What it does:** One consistent way for the server to check input and return errors, so every screen handles failures the same way.
- **Backend needed:** Yes.
- **Pending decisions:** The shape of a standard error response. This should be decided with the first backend feature we build, not separately.
- **Future document:** `shared/api-validation-and-errors.md`

### 4.10 Audit Log

- **Who uses it:** Administrators, later HOD and Principal
- **Routes:** sample card only at `/student/settings/security`; no real log page
- **What it does:** Records important actions such as logins, grade changes, attendance edits, notice publishing, and role changes.
- **Backend needed:** Yes.
- **Pending decisions:** Not clearly required by the source of truth. Decide which actions must be recorded and who may read the log.
- **Future document:** `shared/audit-log.md`

### 4.11 Official College Profile

- **Who uses it:** Everyone; edited by administrators
- **Routes:** no page yet — branding only appears in login screens, the sidebar, and error pages
- **What it does:** Represents the institution itself: name, logo, address, official contacts, and who is authorised to publish on its behalf. Kept separate from any individual admin's account.
- **Backend needed:** Yes.
- **Pending decisions:** Is there a public college page, or only an admin edit screen?
- **Future document:** `shared/college-profile.md`

### 4.12 App Shell & Navigation

- **Who uses it:** Everyone
- **Routes:** every `/student/**` and `/faculty/**` page
- **What it does:** Sidebar, top bar, mobile menu, search, notifications, profile menu, and logout, with a different menu for each role.
- **Backend needed:** No — already works.
- **Pending decisions:** HOD, Principal, and Admin menus do not exist yet.
- **Future document:** `shared/app-shell-and-navigation.md`

### 4.13 Theme, Fonts & Responsive Layout

- **Who uses it:** Everyone
- **Routes:** every page
- **What it does:** Light and dark mode, twelve font choices, and layouts that adapt to phone, tablet, and desktop.
- **Backend needed:** No — it already runs in the browser.
- **Pending decisions:** Should the chosen theme follow the user to another device? Currently it is saved only in that browser.
- **Future document:** `shared/theme-and-typography.md`

### 4.14 Error Pages & Recovery

- **Who uses it:** Everyone
- **Routes:** site-wide 404 page, page error screen, full-app error screen
- **What it does:** Shows a friendly not-found page, lets the user retry after a page error, and offers a reload if the whole app fails.
- **Backend needed:** No — already works.
- **Pending decisions:** One known dead link: the 404 page points to `/student/campus-feed`, which does not exist.
- **Future document:** `shared/error-pages-and-recovery.md`

---

# 5. AI Features

The two assistants look separate in the UI but the plan is one shared engine behind both.

### 5.1 Student Campus AI

- **Who uses it:** Students
- **Routes:** `/student/campus-ai`
- **What it does:** A chat assistant for the student's own timetable, attendance, marks, assignments, notices, and college documents. It shows where an answer came from and says clearly when it does not have the information.
- **Backend needed:** Yes — no real AI exists. Replies are keyword-matched demo text.
- **Pending decisions:** Which AI provider and model. Whether conversations are saved, and for how long. What exact wording to use when the answer is unavailable.
- **Future document:** `ai/student-campus-ai.md`

### 5.2 Faculty Campus AI

- **Who uses it:** Faculty
- **Routes:** `/faculty/campus-ai`
- **What it does:** The same assistant for faculty, limited to their assigned classes: students, attendance, marks, assignments, notices, and policies.
- **Backend needed:** Yes — same keyword demo as the student version.
- **Pending decisions:** **Sensitive.** How much student detail may the AI show faculty, whole-class summaries or individual records? Can it perform actions such as creating an assignment, or only answer questions? Should faculty AI use be recorded? All undecided.
- **Future document:** `ai/faculty-campus-ai.md`

### 5.3 Campus AI Engine (shared)

- **Who uses it:** Both assistants
- **Routes:** none yet (planned as a server endpoint)
- **What it does:** The single service that checks who is asking, looks up only the data that person is allowed to see, searches college documents, and refuses when information is missing.
- **Backend needed:** Yes.
- **Pending decisions:** This must be built after login, roles, and academic data exist. No provider or model is chosen, on purpose.
- **Future document:** `ai/campus-ai-engine.md`

### 5.4 College Document Knowledge Base

- **Who uses it:** Both assistants; uploaded by administrators
- **Routes:** no page; ingestion and admin tooling not built
- **What it does:** Stores official college documents such as rules, syllabi, and circulars in a searchable form so the AI can quote the relevant text with a source instead of guessing. This approach is called retrieval-augmented generation: find the official passage first, then answer from it.
- **Backend needed:** Yes.
- **Pending decisions:** Who uploads and approves documents, which documents are allowed, and how department-only documents are kept away from other departments.
- **Future document:** `ai/document-knowledge-base.md`

---

# 6. Future Features

Documented roles and capabilities that are **not** part of the current plan to build. They are listed so the design does not accidentally block them later.

### 6.1 HOD Department View

- **Who uses it:** Head of Department
- **Routes:** none (planned under `/hod`)
- **What it does:** Department-wide view of classes, faculty, attendance, marks, and departmental notices.
- **Backend needed:** Yes.
- **Pending decisions:** Is this in scope at all right now? What may an HOD change, as opposed to only view?
- **Future document:** `future/hod-department-view.md`

### 6.2 Principal / VP View

- **Who uses it:** Principal, Vice Principal
- **Routes:** none (planned under `/principal` and `/vp`)
- **What it does:** Campus-wide academic overview, cross-department figures, and official campus circulars.
- **Backend needed:** Yes.
- **Pending decisions:** Is this in scope now? What is the difference between Principal and VP permissions? Are there approval steps?
- **Future document:** `future/principal-and-vp-view.md`

### 6.3 Admin / System Settings

- **Who uses it:** Administrator
- **Routes:** none (planned under `/admin`)
- **What it does:** Creates users, edits the college profile, manages timetables, overrides locked grades, and reviews the audit log.
- **Backend needed:** Yes.
- **Pending decisions:** How Admin, HOD, and Principal are separated. Whether administrators need stronger login (two-factor). Which destructive actions need a second confirmation.
- **Future document:** `future/admin-and-system-settings.md`

### 6.4 Leadership AI

- **Who uses it:** HOD, Principal, VP, Admin
- **Routes:** none
- **What it does:** Department-level and campus-level questions for leadership, plus review of what the AI retrieved.
- **Backend needed:** Yes.
- **Pending decisions:** Whether this exists at all. If it does, whether leadership sees individual records or only summaries.
- **Future document:** `future/leadership-ai.md`

**Note on already-built Phase 2 student features.**
Internships, hackathons, application tracking, resume builder, lost and found, and the campus feed are listed under **Student Features** and marked Phase 2. They are not repeated here, to avoid two entries for one feature.

---

## Decisions we need from you before writing feature documents

These block the most work if left open:

1. **Session security.** Replace the fake browser cookie with a proper server session. This is a real security hole today, not a preference.
2. **User identity.** One account linked to one student or faculty profile — confirm the shape.
3. **Classes and faculty assignment.** We need a real definition of course, class, section, and "who teaches what", because every faculty permission depends on it.
4. **Projects with multiple members.** The schema currently allows one student per project, but the product needs teams.
5. **Notice audience model.** One model for college, department, and class targeting.
6. **Higher roles.** Are HOD, Principal, VP, and Admin in the current scope, or clearly later?
7. **AI boundary.** Especially how much student information Faculty AI may reveal.

---

## What this document is not

This is a list for review. It does not approve implementation, and it does not define database schemas or API contracts. No backend code should be written until the relevant feature document is written and approved.
