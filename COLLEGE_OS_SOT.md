# College OS — Source of Truth

> **Authoritative Architectural Baseline & Engineering Governance Specification**  
> *Final-Year Major Project | Academic Year 2025 – 2026 | Department of Computer Science & Engineering | CSMU*

---

## 1. Document Status

- **Document Name**: College OS — Source of Truth (SOT)
- **Document Version**: **1.1**
- **Status**: **LOCKED — SOURCE OF TRUTH (FOUNDATION UPDATED: AUTHENTICATION & INSTITUTIONAL ONBOARDING LOCKED)**
- **Last Updated**: October 2026
- **Authority**: Authoritative engineering specification governing all backend services, MongoDB database schemas, Next.js frontend interfaces, API endpoints, role-based authorization guards, and Campus AI retrieval pipelines.
- **Governing Policy**: Core First &rarr; Stabilize &rarr; Expand. All implementations must comply strictly with this document.

---

## 2. Core Vision

**College OS** is engineered as a **centralized digital campus platform** that unifies academic management, institutional communication, student professional identity, peer discovery, and context-aware intelligence into a single modern platform.

> *"One connected digital campus for academics, institutional information, student identity, interaction and intelligent information access."*

Crucially, College OS is **not intended to be just another administrative ERP**. While traditional legacy systems (e.g., MyCamu) treat students strictly as administrative rows in an institutional database, College OS builds a holistic digital environment where:
- Students monitor real-time academics (attendance percentages, timetables, marks, assignments).
- Students build and maintain a verified, professional campus portfolio.
- Students showcase technical projects and discover peer collaborators.
- Faculty members manage assigned classes and academic grading within strictly bounded permissions.
- The institution maintains an authentic, official campus broadcast station.
- Students interact with campus resources via an AI-powered, context-grounded Campus Assistant.

---

## 3. Problem Statement & Campus Fragmentation

Higher education institutions suffer from severe digital fragmentation across uncoordinated channels:

| Channel / Medium | Information Handled | Critical Failure Point |
| :--- | :--- | :--- |
| **Legacy College ERP (e.g. MyCamu)** | Attendance percentages, fee status, exam records | Clunky UX, rigid tables, zero student portfolio identity, zero collaboration tools |
| **WhatsApp Class Groups** | Assignments, timetable revisions, unofficial notices | Unsearchable, spam-heavy, unverified circulars, zero audit trail or data persistence |
| **Physical Notice Boards / PDFs** | Circulars, exam dates, schedules | Easily missed, static, outdated quickly, zero notification mechanics |
| **Faculty Direct Messages** | Homework submissions, syllabus doubts | Scattered across personal chat accounts with zero institutional tracking |
| **External Portals (LinkedIn/GitHub)** | Projects, developer skills, resumes | Disconnected from college peer networks and campus team formation |

### Core Gaps Resolved
1. **Academic Fragmentation**: No unified daily dashboard answering: *"Where is my next class? What assignment is due? What is my current attendance buffer?"*
2. **Student Identity Deficit**: Students are treated solely as administrative roll numbers rather than budding engineers, creators, and developers.
3. **Institutional Noise**: Crucial university notifications get buried under classroom chat spam.
4. **Information Asymmetry**: Students lack natural-language access to complex academic bylaws and regulations.

---

## 4. Core MVP Scope (The 11 Foundational Modules)

The Phase 1 Core MVP consists strictly of **11 interconnected modules**:

1. **Authentication, Institutional Identity & RBAC**: Institution-controlled user provisioning, student multi-factor activation, faculty onboarding, executive provisioning, secure login, bcrypt hashing, JWT session lifecycle, and backend RBAC authorization.
2. **Student Profile**: Professional campus portfolio featuring verified academic credentials, bio, tech skills, GitHub repository links, personal website, and badges.
3. **Student Projects**: Project showroom with title, markdown overview, tech stack tags, live URLs, repository links, and media previews.
4. **Explore Directory**: Searchable directory enabling students and faculty to discover peers and inspect projects, complete with a project liking system.
5. **Timetable Management**: Personalized daily schedule for students and faculty-specific teaching timetables mapped strictly to assigned subjects.
6. **Attendance Tracking**: Real-time attendance percentage visualization and shortage alerts for students; dynamic roll-call attendance marking for authorized faculty.
7. **Marks & Performance**: Semester grade sheets, internal assessment breakdowns, and SGPA/CGPA dials for students; secure grade entry workflows for faculty.
8. **Assignments Workflow**: Centralized hub for assignment publication, deadlines, and submissions for students; creation and grading for faculty.
9. **Notices & Bulletins**: Official institutional broadcast hub with department/category filtering, priority flags, and attachment downloads.
10. **Campus Events**: University-wide event directory for symposiums, workshops, and hackathons with registration modals and calendars.
11. **Campus AI Assistant**: Context-grounded natural language intelligence engine answering queries against operational MongoDB data and RAG institutional documents.

---

## 5. User & Institutional Model

College OS defines five distinct institutional actors and one singleton institutional entity:

```
                      COLLEGE / UNIVERSITY (Entity)
                                │
                      Official Presence
                                │
                    Institutional Authority
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
   Principal / VP              HOD                  Faculty
(Campus-Wide Scope)   (Department Scope)      (Class-Level Scope)
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                             Student
                      (Personal Data Scope)
```

### Roles Defined
- **Student**: Primary academic beneficiary; restricted strictly to own academic records and permitted public directory data.
- **Faculty**: Academic manager; permissions bounded dynamically to assigned classes, sections, and subjects.
- **HOD (Head of Department)**: Academic supervisor; authorized across all classes, faculty, and students within their department.
- **Principal / VP / Dean**: Executive administrator; authorized for campus-wide auditing, cross-department analytics, and official announcements.
- **Admin**: Technical system operator; authorized for user record pre-provisioning, lifecycle status management, and institutional settings.
- **College Entity**: Singleton profile representing the institution itself (branding, accreditation, address, official circulars).

---

## 6. Authentication & Institutional Identity (LOCKED v1.1)

### 6.0 Core Principle

> **"Users do not choose their institutional role. The institution provisions and authorizes the user's role."**

College OS is an **institution-controlled campus platform**. It strictly rejects public registration where arbitrary visitors can select "Student", "Faculty", "HOD", or "Principal" to create an account. A user's institutional identity and role must pre-exist within official college records.

```
       [ Institution Record Pre-Exists ]
                     ↓
       [ User Activates Identity via OTP ]
                     ↓
       [ User Creates Private Password ]
                     ↓
             [ Account ACTIVE ]
                     ↓
 [ Backend Enforces Authoritative Role & RBAC ]
```

---

### 6.1 Institution Provisioning

Before any user can access College OS, their official record must be created or imported into the database by college administration:
- **Student Records**: Bulk imported from college administrative admissions data.
- **Faculty Records**: Provisioned by administration with official employee IDs, departments, and course assignments.
- **Administrative Records (HOD, Principal, VP)**: Provisioned by institutional executive authority.
- **Initial Account State**: Every newly provisioned record has `accountStatus = "INVITED"`, `isActivated = false`, and `passwordHash = null`.

---

### 6.2 Student Activation Workflow

A student cannot self-invent their name, enrollment number, branch, semester, or section. They activate their pre-provisioned institutional record through the following locked flow:

```
College creates/imports student record
        ↓
Student record exists in College OS (accountStatus = INVITED)
        ↓
College informs student to activate College OS account
        ↓
Student opens College OS Portal
        ↓
Student selects "Activate Student Account"
        ↓
Student enters: Enrollment Number + Official College Email / Verified Contact
        ↓
System verifies institutional record match
        ↓
System dispatches secure, time-bound OTP
        ↓
Student enters and verifies OTP
        ↓
Identity Verified: System displays verified student information (Read-Only)
        ↓
Student creates own private password
        ↓
Password hashed via bcrypt (cost factor >= 10)
        ↓
accountStatus transitions to ACTIVE (isActivated = true, activatedAt = Date.now())
        ↓
Student logs in via Student Login
        ↓
Student Dashboard
```

