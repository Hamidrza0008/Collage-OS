# COLLEGE OS — DEVELOPMENT ROADMAP & WORKING CHECKLIST

> **Living Document**: This roadmap tracks the real, verified implementation status of the College OS project across all four development phases. Checkboxes are updated strictly when features are fully built, styled, and verified.

---

## Current Status

- **Active Phase**: **Phase 1 — UI / Frontend** (In Progress)
- **Completed Milestones**:
  - Global Application Shell (Responsive Desktop Sidebar with Campus Artwork & Mobile Drawer, Sticky Navbar with Search & Theme Toggle, Role-based Nav Config).
  - Design System Tokens (Light and Dark theme variables, emerald & mint aesthetic, custom scrollbars, typography).
  - Page-wise Asset Architecture (`public/assets/layout/`, `public/assets/dashboard/`, `public/assets/profile/` with Light/Dark variants).
  - Student Dashboard (`/student`) with Welcome Hero, Quick Stats, Timetable, Assignments, Attendance, Notices, Events, and Campus AI Quick Ask.
  - Student "My Profile" (`/student/profile`) with 2-column layout matching Image 2 reference (Profile Hero, Profile Completion gauge, Tabs, About Me, Quick Info, Stats, Assignments, Activity, Badges, Skills, Social Links, Interests, and Campus AI Promo Card).
- **Next High-Priority Target**: Student Academics Page (`/student/academics`) based on `Project Plan/Frontend UI/img 3.png`.

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
- [ ] Academics
- [ ] Attendance
- [ ] Marks / Results
- [ ] Assignments
- [ ] Notices
- [ ] Announcements
- [ ] Events
- [ ] Internships
- [ ] Explore Students
- [ ] Student Projects
- [ ] Project details
- [ ] Likes / project engagement UI
- [ ] Lost & Found if included in the finalized scope
- [ ] Campus AI interface
  > *Progress: Quick AI interactive widget implemented on Dashboard; dedicated `/student/campus-ai` full chat view pending.*

### 5. Faculty Experience

Create a separate Faculty experience.

Do NOT simply reuse the Student Dashboard as the Faculty Dashboard.

- [ ] Faculty dashboard
  > *Progress: Layout and route `/faculty` established with dedicated navigation config; workspace dashboard pending.*
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

- [ ] Major frontend pages are implemented.
- [ ] Student and Faculty experiences are separated.
- [ ] HOD/Principal/VP experiences are established.
- [x] Light/dark themes work.
- [x] Assets are properly organized and used.
- [x] Navigation and routes are working.
- [x] Major UI issues are resolved.
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

### 2. Core User System

Design the relationship between authentication users and their role-specific profiles.

Possible structure:

- [ ] users
- [ ] studentProfiles
- [ ] facultyProfiles

Do not blindly create these collections if the existing architecture suggests a better structure. First evaluate the requirements and document the final decision.

### 3. Academic Data

Implement the required structured data models.

- [ ] Courses / subjects
- [ ] Classes / sections
- [ ] Faculty assignments
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

- [ ] Student profiles
- [ ] GitHub information
- [ ] Personal website
- [ ] Skills
- [ ] Projects
- [ ] Project members
- [ ] Project likes / engagement

*Important*: A project may contain one or multiple student members. If multiple students are members of the same project, the project must appear appropriately on every member's profile.

### 6. Other College Features

Implement only features that are part of the finalized College OS scope.

- [ ] Internships
- [ ] Lost & Found
- [ ] Other finalized modules

### 7. Roles & Permissions

Define the database-level role model.

Roles should support the finalized College OS structure:

- [ ] Student
- [ ] Faculty
- [ ] HOD
- [ ] Principal/VP

Document what each role is allowed to access.

### Phase 2 Completion

- [ ] MongoDB connection works.
- [ ] Required schemas/models are finalized.
- [ ] Relationships are understood and documented.
- [ ] Role permissions are documented.
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

### 2. Authentication

- [ ] Login
- [ ] Logout
- [ ] Session/token handling
- [ ] Password security if password authentication is used
- [ ] Role identification
- [ ] Protected routes
- [ ] Protected API endpoints

### 3. Student APIs

Implement APIs for:

- [ ] Student profile
- [ ] Attendance
- [ ] Marks
- [ ] Timetable
- [ ] Assignments
- [ ] Notices
- [ ] Announcements
- [ ] Events
- [ ] Internships
- [ ] Projects
- [ ] Explore Students
- [ ] Likes

### 4. Faculty APIs

Implement APIs for:

- [ ] Faculty profile
- [ ] Assigned classes
- [ ] Assigned students
- [ ] Attendance
- [ ] Bulk attendance workflow
- [ ] Assignments
- [ ] Marks
- [ ] Notices
- [ ] Announcements

### 5. HOD APIs

- [ ] Department-level data
- [ ] Faculty/class management where applicable
- [ ] Department notices
- [ ] Department announcements
- [ ] Department-level academic information

### 6. Principal / VP APIs

- [ ] College-level overview
- [ ] College-wide notices
- [ ] College-wide announcements
- [ ] Relevant management information

### 7. Authorization

This is extremely important. A logged-in user must not automatically have access to all College OS data. Implement role and ownership checks:

- Student: `Student → own allowed data`
- Faculty: `Faculty → assigned classes/students`
- HOD: `HOD → department-level allowed data`
- Principal/VP: `Principal/VP → college-level allowed data`

- [ ] Authorization middleware/utilities
- [ ] Ownership checks
- [ ] Role checks
- [ ] Prevent unauthorized student data access
- [ ] Prevent unauthorized faculty data access
- [ ] Prevent unauthorized management access

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
- [ ] Authentication works.
- [ ] Authorization works.
- [ ] Frontend receives real data.
- [ ] Role-specific data access works.
- [ ] API errors are handled properly.
- [ ] No sensitive secrets are exposed.

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

- [ ] Chat interface
- [ ] Message history UI
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Streaming response if appropriate
- [ ] Suggested questions
- [ ] Source/reference display where appropriate
- [ ] Mobile responsive UI
- [ ] Light/dark theme support

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
