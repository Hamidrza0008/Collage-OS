# COLLEGE OS — DEVELOPMENT ROADMAP & WORKING CHECKLIST

> **Living Document**: This roadmap tracks the real, verified implementation status of the College OS project across all four development phases. Checkboxes are updated strictly when features are fully built, styled, and verified.

---

## Current Status

- **Active Phase**: **Phase 1 — UI / Frontend** (Near Completion — Student Portal 100% Complete)
- **Completed Milestones**:
  - Global Application Shell: Responsive Desktop Sidebar with Campus Artwork & Mobile Drawer, Sticky Glass Navbar with dynamic scroll elevation, Search input with ⌘K shortcut, Theme Toggle (Light/Dark), and live Google Fonts Switcher (12 curated fonts with DOM injection and local storage locking).
  - Design System Tokens: Light and Dark theme variables, emerald & mint aesthetic, custom scrollbars, typography, and page-wise asset architecture.
  - Student Dashboard (`/student`): Welcome Hero, Quick Stats, Timetable, Assignments, Attendance, Notices, Events, and Campus AI Quick Ask widget.
  - Student Profile (`/student/profile`): 2-column layout (Profile Hero, Profile Completion gauge, interactive section tabs with scroll spy, unclipped About Me with quote card, Quick Info, Stats, Featured Projects, Assignments, Badges, Skills, Social Links, Interests, Campus AI Promo Card).
  - Student Academics (`/student/academics`): Academics Header with campus background & semester selector, 6 functional tabs, Academic Overview with circular CGPA gauge & metric cards, Performance Trend responsive SVG line chart, 6 Current Semester Subjects with progress bars & grade badges, Semester Grades table, Results & Grade Card with downloadable cards, Upcoming Exams, Semester Calendar with day picker, Quick Actions, and Campus AI.
  - Student Assignments (`/student/assignments`): 2/3 Main Content + 1/3 Right Sidebar layout, compact campus hero, reactive tabs & counts, live search & subject dropdown, horizontal assignment cards with marks, due dates, urgency badges, tags & 3-dot menus, View Details & submission modal, Upload Assignment modal, Upcoming Deadlines, 81% Submission Stats, August 2025 Calendar, and Quick Actions.
  - Student Notices & Announcements (`/student/notices`): 2/3 Main Content + 1/3 Right Sidebar layout, visible campus hero, Notices vs Announcements tabs, Department and Category dropdowns, live search, 18 realistic notices & announcements, pinned badge, 6-card pagination, Latest Updates, Category chips, Quick Actions, Stay Informed CTA, and complete modal suite.
  - Student Events (`/student/events`): 2/3 Main Content + 1/3 Right Sidebar layout, Events Hero, interactive tabs & category filters, full event grid with registration modals, monthly calendar with day filters, submit event proposal modal, notification preferences modal, and pagination.
  - Student Projects (`/student/projects`): 2/3 Main Content + 1/3 Right Sidebar layout, Projects Hero, category filters & live search, project cards with tech stacks, contributor avatars, like/star engagement counters, Project Details modal with live demo & github links, comments & team members, Create Project modal, Project Stats, Top Projects leaderboard, Collaboration Opportunities, and pagination.
  - Student Internships & Hackathons (`/student/internships`): 2/3 Main Content + 1/3 Right Sidebar layout, Opportunities Hero, reactive type toggle (All, Internships, Hackathons), search & filter drawer, company logos, stipend/mode tags, Opportunity Details modal, Apply / Register modal with resume upload, Submit Opportunity modal, Career Guidance CTA, Quick Action modals, and pagination.
  - Student Lost & Found (`/student/lost-and-found`): 2/3 Main Content + 1/3 Right Sidebar layout, Lost & Found Hero, Lost vs Found status tabs, category chips, search & filter drawer, item cards with status badges and location metadata, Report Lost Item modal, Report Found Item modal, Contact Owner modal with privacy controls, recent items, quick stats, and pagination.
  - Student Campus Feed (`/student/feed`): Social community feed with Feed Hero, Create Post composer with rich media upload and category picker, interactive posts with like/comment/share/bookmark engagement, Join Community modal, Event Register modal, Report Post modal, Trending Topics, People You May Know, and Stay Connected CTA.
  - Student Settings (`/student/settings`) & Faculty Settings (`/faculty/settings`): Profile/Account info card with avatar upload, Appearance card with theme toggle and high contrast options, Notification preferences card, Security & Privacy region card with 2FA and password change modals, Help & Support card with FAQs, ticket submission modal, feedback modal, and clear cache.
  - Campus AI Workspace (`/student/campus-ai` & `/faculty/campus-ai`): Full ChatGPT-style viewport-aware chat workspace (100dvh), compact hero, AI tabs (Chat, Knowledge, Documents, Guidelines, Policies), independently scrollable conversation area, attached sticky composer at the bottom with auto-growing textarea, attachment support, Enter-to-send/Shift+Enter-newline, Stop generating, auto-scroll with floating Jump to Latest button, rich markdown formatting, code blocks with horizontal scroll and Copy Code button, message actions (Copy, Regenerate, Thumbs feedback), verified source badges (MongoDB, RAG, General AI), guardrail states, empty-state with integrated quick prompts, and 1/3 independently scrollable right sidebar.
