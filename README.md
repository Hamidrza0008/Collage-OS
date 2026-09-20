# College OS — AI-Powered Digital Campus Platform

> **A modern, unified digital campus operating system bridging the gap between fragmented academic administration, student collaboration, and context-aware artificial intelligence.**

---

## 📌 Executive Overview

In most modern higher education institutions, academic and campus life is heavily fragmented across disconnected silos: legacy ERP systems (such as MyCamu-style portals), unstructured WhatsApp announcement groups, static PDF circulars, physical noticeboards, and disparate departmental emails. Students struggle to track their daily schedules, attendance thresholds, assignment deadlines, and official announcements, while opportunities to discover peer projects, skills, and campus collaborators are virtually nonexistent.

**College OS** is designed as a single, cohesive campus operating system. It centralizes academic records, administrative notices, and project portfolios into an intuitive, high-performance web platform, backed by a planned **Campus AI** engine grounded directly in official college data and institutional handbooks.

---

## 🏛️ System Architecture & Access Hierarchy

College OS establishes a role-based access model designed to serve distinct user groups across the academic hierarchy:

```
                          ┌─────────────────────────────┐
                          │   College OS Campus Core    │
                          └──────────────┬──────────────┘
                                         │
        ┌───────────────────┬────────────┴───────────┬───────────────────┐
        ▼                   ▼                        ▼                   ▼
┌───────────────┐   ┌───────────────┐        ┌───────────────┐   ┌───────────────┐
│    Student    │   │    Faculty    │        │      HOD      │   │ Principal/VP  │
├───────────────┤   ├───────────────┤        ├───────────────┤   ├───────────────┤
│• Dashboard    │   │• Assigned Cls │        │• Dept Overview│   │• College-wide │
│• Academics    │   │• Attendance   │        │• Faculty Mgmt │  │  Analytics    │
│• Assignments  │   │• Assignment   │        │• Dept Notices │   │• Inst. Notices│
│• Notices/Ann. │   │  Review       │        │• Curriculum   │   │• Cross-Dept   │
│• Profile & Port.│ │• Class Notices│        │  Coordination │   │  Governance   │
│• Campus AI    │   │• Campus AI    │        │• Campus AI    │   │• Campus AI    │
└───────────────┘   └───────────────┘        └───────────────┘   └───────────────┘
```

### Role Breakdown

| Role | Scope & Permissions | Status |
| :--- | :--- | :--- |
| **Student** | Personal academics, CGPA tracking, assignment submissions, institutional notices, profile customization, project portfolio showcase, and student-scoped AI assistant. | 🟢 **Frontend Implemented** |
| **Faculty** | Class-level management, bulk/smart attendance entry, assignment creation and grading, class-targeted notices, and faculty-scoped AI assistant. | 🟡 **Route Shell / In Progress** |
| **Head of Department (HOD)** | Department-wide academic oversight, faculty allocation, department circulars, student performance analytics, and HOD-scoped administrative intelligence. | ⚪ **Planned** |
| **Principal / Vice Principal** | Institution-level controls, cross-department analytics, campus-wide announcements, policy broadcast, and executive governance. | ⚪ **Planned** |

---

## 🚀 Current Implementation Status

College OS is being developed systematically across four phases, following the master roadmap in [`docs/roadmap.md`](docs/roadmap.md). Below is the verified status of the repository:

### Current State Summary

- 🟢 **Implemented (Frontend Live)**: Global responsive application shell, light/dark theme system with CSS custom properties, real-time 12-typeface font switcher, and complete Student Portal modules (Dashboard, Profile, Academics, Assignments, Notices & Announcements) with realistic mock data and interactive modals.
- 🟡 **In Progress**: Faculty workspace layouts, Student Discovery (Explore Students & Projects), Events, and Internship modules.
- ⚪ **Planned (Backend & AI)**: Node.js/Express backend server, MongoDB database models, REST APIs, Role-Based Access Control (RBAC), and dual-retrieval Campus AI (MongoDB + Vector RAG).

```
Phase 1: Frontend UI & UX               [██████████████░░░░░░] 70% (Student Core Complete)
Phase 2: Database Models & Schemas      [░░░░░░░░░░░░░░░░░░░░]  0% (Architecture Specified)
Phase 3: Backend REST APIs & Auth       [░░░░░░░░░░░░░░░░░░░░]  0% (Endpoint Specs Ready)
Phase 4: Campus AI (RAG + MongoDB)      [░░░░░░░░░░░░░░░░░░░░]  0% (Pipeline Specified)
```