#### Student Account Security Rule
**Enrollment Number alone is strictly INSUFFICIENT for activation.** Because enrollment numbers may be known to peers, activation requires a multi-factor handshake:
$$\text{Enrollment Number} + \text{Official College Email / Verified Phone} + \text{Time-bound OTP}$$
This prevents unauthorized identity hijacking.

---

### 6.3 Faculty Activation Workflow

Faculty onboarding follows the identical institutional principle:
1. College administration provisions the faculty record with: *Employee ID / Faculty ID, Full Name, Official College Email, Phone, Department, Designation, and Assigned Classes & Subjects*.
2. Faculty member accesses the portal and chooses **"Activate Staff Account"**.
3. Faculty enters: `Employee ID` + `Official College Email / Verified Contact`.
4. System verifies the institutional record and sends an OTP.
5. Faculty verifies the OTP and sets their own secure password.
6. The account becomes `ACTIVE`, and the user's role is permanently anchored to the institutional record.

---

### 6.4 HOD Activation & Provisioning

- Head of Department accounts are **institutionally provisioned only**.
- There is **NO public self-registration** for HODs.
- HOD accounts are created by college administration and linked to the specific department.
- HODs activate their accounts via official verification or secure administrative onboarding, setting their own password.
- HODs log in through the unified **Staff Login** portal.

---

### 6.5 Principal / VP / Executive Provisioning

- Principal, Vice Principal, and Dean accounts are **institutionally provisioned only**.
- There is **NO public self-registration** for executive roles.
- University governance provisions these accounts with campus-wide administrative authority.
- Users authenticate via the unified **Staff Login** portal.
- Under no circumstances can a user self-elevate to an executive role through frontend forms.

---

### 6.6 Login Architecture

The public authentication UI strictly eliminates role-selection dropdowns during authentication. It provides two clean, distinct paths:

```
COLLEGE OS AUTHENTICATION PORTAL
    ├── 1. Student Portal
    │     ├── Student Login (Enrollment Number / Email + Password)
    │     └── Activate Student Account (Identity Verification + OTP + Password Setup)
    │
    └── 2. Faculty & College Staff Portal
          ├── Staff Login (Employee ID / Email + Password)
          └── Activate Staff Account (Employee Verification + OTP + Password Setup)
```

**Backend Role Resolution**: When logging in via the Staff Portal, the backend inspects the authenticated record in the `users` collection to determine whether the user is `faculty`, `hod`, `principal`, or `admin`, redirecting them to their respective authorized workspace.

---

### 6.7 Password Ownership & Privacy

- **The college does NOT provide or maintain permanent user passwords.**
- Students and faculty create their own passwords upon completing identity verification.
- Passwords are encrypted using `bcrypt` (salt rounds $\ge 10$) before persistence.
- College administrators and staff have **zero access** to plaintext passwords.
- Self-service password reset is available via verified email/phone OTP handshakes.

---

### 6.8 Account Lifecycle State Machine

Every user account in College OS adheres to four locked lifecycle states:

```
┌────────────────────────┐
│ INVITED / NOT_ACTIVATED│  Pre-provisioned record created by college; cannot authenticate.
└───────────┬────────────┘
            │  Successful OTP verification + password creation
            ▼
┌────────────────────────┐
│         ACTIVE         │  Full role-permitted access to dashboard, academics, AI, and profile.
└───────────┬────────────┘
            │
      ┌─────┴──────────────────┐
      ▼                        ▼
┌───────────┐            ┌────────────────────┐
│ SUSPENDED │            │ GRADUATED/INACTIVE │
└───────────┘            └────────────────────┘
Administrative hold;     Student graduated or faculty offboarded;
Tokens revoked;          Read-only archive access; write permissions revoked.
Logins blocked.
```

---

## 7. Role & RBAC Model

Role-Based Access Control (RBAC) answers: *"What are you allowed to do?"*  
Role assignment is **never user-selectable**; it is determined by institutional authority in the database.

### Role Hierarchy & Scope Boundaries