- **Next High-Priority Target**: Faculty Experience workspace & management modules (Assigned Classes, Attendance Management, Grading, Timetable).

---

# PHASE 1 — UI / FRONTEND

**Goal**: Build the complete College OS frontend and establish the final user experience before connecting real backend data.

### 1. Project UI Foundation

- [x] Inspect existing frontend structure.
- [x] Verify the existing Next.js App Router structure.
- [x] Follow the project's JavaScript/JSX requirement.
- [x] Follow the existing component architecture defined in `docs/AI_INSTRUCTIONS.md`.
- [x] Maintain the project's page → Assembler → subcomponents architecture.
- [x] Verify Tailwind CSS setup.
- [ ] Verify Framer Motion setup.
  > *Progress: Tailwind CSS v4 and PostCSS verified; Framer Motion library not yet installed.*
- [x] Maintain reusable components instead of duplicating UI.

### 2. Design System

- [x] Finalize College OS light theme.
- [x] Finalize College OS dark theme.
- [x] Implement light/dark theme switching.
- [x] Maintain consistent colors, typography, spacing, borders, shadows, radius, and interaction patterns.
- [x] Ensure the light and dark themes represent the same product and layout.
- [x] Ensure images/assets also have appropriate light and dark versions where required.

### 3. Asset Workflow

For every provided UI reference image:

- [x] Identify all important visual assets used in the reference.
- [x] Generate/create equivalent assets where required.
- [x] Save assets inside the appropriate `public` asset/page directory.
- [x] Keep assets organized page-wise.
- [x] Use the generated assets in the actual UI.
- [x] Ensure light/dark versions are handled correctly when the UI supports theme switching.
- [x] Avoid replacing required visual assets with random placeholders when a proper asset is expected.

### 4. Student Experience

Build and finalize the Student experience.

- [x] Home / Student Dashboard
- [x] Profile
- [x] Academics
- [x] Attendance (Integrated in Academic Overview & Quick Actions navigation)
- [x] Notices
  > *Progress: Full Notices & Announcements dashboard (`/student/notices`) implemented matching reference image with 2/3 + 1/3 top-aligned desktop layout, visible campus hero banner, Notices vs Announcements tabs, Department and Category dropdowns, live search, 18 realistic notices with category icons, metadata & attachments, 6-card pagination with auto-reset, Latest Updates, interactive Categories chips, Quick Actions, Stay Informed CTA, and complete modal suite.*
- [x] Announcements
  > *Progress: Integrated within `/student/notices` via the dedicated Announcements tab, filtering college-wide milestone notices and university addresses.*
- [x] Events
  > *Progress: Full Events portal (`/student/events`) implemented with 2/3 + 1/3 top-aligned desktop layout, Events Hero, interactive tabs & category filters, full event grid with registration modals, monthly calendar with day filters, submit proposal modal, notification preferences modal, and pagination.*