---

## 💻 Implemented Modules & Features

### 1. Global Application Shell & Navigation
- **Responsive Layout**: Desktop fixed sidebar with high-resolution campus artwork and mobile drawer navigation with backdrop blur.
- **Top Navigation Bar**: Global search bar, notifications indicator, profile shortcut, and integrated controls for theme and font switching.
- **Role-Aware Navigation**: Configurable menu trees via [`components/layout/navConfig.js`](frontend/components/layout/navConfig.js).

### 2. Student Dashboard (`/student`)
- **Welcome Hero**: Personalized greeting card displaying current date, academic term, and quick greeting.
- **Academic Snapshot Cards**: High-level counters for Cumulative GPA, Current Attendance percentage, Pending Assignments, and Active Backlogs.
- **Today's Timetable**: Chronological class schedule with room numbers, faculty names, and subject codes.
- **Deadlines & Notices Feed**: Quick-view widgets for urgent upcoming assignment due dates and priority college notices.
- **Campus AI Quick-Ask**: Inline interactive AI prompt card with pre-filled student query chips.

### 3. Student Profile & Portfolio (`/student/profile`)
- **Visual Hero Header**: Cover artwork with student avatar, degree info (`B.Tech CSE - 7th Sem`), university ID, and status badge.
- **Profile Completion Dial**: Interactive progress indicator highlighting missing profile segments.
- **Sticky Section Navigation**: Scroll-spy tabs navigating through About Me, Quick Info, Academic Metrics, Featured Projects, Assignments, Badges, Skills, and Social Handles.
- **Multi-Member Project Attribution**: Project cards showing GitHub repositories, live demo links, technology tags, and collaborator avatars.
- **Verifiable Badges**: Milestone achievements (Consistent Learner, Project Builder, Event Attendee).

### 4. Academics Center (`/student/academics`)
- **Proportional Layout**: Desktop 2/3 Main Content + 1/3 Right Sidebar layout aligned to top baseline.
- **Campus Header Banner**: Campus architectural artwork with semester switcher dropdown (Sem 1 to Sem 8).
- **Interactive Tab Bar**: Overview, Marks, Attendance, Timetable, Assignments, and Academic Calendar tabs with scroll spy.
- **CGPA & Metric Dial**: Circular gauge visualizer for overall CGPA alongside semester credits, total courses, and attendance standing.
- **Performance Trend**: Custom SVG line chart illustrating semester-by-semester SGPA trajectories.
- **Subject Progress Matrix**: Enrolled courses with weekly hours, faculty names, and interactive syllabus progress bars.
- **Semester Grades Breakdown**: Tabular course-by-course letter grades, internal marks, and credit points.
- **Calendar & Exam Alerts**: Monthly academic schedule widget and upcoming examination notice cards.

### 5. Assignments Hub (`/student/assignments`)
- **Top-Aligned 2/3 + 1/3 Layout**: Main assignment feed paired with a right-hand deadline and submission analytics column.
- **Reactive Filter Tabs**: Instant filtering across `All (16)`, `Pending (3)`, `Submitted (13)`, and `Overdue (2)` with dynamic badges.
- **Search & Subject Filtering**: Real-time keyword query input combined with course-level dropdown filtering.
- **Assignment Cards**: Detailed cards featuring course tags, maximum marks, deadline urgency badges (e.g. *Due in 2 days*, *Overdue*), submission status pills, and context menus.
- **Interactive Modals**:
  - **View Details Modal**: Comprehensive rubric breakdown, description, attached instructor materials, and direct submission trigger.
  - **Upload Assignment Modal**: File drag-and-drop area, note field, and submission validation.
- **Client-Side Pagination**: Strict 6-card-per-page pagination with range counters (`Showing 1-6 of 16 assignments`) and previous/next navigation.
- **Submission Statistics Widget**: Circular 81% on-time completion dial with month-at-a-glance mini calendar.

### 6. Notices & Announcements (`/student/notices`)
- **Campus Header**: Dedicated hero banner featuring architectural artwork and institution branding.
- **Notices vs. Announcements Switcher**: Dedicated tabs to differentiate routine operational notices from major institution milestones.
- **Multi-Filter Controls**: Filter simultaneously by Department (All, Computer Science, IT, Electronics, Mechanical, Administration) and Category (Exams, Academic, Events, Placements, General).
- **Rich Notice Cards**: Priority flags (Pinned/Important), department chips, publication timestamps, download attachment buttons, and full preview triggers.
- **Client-Side Pagination**: Clean 6-card pagination with auto-reset on filter/search change.
- **Interactive Modal Suite**:
  - **Notice Details Modal**: Full text display with attachment download links and department contacts.
  - **Notification Preferences Modal**: Toggle push/email alerts for exams, assignments, placements, and general circulars.
  - **Contact Admin Modal**: Direct query submission modal for clarifications on administrative circulars.