| Role Identifier | Assignment Source | Dynamic Access Scope |
| :--- | :--- | :--- |
| `student` | Institutional Admissions Import | Strictly own academic data (attendance, marks, submissions) + public campus directories |
| `faculty` | Administration Course Allocation | Dynamically bounded to assigned classes, sections, and subjects |
| `hod` | Executive Department Appointment | Department-wide scope (all departmental classes, faculty, students, notices) |
| `principal` / `vp` | University Governance | Institution-wide scope (all departments, academic audits, campus-wide circulars) |
| `admin` | IT Administration Authority | System configuration, bulk student/faculty provisioning, account lifecycle controls |

---

## 8. Institution-Controlled vs. User-Controlled Data

To preserve institutional integrity while fostering student self-expression, data fields are categorized into two strict tiers:

```
┌────────────────────────────────────────────────────────┐
│             COLLEGE OS STUDENT RECORD                  │
├──────────────────────────┬─────────────────────────────┤
│  INSTITUTION-CONTROLLED  │   USER-CONTROLLED PROFILE   │
│       (Read-Only)        │       (Customizable)        │
├──────────────────────────┼─────────────────────────────┤
│ • Full Name              │ • Profile Avatar / Photo    │
│ • Enrollment Number / PRN│ • Bio / About Statement     │
│ • Roll Number            │ • Technical Skills Tags     │
│ • Official College Email │ • GitHub Profile Link       │
│ • Verified Phone Number  │ • Personal Portfolio URL    │
│ • Department / Branch    │ • Project Showcase Items    │
│ • Current Semester       │ • Peer Interests            │
│ • Section Designation    │                             │
│ • Academic Standing      │                             │
│ • Institutional Role     │                             │
└──────────────────────────┴─────────────────────────────┘
```

- **Mutation Rule for Institution-Controlled Data**: Immutable by the student or faculty member. Can only be corrected by administrative personnel through verified college records.
- **Mutation Rule for User-Controlled Data**: Directly editable by the authenticated user through their profile settings.

---

## 9. Student Profile Architecture

A student's profile inside College OS combines verified institutional standing with personal developer achievements:
- **Profile Header**: Official full name, student ID / enrollment number, department, semester, verified status badge, avatar.
- **Academic Snapshot**: CGPA gauge, overall attendance percentage standing, active credits.
- **Portfolio Showcase**: About Me statement, technical skills chips, GitHub link, personal website URL, social handles.
- **Projects Gallery**: Cards showcasing technical projects with repository links, live demos, contributor attribution, and like counters.
- **Badges & Accomplishments**: Verifiable badges (e.g., Consistent Attendance, Project Builder, Hackathon Participant).

---

## 10. Faculty Architecture

Faculty accounts are designed for academic management within strictly bounded parameters:
- **Profile Data**: Official employee ID, full name, official email, department, designation, cabin location, bio.
- **Dynamically Scoped Teaching Schedule**: Bounded strictly to `assignedClassIds` and `assignedSubjectIds`.
- **Academic Management Capabilities**:
  - Roll-call attendance marking for assigned batches.
  - Grade and assessment score entry for assigned courses.
  - Assignment authoring, deadline management, and submission evaluation.
  - Departmental and class-specific notice publication.
- **Zero Lateral Access**: A faculty member teaching CSE-7A cannot view or modify grades/attendance for CSE-7B or Mechanical Engineering courses.

---

## 11. Academic Modules

### 11.1 Timetable Management
- Students see their active section timetable.
- Faculty see their personal daily lecture schedule derived from assigned class slots.

### 11.2 Attendance Tracking
- Students monitor real-time attendance percentages per subject with color-coded safety thresholds ($\ge 75\%$).
- Faculty mark daily attendance via a rapid roll-call checklist.

### 11.3 Marks & Academic Performance
- Students inspect semester GPA, internal test marks, assignment scores, and downloadable grade cards.
- Faculty input marks for mid-terms, practicals, and internal assessments.

### 11.4 Assignments Lifecycle
- Faculty create assignments with rubrics, file attachments, and deadlines.
- Students upload submissions, track pending deadlines, and view instructor feedback.

---

## 12. Notices & Institutional Communication