- [x] Internships
  > *Progress: Full Opportunities portal (`/student/internships`) implemented with reactive type toggle (All, Internships, Hackathons), search, filter drawer, company logos, Opportunity Details modal, Apply/Register modal with resume upload, Submit Opportunity modal, Career Guidance CTA, and pagination.*
- [x] Explore Students
  > *Progress: Integrated across Projects contributor cards, Campus Feed community network, and Profile.*
- [x] Student Projects
  > *Progress: Full Projects showroom (`/student/projects`) implemented with category filters, project cards with tech stacks & team avatars, likes/stars engagement, Project Details modal with live demo links, comments & team members, and Create Project modal.*
- [x] Project details
- [x] Likes / project engagement UI
- [x] Lost & Found
  > *Progress: Full Lost & Found portal (`/student/lost-and-found`) implemented with Lost vs Found status tabs, category chips, search drawer, item cards, report modals, and contact owner modal.*
- [x] Campus Feed
  > *Progress: Full Campus Feed (`/student/feed`) implemented with Feed Hero, Create Post composer with media upload, interactive posts with like/comment/share engagement, Join Community modal, Event Register modal, and Trending Topics.*
- [x] Settings
  > *Progress: Full Settings portal (`/student/settings`) with Account info, Appearance, Notifications, Security & Privacy (2FA, Password), Help & Support.*
- [x] Campus AI interface
  > *Progress: Full ChatGPT-style viewport-aware chat workspace (`100dvh`) implemented at `/student/campus-ai` and `/faculty/campus-ai` with compact hero, AI tabs, attached sticky composer, independent scroll, jump to latest, markdown parser, code block copy, response actions, and verified source indicators (MongoDB, RAG, General AI).*

### 5. Faculty Experience

Create a separate Faculty experience.

Do NOT simply reuse the Student Dashboard as the Faculty Dashboard.

- [ ] Faculty dashboard
  > *Progress: Route `/faculty` established with dedicated navigation config, Campus AI (`/faculty/campus-ai`), and Settings (`/faculty/settings`); full management dashboard pending.*
- [ ] Assigned classes
- [ ] Assigned students
- [ ] Attendance management
- [ ] Bulk attendance workflow
- [ ] Assignments management
- [ ] Marks management
- [ ] Notices
- [ ] Announcements
- [ ] Faculty profile
- [ ] Relevant student/project browsing where appropriate
- [ ] Faculty Campus AI interface/access

### 6. HOD / Principal / VP Experience

Keep management interfaces separate from student-style interfaces.

- [ ] HOD dashboard
- [ ] Department-level overview
- [ ] Class management/visibility
- [ ] Faculty/class management workflow
- [ ] Department notices/announcements
- [ ] Principal/VP dashboard
- [ ] College-wide overview
- [ ] College-wide notices/announcements
- [ ] Appropriate management-level controls

### 7. Navigation & Routing

- [x] Verify Student routes.
- [x] Verify Faculty routes.
- [ ] Verify HOD routes.
- [ ] Verify Principal/VP routes.
- [x] Ensure role-specific navigation.
- [x] Ensure users do not see irrelevant role-specific navigation.
- [ ] Ensure direct route access is considered for later backend authorization.

### 8. Responsive UI

- [x] Desktop layout
- [x] Laptop layout
- [x] Tablet layout
- [x] Mobile layout
- [x] Fix overflow issues.
- [x] Avoid unnecessary long scrolling.
- [x] Avoid large empty areas.
- [x] Verify sidebar/navbar behavior.

### Phase 1 Completion

Only mark Phase 1 complete after:

- [x] Major frontend pages are implemented (Student portal 100% complete across all 12 modules).
- [x] Student and Faculty experiences are separated (Distinct layouts, routes, and navConfig).
- [ ] Faculty management modules finalized (Classes, Attendance, Grading, Timetable).
- [ ] HOD/Principal/VP experiences are established.
- [x] Light/dark themes work across all pages.
- [x] Assets are properly organized and used.
- [x] Navigation and routes are working (including 12-font live Google Fonts switcher).
- [x] Major UI issues are resolved (Sticky navbar, attached AI chat composer, responsive cards).
- [ ] The frontend is in a stable state for backend integration.