### 7. UI Font Switcher & Typography System
- **Real-Time Global Switcher**: Embedded directly in the navigation bar, allowing instant previewing and locking of application-wide typography.
- **12 Curated Typefaces**: Dynamically injected via Google Fonts into CSS custom properties:
  `Inter`, `Manrope`, `Plus Jakarta Sans`, `DM Sans`, `Poppins`, `Outfit`, `Nunito Sans`, `Geist`, `Roboto`, `Source Sans 3`, `IBM Plex Sans`, and `Work Sans`.
- **Persistent State**: User font selection is stored in browser `localStorage` and automatically loaded on startup.

### 8. Dual Light & Dark Theme System
- **Design Tokens**: Carefully balanced HSL/Hex variables defined in [`frontend/app/globals.css`](frontend/app/globals.css).
- **Theme Palette**:
  - **Light Mode**: Fresh mint background (`#F7FBF9`), emerald brand primary (`#159B72`), crisp white cards (`#FFFFFF`), and deep forest typography (`#0B3024`).
  - **Dark Mode**: Deep forest-obsidian background (`#031A16`), elevated dark surface (`#06241F`), vibrant neon-emerald accents (`#18B887` / `#20D39B`), and high-contrast light mint text (`#F1FAF6`).
- **Page-Wise Theme Assets**: Both Light and Dark asset variants exist for banners, campus art, and illustrations inside `public/assets/<feature>/{light,dark}/`.

---

## 🧠 Campus AI Architecture (Planned Specification)

**Campus AI** is not a generic, unconstrained chatbot. It is an institution-specific intelligence layer designed with strict factual boundaries and privacy guardrails.

```
                                  ┌────────────────────────┐
                                  │   User Campus Query    │
                                  └───────────┬────────────┘
                                              │
                             ┌────────────────┴────────────────┐
                             │  Role & Auth Permission Check   │
                             └────────────────┬────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         [Structured Campus Data]                        [Unstructured Documents]
         • Attendance percentages                        • Academic bylaws & handbooks
         • Subject grades & marks                        • Exam eligibility guidelines
         • Timetable & class slots                       • Hostel & campus rules
                      │                                               │
                      ▼                                               ▼
           ┌──────────────────────┐                       ┌──────────────────────┐
           │   MongoDB Queries    │                       │  Vector RAG Pipeline │
           └──────────┬───────────┘                       └──────────┬───────────┘
                      │                                              │
                      └───────────────────────┬──────────────────────┘
                                              │
                                              ▼
                              ┌───────────────────────────────┐
                              │     Context-Grounded LLM      │
                              └───────────────┬───────────────┘
                                              │
                                              ▼
                              ┌───────────────────────────────┐
                              │ Verified Institution Response │
                              └───────────────────────────────┘
```

### Key Campus AI Operating Principles

1. **Dual Source of Truth**:
   - **MongoDB** is the source of truth for all structured user data (attendance, marks, schedules).
   - **Vector Database (RAG)** is the source of truth for unstructured college documentation (PDF regulations, curriculum guidelines, exam ordinances).
   - **Composite Inquiries**: For queries like *"My attendance in OS is 68%. Am I eligible for midterms?"*, the system retrieves the student's live 68% attendance from MongoDB, matches it with the college's 75% threshold rule from the RAG handbook, and responds accurately.
2. **Strict Hallucination Boundary**: If a college policy or data point is not indexed in the system, Campus AI explicitly replies that the information is unavailable rather than fabricating administrative rules.
3. **Data Privacy Guardrails**: Passwords, credentials, private administrative tokens, and sensitive student identifiers are strictly masked from the AI model context window.
4. **Role Isolation**: Students cannot query private records belonging to other students or faculty members.

---

## 🛠️ Technology Stack & Verified Dependencies

The application leverages a modern JavaScript/React ecosystem. Dependencies listed below reflect the active versions installed in [`frontend/package.json`](frontend/package.json):

### Frontend (Active)