- **Multi-Level Broadcast Architecture**:
  - `college`: Official campus-wide notices (published only by authorized administrative personnel).
  - `hod`: Departmental bulletins (published by HODs).
  - `faculty`: Class-level notices (published by faculty for their assigned classes).
- **Attributes**: Title, markdown content, priority flag (`urgent` vs `normal`), target audience, attachments, timestamp.

---

## 13. Campus Events

- Directory of hackathons, technical symposiums, workshops, and guest lectures.
- Managed by authorized faculty, departmental heads, and administrative staff.
- Includes event metadata, venue, date/time, banner artwork, and direct registration links.

---

## 14. Student Projects & Explore Directory

- **Showcase**: Students can publish technical projects featuring title, markdown description, tech stack tags, live demo links, repository URLs, and screenshot carousels.
- **Multi-Member Attribution**: Projects can link multiple student contributors; the project appears on each collaborator's profile.
- **Explore Directory**: Filterable directory enabling students and faculty to explore peers by skills, branch, or semester.
- **Project Likes**: Interactive engagement mechanism allowing authenticated campus users to star/like student projects.

---

## 15. Campus AI & RAG Architecture

The Campus AI Assistant is **not a generic, open-ended chatbot**. It is an institutionally bounded, context-grounded intelligence layer.

### 15.1 Authorization & Context Pipeline

```
[ User Submits Prompt ]
          ↓
[ Authenticated JWT Session Validation ]
          ↓
[ Resolve Authoritative Backend Role ]
          ↓
[ Enforce Strict RBAC Query Bounds ]
          ↓
┌───────────────────────────────────────────────┐
│     Context Assembly (Least Privilege)        │
│  ├── Student: Personal attendance/marks only  │
│  ├── Faculty: Assigned classes data only      │
│  └── Admin: Campus-wide overview data         │
└───────────────────────────────────────────────┘
          ↓
[ Intelligent Router: MongoDB vs. Vector RAG ]
          ↓
[ Grounded LLM Synthesis ]
          ↓
[ Verified Campus Response (Zero Hallucination) ]
```

### 15.2 Dual Source of Truth
1. **MongoDB Operational Store**: The single source of truth for **structured transactional data** (attendance records, timetable slots, marks, active assignments).
2. **Atlas Vector Search / RAG Pipeline**: The source of truth for **unstructured college documentation** (examination ordinances, academic handbooks, hostel guidelines, syllabus outlines).

### 15.3 Anti-Hallucination & Security Rules
- **Backend Role is Authoritative**: AI prompt assembly strictly reads the database-verified role; client-supplied role claims are rejected.
- **Zero Hallucination Mandate**: If official college records or RAG handbooks do not contain the answer, the assistant responds: *"This information is currently unavailable in official college records"* rather than speculating.
- **Strict Credential Exclusion**: Passwords, bcrypt hashes, OTPs, session secrets, and database connection strings are permanently excluded from LLM context prompts.
- **Privacy Isolation**: Students cannot query private records belonging to other students or faculty members.

---

## 16. MongoDB Data Model

The database architecture utilizes **MongoDB Atlas** as the primary operational store with Mongoose ODM:

### 16.1 Collection: `users`
Represents the core authenticated account across all roles:
```javascript
{
  _id: ObjectId,
  institutionId: ObjectId,       // References collegeProfile._id
  email: String,                 // Unique official institutional email (indexed)
  passwordHash: String,          // Bcrypt hashed credential (user-owned)
  role: String,                  // "student" | "faculty" | "hod" | "principal" | "vp" | "admin"
  accountStatus: String,         // "INVITED" | "ACTIVE" | "SUSPENDED" | "GRADUATED"
  isActivated: Boolean,          // True once OTP verification + password creation complete
  activatedAt: Date,             // Timestamp of successful activation
  lastLoginAt: Date,             // Last authenticated session
  createdAt: Date,
  updatedAt: Date
}
```