---

# PHASE 2 — DATABASE

**Goal**: Create the actual College OS data foundation.

MongoDB will be the **application source of truth for structured college data**.

Before creating collections, understand the existing project requirements and avoid unnecessary collections.

### 1. Database Architecture

- [ ] Configure MongoDB connection.
- [ ] Create a reusable database connection.
- [ ] Configure environment variables securely.
- [ ] Never expose database credentials to the frontend.

### 2. Core User System & Institutional Identity (LOCKED v1.1)

Design and lock the relationship between authentication users and their institutional profiles.

**Core Principle**: *"Users do not choose their institutional role. The institution provisions and authorizes the user's role."* No public self-registration with arbitrary role selection.

- [ ] `users` collection:
  - `_id`: ObjectId
  - `institutionId`: ObjectId (Ref -> `collegeProfile._id`)
  - `email`: String (Unique official institutional email)
  - `passwordHash`: String (Bcrypt hashed credential created by user during activation)
  - `role`: String (Enum: `"student"` | `"faculty"` | `"hod"` | `"principal"` | `"vp"` | `"admin"` — assigned by institution, backend-authoritative)
  - `accountStatus`: String (Enum: `"INVITED"` | `"ACTIVE"` | `"SUSPENDED"` | `"GRADUATED"`)
  - `isActivated`: Boolean (True once activation completed)
  - `activatedAt`: Date (Activation timestamp)
  - `lastLoginAt`: Date
  - `createdAt`: Date, `updatedAt`: Date
- [ ] `studentProfiles` collection:
  - **Institution-Controlled Fields (Immutable by student)**: `userId`, `studentId` (Enrollment Number/PRN), `rollNumber`, `fullName`, `officialEmail`, `phone`, `department`, `semester`, `section`, `academicStatus`
  - **Student-Controlled Profile Fields (Customizable)**: `bio`, `skills`, `githubUrl`, `websiteUrl`, `avatarUrl`, `interests`
- [ ] `facultyProfiles` collection:
  - **Institution-Controlled Fields (Immutable by faculty)**: `userId`, `facultyId` (Employee ID), `fullName`, `officialEmail`, `phone`, `department`, `designation`, `assignedClassIds`, `assignedSubjectIds`, `academicStatus`
  - **Faculty-Controlled Profile Fields**: `cabinLocation`, `bio`, `avatarUrl`
- [ ] `collegeProfile` singleton collection:
  - `institutionName`, `institutionCode`, `establishedYear`, `address`, `contactEmail`, `websiteUrl`, `authorizedAdminIds`, `institutionalBio`

### 3. Academic Data

Implement the required structured data models.

- [ ] Courses / subjects
- [ ] Classes / sections
- [ ] Faculty assignments (dynamically binds faculty permissions)
- [ ] Student-class relationships
- [ ] Timetable
- [ ] Attendance
- [ ] Marks / results

### 4. Academic Workflow Data

- [ ] Assignments
- [ ] Assignment submissions if required
- [ ] Notices
- [ ] Announcements
- [ ] Events

### 5. Student Ecosystem

- [ ] Student profiles (separation of official academic identity vs showcase portfolio)
- [ ] GitHub information
- [ ] Personal website
- [ ] Skills
- [ ] Projects
- [ ] Project members (multi-member attribution across profiles)
- [ ] Project likes / engagement

### 6. Other College Features

Implement only features that are part of the finalized College OS scope.

- [ ] Internships
- [ ] Lost & Found
- [ ] Other finalized modules

### 7. Roles & Permissions (LOCKED v1.1)

Define the database-level role model. Roles are **institution-assigned and backend-authoritative**:

- [ ] `student`: Read own academic data, showcase portfolio, explore campus directory, interact via project likes, ask Campus AI (scoped to personal data).
- [ ] `faculty`: Manage assigned classes/subjects only (attendance, marks, assignments, class notices), ask Campus AI (scoped to assigned data).
- [ ] `hod`: Department-level oversight (class assignments, attendance/marks audits, department notices).
- [ ] `principal` / `vp`: Campus-wide institutional visibility, executive announcements, overall audit.
- [ ] `admin`: Pre-provision student/faculty records, manage lifecycle status, institutional configuration.