| Layer | Technology | Verified Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.3.5` (App Router) | High-performance React framework with server components and optimized routing. |
| **Library** | [React](https://react.dev/) / [React DOM](https://react.dev/) | `19.2.8` | Component rendering engine and state management. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0.0` | Utility-first CSS engine with `@tailwindcss/postcss`. |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.47.0` | Crisp, modern iconography across all navigation and cards. |
| **Tooling** | [ESLint](https://eslint.org/) | `^9.0.0` | Code quality enforcement with `eslint-config-next`. |

### Backend & Database (Planned Architecture)

| Layer | Target Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Server** | Node.js + Express.js | Secure RESTful API services handling authentication, workflows, and business logic. |
| **Database** | MongoDB + Mongoose | Document store for students, faculty, courses, attendance, and assignments. |
| **Authentication** | JWT / Secure HttpOnly Cookies | Role-based session management for Student, Faculty, HOD, and Principal accounts. |
| **Vector Engine** | Pinecone / Qdrant / Atlas Vector | Embedding storage for college handbooks and document RAG pipelines. |

---

## 📂 Project Directory Structure

```text
collage-os/
├── .git/                               # Git version control metadata
├── .gitignore                          # Git ignore rules
├── README.md                           # Public repository documentation
├── backend/                            # Backend API workspace (planned)
├── docs/                               # Project specifications and guides
│   ├── AI_INSTRUCTIONS.md              # Master development and architecture rules
│   └── roadmap.md                      # Living feature implementation checklist
├── Project Plan/                       # Master concept documents & reference mockups
│   ├── College_OS_Project_Plan_Source_of_Truth.docx
│   ├── College_OS_Project_Plan_Source_of_Truth.html
│   ├── College_OS_Project_Plan_Source_of_Truth.pdf
│   └── Frontend UI/                    # UI visual design references
│       ├── UI light and dark.png
│       ├── img 1.png (Dashboard)
│       ├── img 1 dark.png (Dashboard Dark)
│       ├── img 2.png (Profile)
│       ├── img 3.png (Academics)
│       ├── img 4.png (Assignments)
│       └── img 5.png (Notices)
└── frontend/                           # Next.js frontend application
    ├── app/                            # App Router routes & layouts
    │   ├── globals.css                 # Theme tokens, custom scrollbars, Tailwind v4
    │   ├── layout.js                   # Root layout with ThemeProvider & FontProvider
    │   ├── page.js                     # Root index redirecting to /student
    │   ├── faculty/                    # Faculty portal routes
    │   │   ├── layout.js               # Faculty layout shell
    │   │   └── page.js                 # Faculty dashboard placeholder
    │   └── student/                    # Student portal routes
    │       ├── layout.js               # Student AppLayout wrapper
    │       ├── page.js                 # Student Dashboard route
    │       ├── academics/page.jsx      # Student Academics route
    │       ├── assignments/page.jsx    # Student Assignments route
    │       ├── notices/page.jsx        # Student Notices & Announcements route
    │       └── profile/page.jsx        # Student Profile route
    ├── components/                     # Modular component architecture
    │   ├── academics/                  # AcademicsAssembler & subcomponents (15 files)
    │   ├── assignments/                # AssignmentsAssembler & subcomponents (13 files)
    │   ├── dashboard/                  # DashboardAssembler & subcomponents (17 files)
    │   ├── layout/                     # AppLayout, Navbar, Sidebar, FontSwitcher (6 files)
    │   ├── notices/                    # NoticesAssembler & subcomponents (14 files)
    │   ├── profile/                    # ProfileAssembler & subcomponents (16 files)
    │   └── providers/                  # ThemeProvider, FontProvider, fontList (3 files)
    ├── public/                         # Static assets organized page-wise
    │   └── assets/
    │       ├── academics/{light,dark}/ # Header artwork & semester graphics
    │       ├── assignments/{light,dark}/# Hero banners & illustrations
    │       ├── dashboard/              # Dashboard campus art & hero visuals
    │       ├── layout/                 # Brand logos, avatars, sidebar art
    │       ├── notices/{light,dark}/   # Notices hero & card artwork
    │       └── profile/{light,dark}/   # Badges, avatars, completion graphics
    ├── package.json                    # Frontend package dependencies & scripts
    ├── postcss.config.mjs              # PostCSS configuration
    └── next.config.mjs                 # Next.js configuration
```

---

## ⚡ Getting Started & Local Development

### Prerequisites

- **Node.js**: Version `18.18.0` or later (Node 20+ recommended)
- **npm**: Version `9.0.0` or later

### 1. Clone the Repository

```bash
git clone https://github.com/Hamidrza0008/Collage-OS.git
cd Collage-OS
```

### 2. Navigate to the Frontend Workspace

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```
*(The root route `/` automatically redirects to `/student`)*