### 16.2 Collection: `studentProfiles`
Represents student academic records and professional showcase:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,              // Unique reference -> users._id
  // --- INSTITUTION-CONTROLLED FIELDS (Immutable by Student) ---
  studentId: String,             // Enrollment Number / University PRN (indexed, unique)
  rollNumber: String,            // Class Roll Number (where applicable)
  fullName: String,              // Official name from institutional record
  officialEmail: String,         // Institutional email
  phone: String,                 // Verified contact number
  department: String,            // e.g., "CSE"
  semester: Number,              // e.g., 7
  section: String,               // e.g., "A"
  academicStatus: String,        // "REGULAR" | "PROBATION" | "GRADUATED"
  // --- STUDENT-CONTROLLED PROFILE FIELDS (Customizable) ---
  bio: String,                   // Student personal overview
  skills: [String],              // Technical skill tags (e.g., ["React", "MongoDB", "Node.js"])
  githubUrl: String,             // GitHub profile link
  websiteUrl: String,            // Personal website or portfolio URL
  avatarUrl: String,             // Profile image path
  interests: [String],           // Approved interest tags
  createdAt: Date,
  updatedAt: Date
}
```

### 16.3 Collection: `facultyProfiles`
Represents faculty teaching profiles and dynamic class assignments:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,              // Unique reference -> users._id
  // --- INSTITUTION-CONTROLLED FIELDS (Immutable by Faculty) ---
  facultyId: String,             // Official Employee ID (indexed, unique)
  fullName: String,              // Official full name
  officialEmail: String,         // Institutional email
  phone: String,                 // Contact phone number
  department: String,            // e.g., "CSE"
  designation: String,           // "Assistant Professor" | "Associate Professor" | "Professor"
  assignedClassIds: [String],    // e.g., ["CSE-7A", "CSE-5B"] (Dynamically binds permissions)
  assignedSubjectIds: [String],  // e.g., ["CS-701", "CS-703"] (Dynamically binds permissions)
  academicStatus: String,        // "ACTIVE" | "ON_LEAVE" | "RELIEVED"
  // --- FACULTY-CONTROLLED PROFILE FIELDS ---
  cabinLocation: String,         // Campus office location
  bio: String,                   // Academic background & research interests
  avatarUrl: String,             // Profile image path
  createdAt: Date,
  updatedAt: Date
}
```

### 16.4 Collection: `collegeProfile` (Singleton)
```javascript
{
  _id: ObjectId,
  institutionName: String,       // "Chhatrapati Shivaji Maharaj University (CSMU)"
  institutionCode: String,       // "CSMU-ENG"
  establishedYear: Number,
  address: String,
  contactEmail: String,
  websiteUrl: String,
  authorizedAdminIds: [ObjectId],// Admins authorized to publish institutional notices
  institutionalBio: String,
  updatedAt: Date
}
```

### 16.5 Other Operational Collections
- `projects`: `studentId` (ref: studentProfiles), `title`, `tagline`, `description`, `techStack`, `githubUrl`, `liveDemoUrl`, `screenshotUrls`, `likesCount`.
- `projectLikes`: Compound unique index `{ projectId, studentId }`.
- `timetables`: `department`, `semester`, `section`, `academicYear`, `dayOfWeek`, `slots: [{ startTime, endTime, subjectCode, subjectName, facultyId, classroom }]`.
- `attendance`: `studentId`, `classId`, `subjectId`, `date`, `status` (`present`|`absent`|`late`), `markedByFacultyId`.
- `marks`: `studentId`, `subjectId`, `semester`, `examType`, `maxMarks`, `marksObtained`, `enteredByFacultyId`.
- `assignments`: `title`, `description`, `subjectId`, `classId`, `assignedByFacultyId`, `dueDate`, `maxScore`, `submissions: [{ studentId, submittedAt, fileUrl, score }]`.
- `notices`: `title`, `content`, `publishedByRole`, `authorId`, `targetAudience`, `department`, `priority`, `attachmentUrls`.
- `events`: `title`, `description`, `eventType`, `organizer`, `venue`, `startDateTime`, `endDateTime`, `registrationUrl`, `bannerImageUrl`.

---

## 17. Authentication Data Model

The authentication architecture coordinates between user records, OTP tokens, and JWT sessions:

```
[ Pre-Provisioned Record ]
          ↓ (accountStatus = "INVITED")
[ Activation Request: Enrollment No. + Email ]
          ↓
[ Temporary OTP Document: { targetEmail, otpHash, expiresAt } ]
          ↓ (Verified within 10 minutes)
[ Set Password: passwordHash = bcrypt.hash(newPassword) ]
          ↓
[ Update User: accountStatus = "ACTIVE", isActivated = true ]
          ↓
[ Issue Session: JWT HttpOnly Cookie { userId, role, institutionId } ]
```

---

## 18. Authorization Rules (RBAC Matrix)

| Module / Resource | Student Permission | Faculty Permission | HOD Permission | Principal / VP Permission | Admin Permission |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Authentication** | Activate own account; Login; Change password | Activate own account; Login; Change password | Login; Change password | Login; Change password | Bulk provision; revoke access; audit lifecycle |
| **Student Profiles** | Read directory; Edit student-controlled fields | Read students in assigned classes | Read all departmental students | Read all campus students | Create/update official records; suspend accounts |
| **Faculty Profiles** | Read faculty directory | Edit own cabin/bio | Read departmental faculty | Read all faculty | Create/update official faculty records |
| **Timetable** | Read own class schedule | Read assigned teaching schedule | Read/Audit department timetables | Read campus timetables | Create/update all timetables |
| **Attendance** | Read own attendance records | Mark/Update assigned classes | Audit department attendance | Audit campus-wide attendance | System-level attendance overrides |
| **Marks** | Read own marks & CGPA | Enter/Update assigned subjects | Audit department grades | Audit campus-wide academic performance | Grade lock / administrative sign-off |
| **Assignments** | Read assigned; Submit files | Create, update, grade assigned classes | Audit department assignments | Read assignments overview | Administrative archiving |
| **Notices** | Read permitted circulars | Post class/dept notices | Post department bulletins | Publish campus-wide circulars | Publish/delete all notices |
| **Campus Events** | Browse, register | Post authorized dept events | Post department events | Authorize campus events | Full CRUD on all events |
| **Campus AI** | Natural language queries (personal scope) | Natural language queries (assigned scope) | Department queries (dept scope) | Executive queries (campus scope) | Retrieval audit & system metrics |

---

## 19. Phase 1 / MVP Boundary

Phase 1 focuses exclusively on delivering a robust, complete **Core MVP (11 Modules)**:
- Complete frontend UI and responsive layouts for Student and Faculty workspaces.
- Institutional identity onboarding, activation, and secure session management.
- Complete operational schemas in MongoDB Atlas.
- Full CRUD workflows for attendance, timetable, marks, and assignments.
- Grounded Campus AI assistant.

---

## 20. Phase 2 (Planned Expansion)

The following four modules are formally classified as **Phase 2 Expansion** and will not delay Phase 1 MVP completion:
1. **Curated Internships Ecosystem**: Curated company listings, application tracking, and referral matching.
2. **Hackathons & Competitions Hub**: Team formation matcher, event discovery, and project submissions.
3. **Campus Community Feed**: Authenticated campus-wide discussion threads and announcements.
4. **Digital Lost & Found System**: Structured item reporting, verification workflow, and claim auditing.

---

## 21. Explicit Non-Goals (What College OS Is NOT)

To protect engineering resources and maintain project discipline, College OS explicitly defines what it is **NOT**:
1. **NOT an unrestricted public registration platform**: Anyone cannot create a fake institutional identity or self-assign a role.
2. **NOT a complete 100% ERP replacement**: It sits alongside or extends legacy institutional backends without rebuilding complex accounting payroll engines.
3. **NOT a generic social network**: It is not Instagram, Facebook, or Twitter; all interactions are academically and professionally focused.
4. **NOT an open ChatGPT wrapper**: The AI is strictly anchored in verified college databases and documents; zero hallucinations.
5. **NOT a commercial job portal**: Does not attempt to replace LinkedIn, Indeed, or Naukri.com.
6. **NOT an instant messaging chat app**: Does not attempt to build WhatsApp or Telegram peer-to-peer messaging in Phase 1.

---

## 22. Locked Decisions Registry