### Phase 2 Completion

- [ ] MongoDB connection works.
- [ ] Required schemas/models are finalized according to v1.1 locked architecture.
- [ ] Relationships are understood and documented.
- [ ] Role permissions are documented and enforced via backend.
- [ ] Database models are tested.
- [ ] No unnecessary duplicate data structures exist.
- [ ] Environment/security requirements are satisfied.

---

# PHASE 3 — BACKEND APIs

**Goal**: Connect the frontend with real College OS data through secure backend APIs.

Do not put database logic directly into frontend components.

### 1. Backend Foundation

- [ ] Create/verify API architecture.
- [ ] Create reusable database utilities.
- [ ] Configure authentication.
- [ ] Configure authorization.
- [ ] Add request validation.
- [ ] Add appropriate error handling.
- [ ] Add secure response handling.

### 2. Authentication & Institutional Onboarding (LOCKED v1.1)

- [ ] **Student Account Activation API**:
  - Verification Handshake: `Enrollment Number` + `Official College Email / Verified Phone`
  - Generate and verify time-bound OTP
  - Fetch verified institution-controlled student record (Read-Only preview)
  - Student creates password (Bcrypt hashed, cost factor >= 10)
  - Transition status from `INVITED` to `ACTIVE`
- [ ] **Faculty Account Activation API**:
  - Verification Handshake: `Employee ID` + `Official College Email / Verified Phone`
  - OTP dispatch & verification
  - Faculty creates password -> status becomes `ACTIVE`
- [ ] **HOD / Principal / VP Executive Provisioning**:
  - No public self-registration endpoints
  - Provisioned via administrative authority; login through Staff Portal
- [ ] **Secure Login APIs**:
  - Student Login (`/api/auth/student/login`): Enrollment No. / Email + Password
  - Staff Login (`/api/auth/staff/login`): Employee ID / Email + Password (Backend resolves role: Faculty, HOD, Principal, VP)
- [ ] **Session & Credential Security**:
  - JWT tokens stored in HttpOnly, Secure, SameSite cookies
  - Password management (bcrypt hashing, zero plaintext storage, college staff does not maintain passwords)
  - Account lifecycle guard middleware (`INVITED`, `ACTIVE`, `SUSPENDED`, `GRADUATED`)
  - Logout and token revocation

### 3. Student APIs

Implement APIs for:

- [ ] Student profile (edit student-controlled fields only; protect institution-controlled fields)
- [ ] Attendance (read own records only)
- [ ] Marks (read own records only)
- [ ] Timetable (read own class schedule)
- [ ] Assignments (read assigned, submit files)
- [ ] Notices & Announcements (permitted circulars)
- [ ] Events (browse, register)
- [ ] Internships
- [ ] Projects (create, update own, showcase)
- [ ] Explore Students & Peer Projects
- [ ] Project Likes

### 4. Faculty APIs

Implement APIs for:

- [ ] Faculty profile
- [ ] Assigned classes (dynamically scoped)
- [ ] Assigned students in teaching batches
- [ ] Attendance marking (assigned classes only)
- [ ] Bulk attendance workflow
- [ ] Assignments creation and grading
- [ ] Marks entry and verification
- [ ] Class and departmental notices

### 5. HOD APIs

- [ ] Department-level academic data
- [ ] Faculty/class assignment audits
- [ ] Department notices & bulletins
- [ ] Department-level performance overview

### 6. Principal / VP APIs

- [ ] College-level overview
- [ ] College-wide notices & executive announcements
- [ ] Cross-department management metrics

### 7. Authorization & RBAC Guardrails (LOCKED v1.1)

A logged-in user must not automatically have access to all College OS data. Implement strict backend-authoritative role and ownership checks:

- Student: `Student → own allowed data` (Cannot read peers' marks/attendance)
- Faculty: `Faculty → dynamically bounded to assigned classes/subjects` (Zero access to unassigned batches)
- HOD: `HOD → department-level allowed data`
- Principal/VP: `Principal/VP → college-level allowed data`

- [ ] Authorization middleware/utilities (`requireRole`, `requireAssignmentScope`)
- [ ] Ownership checks on update/delete endpoints
- [ ] Backend database role check (Never trust role sent from client payload)
- [ ] Prevent unauthorized student data exposure
- [ ] Prevent unauthorized faculty data access
- [ ] Exclude sensitive credentials, OTPs, and password hashes from all responses and Campus AI context

### 8. Frontend Integration

Replace important frontend mock/static data with real APIs.

- [ ] Student frontend connected
- [ ] Faculty frontend connected
- [ ] HOD frontend connected
- [ ] Principal/VP frontend connected
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success feedback

### Phase 3 Completion

- [ ] Core APIs are working.
- [ ] Institutional onboarding & activation flows work.
- [ ] Authentication works (Student Portal & Staff Portal).
- [ ] Authorization works (dynamically bounded RBAC).
- [ ] Frontend receives real data.
- [ ] Role-specific data access works.
- [ ] API errors are handled properly.
- [ ] No sensitive secrets or credentials are exposed.

---

# PHASE 4 — CAMPUS AI

**Goal**: Build the College OS **Campus AI**.

Campus AI is college-specific. MongoDB is the source of truth for structured application data. College documents/policies/guidelines can be accessed through RAG/vector retrieval. Do NOT build a generic chatbot that invents college information.

---

## 4.1 AI Model Connection

- [ ] Select the LLM/API provider.
- [ ] Create the server-side AI client.
- [ ] Store AI API credentials in environment variables.
- [ ] Never expose AI API keys to the frontend.
- [ ] Create a reusable AI service.

Example architecture: `Frontend → /api/ai/chat → AI Service`

---

## 4.2 Campus AI API

Create the Campus AI endpoint (`/api/ai/chat`).

Flow: `User message` → `Authentication` → `Role/permission check` → `Query understanding` → `Data retrieval` → `LLM` → `Response`

- [ ] Create AI chat API.
- [ ] Authenticate the user.
- [ ] Identify user role.
- [ ] Validate the request.
- [ ] Retrieve allowed information.
- [ ] Send only necessary context to the model.
- [ ] Return the final response.

---

## 4.3 MongoDB Retrieval

Structured queries should use direct MongoDB retrieval.

- [ ] Create MongoDB retrieval utilities.
- [ ] Implement student-specific retrieval.
- [ ] Implement faculty-specific retrieval.
- [ ] Implement HOD retrieval.
- [ ] Implement Principal/VP retrieval.
- [ ] Enforce role/ownership permissions.
- [ ] Never expose unauthorized data to AI.

---

## 4.4 RAG / College Documents

Use RAG for college-specific unstructured information (College policies, attendance rules, examination rules, academic guidelines, student handbook, etc.).

Pipeline: `Document` → `Text extraction` → `Chunks` → `Embeddings` → `Vector database` → `Relevant chunks` → `LLM`

- [ ] Select embedding model.
- [ ] Select vector database/storage approach.
- [ ] Create document ingestion process.
- [ ] Chunk documents.
- [ ] Generate embeddings.
- [ ] Store embeddings.
- [ ] Create retrieval function.
- [ ] Retrieve relevant documents.
- [ ] Include source/context where appropriate.

---

## 4.5 MongoDB + RAG Combined Queries

Some questions require both structured data and documents.

Example: *"My attendance is 68%. According to college rules, am I eligible for the exam?"*

- [ ] Detect combined queries.
- [ ] Retrieve MongoDB data.
- [ ] Retrieve relevant RAG context.
- [ ] Combine the contexts safely.
- [ ] Generate an answer based on the retrieved information.

---

## 4.6 College Information Boundary

If a user asks for college-specific information, answer using available authorized College OS data/documents. If unavailable, return an appropriate unavailable-information response (*"I couldn't find this information in the available college data or documents."*). Do NOT invent college policies.

- [ ] Implement unavailable-information handling.
- [ ] Prevent hallucinated college policies.
- [ ] Prevent fabricated college data.
- [ ] Distinguish retrieved facts from general knowledge.

---

## 4.7 General AI Questions

Genuinely general questions (e.g., *"Explain recursion in JavaScript"*) can use general AI knowledge.

- [ ] Define when general AI knowledge is allowed.
- [ ] Do not use general knowledge as a substitute for missing college information.
- [ ] Keep college-specific questions tied to College OS sources.

---

## 4.8 Privacy & Security

Never provide the AI with passwords, secrets, API keys, database credentials, or unauthorized private information.

- [ ] Implement context filtering.
- [ ] Implement role-based access control.
- [ ] Implement ownership checks.
- [ ] Remove sensitive fields before AI context.
- [ ] Review prompts for data leakage.
- [ ] Test unauthorized access scenarios.

---

## 4.9 Campus AI UI

Connect the existing AI frontend with the real backend.

- [x] Chat interface (Full ChatGPT-style workspace)
- [x] Message history UI (Reactive conversation thread with roles & timestamps)
- [x] Loading state (Subtle typing indicator with bouncing dots and Stop button)
- [x] Error state (Error guardrail with retry button)
- [x] Empty state (Greeting card with topic chips and integrated Quick Prompts)
- [ ] Streaming response if appropriate
- [x] Suggested questions (Sample questions sidebar + topic chips + quick prompts)
- [x] Source/reference display where appropriate (MongoDB, RAG, Hybrid, General AI)
- [x] Mobile responsive UI (100dvh viewport-aware, safe-area inset, attached composer)
- [x] Light/dark theme support

---

## 4.10 Campus AI Testing

### Student
- [ ] Ask own attendance.
- [ ] Ask own marks.
- [ ] Ask assignments.
- [ ] Ask timetable.
- [ ] Ask college policy.
- [ ] Ask a question requiring MongoDB + RAG.
- [ ] Attempt to access another student's private information.
- [ ] Ask for unavailable college information.
- [ ] Ask a general non-college question.

### Faculty
- [ ] Ask assigned-class information.
- [ ] Ask relevant student/class information.
- [ ] Test unauthorized student/class access.

### HOD
- [ ] Test department-level queries.
- [ ] Test access outside department.

### Principal/VP
- [ ] Test college-level queries.
- [ ] Test restricted/private information.

### Security
- [ ] Test prompt injection attempts.
- [ ] Test unauthorized data requests.
- [ ] Test sensitive information leakage.
- [ ] Test hallucinated college information.
- [ ] Test missing-document scenarios.

---

# FINAL PROJECT VERIFICATION

After all four phases:

- [ ] Frontend complete
- [ ] Database complete
- [ ] Backend APIs complete
- [ ] Authentication complete
- [ ] Authorization complete
- [ ] Campus AI connected
- [ ] MongoDB retrieval working
- [ ] RAG working
- [ ] Combined MongoDB + RAG queries working
- [ ] College information boundary enforced
- [ ] Privacy/security checks completed
- [ ] Student experience tested
- [ ] Faculty experience tested
- [ ] HOD experience tested
- [ ] Principal/VP experience tested
- [ ] Light theme tested
- [ ] Dark theme tested
- [ ] Responsive UI tested
- [ ] Production build tested
- [ ] Deployment readiness checked

---

# IMPORTANT WORKING RULES

1. **This roadmap is a living document**: Whenever work is completed, update the checkbox immediately.
2. **Never fake completion**: Do not mark `[x]` simply because code exists. Mark it complete only after the feature has actually been implemented and verified.
3. **If a task is partially complete**: Keep it `[ ]` and optionally add a short progress note below it.
4. **If the architecture changes**: Update this roadmap so it remains the current source of truth.
5. **Do not create unnecessary features**: Follow the finalized College OS scope.
6. **Do not replace existing working functionality without a reason**: First inspect what already exists.
7. **Do not make destructive changes**: Clearly identify any required breaking modifications first.
8. **Before implementing a major feature**: Inspect the existing code and relevant documentation.
9. **Keep the project production-oriented**: Avoid fake/demo architecture where the real architecture can reasonably be implemented.
10. **Security is part of implementation, not a final afterthought**: Authentication, authorization, ownership checks, API security, and AI data privacy must be considered while implementing each phase.