### 5. Available Scripts

Within the `frontend/` directory, you can run:

```bash
npm run dev      # Starts Next.js development server with hot reload
npm run build    # Compiles and optimizes the production build
npm run start    # Starts the production server
npm run lint     # Runs ESLint to inspect code quality
```

---

## ⚙️ Configuration & Environment

### Current Frontend State
The frontend currently functions independently with high-fidelity client-side mock datasets located in each feature folder (e.g. `academicsData.js`, `assignmentsData.js`, `noticesData.js`). No external API keys or environment variables are required to run the frontend locally.

### Planned Backend Environment Variables
When connecting the Phase 2/3 backend server, create a `.env` file inside `backend/`:

```env
# Server Configuration (Planned)
PORT=5000
NODE_ENV=development

# Database Configuration (Planned)
MONGODB_URI=mongodb://localhost:27017/college_os

# Security & Authentication (Planned)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Campus AI Engine (Planned)
LLM_API_KEY=your_ai_api_key_here
VECTOR_DB_URL=your_vector_database_url_here
VECTOR_DB_API_KEY=your_vector_db_key_here
```

---

## 🗺️ Project Roadmap

The development trajectory is tracked in detail within [`docs/roadmap.md`](docs/roadmap.md):

### Phase 1 — UI & Frontend (Current)
- [x] Global Application Shell with responsive Sidebar, Navbar, and NavItem routing.
- [x] Light & Dark theme token system with dynamic asset switching.
- [x] 12-typeface Font Switcher integrated directly into the Navbar.
- [x] Student Dashboard (`/student`).
- [x] Student Profile & Portfolio (`/student/profile`).
- [x] Student Academics Center (`/student/academics`).
- [x] Student Assignments Hub (`/student/assignments`) with 6-card pagination.
- [x] Student Notices & Announcements (`/student/notices`) with modal suite.
- [ ] Student Events Calendar (`/student/events`).
- [ ] Student Project Discovery & Exploration (`/student/projects`).
- [ ] Student Internships & Hackathons (`/student/internships`).
- [ ] Faculty Portal Core Modules (Attendance, Assignments, Marks).
- [ ] HOD and Principal / Management Dashboards.

### Phase 2 — Database Models & Schemas (Planned)
- [ ] MongoDB connection and Mongoose data models.
- [ ] User, StudentProfile, and FacultyProfile schema definitions.
- [ ] Structured academic models (Courses, Sections, Timetable, Attendance, Grades).
- [ ] Workflow models (Assignments, Submissions, Notices, Announcements).
- [ ] Multi-member project attribution and engagement data structures.

### Phase 3 — Backend APIs & Authentication (Planned)
- [ ] JWT authentication with secure session handling.
- [ ] Role-Based Access Control (RBAC) middleware for Student, Faculty, HOD, and Principal.
- [ ] Student and Faculty REST API endpoints.
- [ ] Bulk attendance workflow endpoints.
- [ ] Replacement of frontend mock data with live API client integration.

### Phase 4 — Campus AI Engine (Planned)
- [ ] Server-side LLM provider integration.
- [ ] MongoDB structured data query generator for student/faculty inquiries.
- [ ] College handbook RAG pipeline (document chunking, embedding, and vector search).
- [ ] Composite MongoDB + RAG query handler.
- [ ] Privacy filtering and strict administrative boundary enforcement.

---

## 📖 Development Guidelines & Standards

- **Assembler Architecture**: Pages follow the pattern `Route → page.jsx (thin wrapper) → FeatureAssembler.jsx → Feature subcomponents`. UI code should not be placed directly in route files.
- **Reference UI Fidelity**: When building from visual references in `Project Plan/Frontend UI/`, components must faithfully recreate composition, layout proportions, typography, and card hierarchy.
- **Theme Consistency**: Every component must look polished in both Light (`#F7FBF9`) and Dark (`#031A16`) themes using Tailwind classes and CSS variables.
- **Documentation as Source of Truth**: Refer to [`docs/AI_INSTRUCTIONS.md`](docs/AI_INSTRUCTIONS.md) for master engineering standards and [`docs/roadmap.md`](docs/roadmap.md) for live milestone tracking.

---

## 📄 License & Attribution

Developed as an open, modern campus operating platform for higher education institutions.  
Maintained by the **College OS** team.