The following decisions are **PERMANENTLY LOCKED** as of Version 1.1:

1. **College-Controlled Identity**: Users do not choose their institutional role. The institution provisions and authorizes the user's role.
2. **No Open Registration**: Unrestricted public self-registration with arbitrary role selection is strictly rejected across all user levels.
3. **Student Account Activation**: Students activate pre-provisioned records using Enrollment Number + Official Email/Phone + OTP; official academic identity is read-only.
4. **Multi-Factor Security Rule**: Enrollment Number alone is strictly insufficient for account activation; verified institution-controlled contact + OTP is mandatory.
5. **User Password Ownership**: Users create their own passwords during activation; stored via bcrypt; college staff does not maintain or see plaintext passwords.
6. **Faculty Account Activation**: Faculty activate provisioned records using Employee ID + Official Contact + OTP; permissions derive from institutional course mapping.
7. **HOD / Principal Provisioning**: Administrative accounts are provisioned exclusively through authorized institutional channels; zero public self-elevation.
8. **Authoritative Role Backend**: Roles are non-selectable and enforced by backend database authority; frontend role claims are never trusted.
9. **Identity vs. Profile Boundary**: Institution-controlled academic fields (immutable by user) are strictly separated from user-controlled showcase portfolio fields.
10. **Account Lifecycle Model**: Formal lifecycle states enforced: `INVITED/NOT_ACTIVATED` &rarr; `ACTIVE` &rarr; `SUSPENDED` &rarr; `GRADUATED/INACTIVE`.
11. **Campus AI Authorization Guard**: AI authorization derives strictly from backend-authenticated institutional role; passwords, credentials, and secrets are permanently excluded.
12. **Scope Philosophy**: *Core First &rarr; Stabilize &rarr; Expand*. Phase 2 features shall not delay delivery of the 11 Core MVP modules.

---

## 23. Deferred Decisions Roadmap

The following design decisions are intentionally deferred to subsequent milestones:
- **Bi-directional Follower Graphs & Social Feed**: Deferred to Phase 2.
- **Direct Real-Time Peer Messaging**: Deferred to Phase 2.
- **Payment Gateway Integration (Tuition / Exam Fees)**: Deferred to post-MVP integration.
- **Physical Library Barcode Scanning**: Deferred to post-MVP utility integrations.
- **Permanent Product Brand Name**: Working title remains "College OS" until pre-defense branding review.

---

## 24. Change Control Rules (The 4-Question Validation Gate)

Before any new feature, API route, or database collection is introduced into College OS, it must affirmatively satisfy at least one of these criteria:
1. **Does it directly resolve an identified, validated campus problem?**
2. **Does it reinforce the core vision of a unified, student-centric digital campus?**
3. **Does it deliver demonstrable, tangible value to a defined user role?**
4. **Does it strictly belong in the current development phase (Core MVP)?**

If the answer to all four questions is negative, the feature is rejected or placed in the Phase 2 backlog. Any modification to locked architecture requires formal incrementation of document versioning.

---

## 25. Engineering Rules (Rules to Prevent Future Contradictions)

All developers and AI coding agents working on College OS must strictly adhere to these 10 engineering rules:

- **RULE 1**: Never implement open public student registration that bypasses institutional verification.
- **RULE 2**: Never allow a user to self-select HOD, Principal, VP, or other privileged institutional roles.
- **RULE 3**: Never trust role values coming from the frontend payload or client requests.
- **RULE 4**: Backend/database institutional role is authoritative across all routes and API endpoints.
- **RULE 5**: Never allow users to edit institution-controlled academic identity fields arbitrarily.
- **RULE 6**: Never store plaintext passwords; always hash credentials using bcrypt.
- **RULE 7**: Never expose credentials, passwords, OTPs, or session secrets to Campus AI context or API outputs.
- **RULE 8**: Faculty authorization must remain dynamically assignment-scoped to allocated classes and subjects.
- **RULE 9**: Campus AI must respect authenticated RBAC and enforce least-privilege retrieval.
- **RULE 10**: Any future authentication change must update the PDF, HTML, documentation and `COLLEGE_OS_SOT.md` together.
