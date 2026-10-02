# COLLEGE OS — REMAINING FRONTEND WORK: PHASED EXECUTION PLAN

> **Document Type:** Master Execution Plan & Task Tracker (Revised Final Draft)  
> **Source of Truth:** Actual Repository Codebase (`frontend/`, `backend/`, `docs/`)  
> **Status:** Draft / Ready for External Review — **Zero code changes executed.**  
> **Execution Rule:** Strictly iterative. Execute ONE task → Stop → User Reviews & Commits → Next Task.

---

## 1. Master Scope Table

| Item | Type | Current Status | Scope Classification | Planned Phase | Task ID | Dependencies | Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Notification Route Fix** | Routing Bug | ❌ Links to `/student/dashboard` | **Mandatory** | Phase 1 | P1-T01 | None | Change empty state button in Notification Center to canonical `/student`. |
| **Event ID Mismatch** | Mock Data Bug | ❌ Broken `evt-1` references | **Mandatory** | Phase 1 | P1-T02 | None | Aligns notification and feed context links with canonical `event-1`. |
| **MD-07 Lost & Found Cards** | Modal Integration | 🟡 Only wired in `my-reports` | **Mandatory** | Phase 1 | P1-T03 | None | Resolve canonical claim record and connect to Found cards without duplicating store. |
| **MD-08 Assignments & Academics**| Modal Integration | ❌ Unwired (0 imports) | **Mandatory** | Phase 1 | P1-T04 | None | Connect shared viewer to PDFs/images; fallback to download for unsupported types. |
| **MD-08 Notices Migration** | Consolidation | 🟡 Siloed `NoticePdfViewerModal` | **Mandatory** | Phase 2 | P2-T01 | P1-T04 | Replace notice viewer with canonical MD-08. |
| **MD-08 Internships Migration** | Consolidation | 🟡 Siloed `OpportunityDocViewer` | **Mandatory** | Phase 2 | P2-T02 | P2-T01 | Replace opportunity brochure viewer with canonical MD-08. |
| **Remove Deprecated Viewers** | Dead Code Cleanup | ⚠️ Deprecated duplicate files | **Mandatory** | Phase 2 | P2-T03 | P2-T01, P2-T02 | Delete `NoticePdfViewerModal` & `OpportunityDocViewerModal` after 0 imports confirmed. |
| **Remove 6 Dead Saved Files** | Dead Code Cleanup | ⚠️ 6 orphaned files in `saved/` | **Mandatory** | Phase 2 | P2-T04 | None | Safely delete unused legacy files after confirming zero active imports. |
| **Profile Storage Key Unification**| State Consistency | 🟡 `collegeos_student_profile_edit` | **Mandatory** | Phase 2 | P2-T05 | None | Normalize key with automatic migration fallback to prevent any user data loss. |
| **All Subjects Catalog Page** | Missing Full Page | ❌ Missing route (`/academics/subjects`)| **Mandatory** | Phase 3 | P3-T01 | None | Reuse real existing subject data across semesters to resolve Academics toast. |
| **SP-07 Shell & Architecture** | Missing Sub-Page | ❌ Missing route (`/settings/security`) | **Mandatory** | Phase 4 | P4-T01 | None | Scaffold thin page, layout, tabs, and hero with explicit local demo labeling. |
| **SP-07 2FA & Password UI** | Sub-Page Feature | ❌ "Coming Soon" badge in settings | **Mandatory** | Phase 4 | P4-T02 | P4-T01 | Client-side 2FA walkthrough and password form; strictly local/demo state. |
| **SP-07 Sessions & OAuth Accounts**| Sub-Page Feature | ❌ Missing connected accounts UI | **Mandatory** | Phase 4 | P4-T03 | P4-T02 | Default providers to "Not Connected"; simulated local connection toggles. |
| **SP-07 Settings Hub Linkage** | Navigation Linkage | 🟡 Currently modal-based | **Mandatory** | Phase 4 | P4-T04 | P4-T03 | Update Settings Security card to deep link to SP-07 sub-page. |
| **Final QA & Verification** | Quality Assurance | ⏳ Pending implementation | **Mandatory** | Phase 5 | P5-T01 | P1-T01 – P4-T04 | Build verification, code link audit, and environment limitation disclosure. |
| **Community Groups Directory** | Directory Page | 🟡 Optional / Modal-only | **Optional** | Optional Phase 6 | OPT-T01 | None | Dedicated `/student/feed/groups` hub; does NOT block main frontend completion. |

---

## 2. OUT OF SCOPE — DO NOT IMPLEMENT NOW

> [!CAUTION]
> **Backend, Database, and Server Infrastructure are strictly forbidden during frontend execution.**  
> Any task attempting to touch the following systems will be rejected immediately.

1. **Database Layer:** MongoDB connection strings, Mongoose schemas, Prisma client, SQL tables, or database migrations.
2. **Authentication Backend:** Server-side JWT issuance, session cookies, bcrypt password hashing, passport/Auth.js middleware.
3. **OAuth Backend:** Google/GitHub API secrets, token exchanges, callback route handlers (`/api/auth/callback/*`).
4. **API Route Handlers:** Creating Next.js route handlers (`frontend/app/api/`) or Express server endpoints.
5. **Server Actions / Mutations:** `"use server"` directives or mutations modifying server-side persistent data.
6. **Cloud File Storage:** S3 bucket uploads, Cloudinary media processing, or multipart disk storage.
7. **Real-time WebSockets:** Live Socket.io servers or Pusher integrations for messaging and notifications.
8. **Faculty Full Management Modules:** Complex attendance marking rosters, grade submission engines, or department dashboards (belongs to Faculty Phase).
9. **Fake Production Telemetry:** Fabricating real-looking user IP addresses, physical locations, or fake external OAuth emails in UI displays.

---

## 3. Execution Plan Overview

- **Mandatory Phases:** 5
- **Mandatory Tasks:** 15
- **Optional Phases:** 1
- **Optional Tasks:** 1
- **Total Tasks:** 16
- **Execution Model:** Execute ONE task → Stop → User Reviews & Commits → Proceed to Next Task.

```
MANDATORY COMPLETION PATH:
PHASE 1: Core Correctness, Routing Fixes & Modal Integrations (Tasks P1-T01 to P1-T04)
   ↓
PHASE 2: Shared Component Consolidation & Dead Code Cleanup (Tasks P2-T01 to P2-T05)
   ↓
PHASE 3: Missing Catalog & Curricular Completeness (Task P3-T01)
   ↓
PHASE 4: Missing Sub-Page SP-07 (Security & Connected Accounts UI) (Tasks P4-T01 to P4-T04)
   ↓
PHASE 5: Comprehensive Frontend QA & Verification (Task P5-T01)

POST-AUDIT OPTIONAL ENHANCEMENT:
OPTIONAL PHASE 6: Community Groups Directory Hub (Task OPT-T01)
```

---

## PHASE 1: Core Correctness, Routing Fixes & Modal Integrations

**Goal:** Resolve immediate routing bugs, entity ID mismatches, and wire existing orphaned modals into their primary entry points without altering desktop layouts.

### - [ ] P1-T01: Fix Notification Center Canonical Dashboard Route
- **Task ID:** P1-T01
- **Title:** Fix Notification Center Canonical Dashboard Route
- **Size:** SMALL
- **Objective:** Change the invalid `/student/dashboard` link in the Notification Center empty state to the canonical `/student` route.
- **Current State:** In `frontend/components/notifications/NotificationCenterAssembler.jsx` (line 285), the "Back to Dashboard" button links to `/student/dashboard`, which produces a 404 error because the dashboard lives at `/student`.
- **Scope:** `frontend/components/notifications/NotificationCenterAssembler.jsx`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Locate the empty-state fallback in `NotificationCenterAssembler.jsx`.
  2. Update `<Link href="/student/dashboard">` to `<Link href="/student">`.
  3. Ensure link text, styling, and `ArrowLeft` icon remain untouched.
- **Acceptance Criteria:**
  - Clicking "Back to Dashboard" when notifications are empty navigates cleanly to `/student`.
  - Zero references to `/student/dashboard` remain across the entire repository.
- **Build / Validation:** Run `npm run build` inside `frontend/` to confirm exit code 0.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not redesign Notification Center, do not touch filters, do not modify notification storage schema.

---

### - [ ] P1-T02: Fix Event ID Mismatch Across Notifications and Feed
- **Task ID:** P1-T02
- **Title:** Fix Event ID Mismatch Across Notifications and Feed
- **Size:** SMALL
- **Objective:** Normalize event ID references from `evt-1` to `event-1` in notification and campus feed mock datasets.
- **Current State:** `notificationData.js` (line 114) and `feedPostDetailsData.js` (line 124) hardcode routes to `/student/events/evt-1`. However, `eventDetailsData.js` indexes events as `event-1`, `event-2`, etc. Clicking these links displays the `EventNotFound` fallback screen.
- **Scope:**
  - `frontend/components/notifications/notificationData.js`
  - `frontend/components/campus-feed/details/feedPostDetailsData.js`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. In `notificationData.js`, change `entityId: "evt-1"` to `entityId: "event-1"` and `route: "/student/events/evt-1"` to `route: "/student/events/event-1"`.
  2. In `feedPostDetailsData.js`, change `route: "/student/events/evt-1"` to `route: "/student/events/event-1"`.
  3. Verify `getEventDetails("event-1")` resolves correctly.
- **Acceptance Criteria:**
  - Clicking the Aarohan 2025 event notification navigates to `/student/events/event-1` and renders the full Event Details page.
  - Clicking event context links in campus feed post discussions resolves to the valid event details view.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not change event page layout, do not alter other event IDs (`event-2`, `event-3`), do not modify ticket generation logic.

---

### - [ ] P1-T03: Wire MD-07 Claim Verification Modal into Main Lost & Found Hub
- **Task ID:** P1-T03
- **Title:** Wire MD-07 Claim Verification Modal into Main Lost & Found Hub
- **Size:** MEDIUM
- **Objective:** Enable students to initiate an ownership claim directly from Found item cards on the main Lost & Found hub, resolving to the canonical My Reports claim representation without creating a duplicate claim store.
- **Current State:** `ClaimVerificationModal.jsx` exists inside `components/lost-and-found/my-reports/` and handles claim verification for user reports. On `/student/lost-and-found`, Found item cards only offer a "Contact Owner" button, leaving no entry point for students to submit verification evidence from the main catalog.
- **Scope:**
  - `frontend/components/lost-and-found/LostAndFound.jsx`
  - `frontend/components/lost-and-found/LostFoundCard.jsx`
  - `frontend/components/lost-and-found/LostFoundDetailsModal.jsx`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Import `ClaimVerificationModal` from `./my-reports/ClaimVerificationModal` into `LostAndFound.jsx`.
  2. When a user clicks "Claim Item" on a Found card or details modal, resolve the hub item into a canonical claimable report representation compatible with `myReportsData.js` (preserving item ID, category, location, date, and description).
  3. Reuse existing My Reports persistence (`collegeos_my_reports_tracker`). Do NOT create a secondary or competing claim storage key.
  4. Ensure existing "Contact Finder / Owner" behavior remains fully accessible as a secondary action.
  5. Upon claim submission, record the claim status as `"Under Verification"`, generate a canonical claim ID (`CLM-2026-XXXX`), append to `collegeos_my_reports_tracker`, and display a success toast.
- **Acceptance Criteria:**
  - Clicking "Claim Item" on any Found item card opens `ClaimVerificationModal` with pre-filled item metadata.
  - Submitting ownership proof persists the claim into the canonical My Reports tracker.
  - Navigating to `/student/lost-and-found/my-reports` immediately shows the newly filed claim under the "Claims" and "Needs Action" tabs without reload bugs.
  - Existing "Contact Owner" messaging modal remains intact.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not rewrite `ClaimVerificationModal.jsx`, do not change the right sidebar rail in Lost & Found, do not modify report filing modals.

---

### - [ ] P1-T04: Wire MD-08 DocumentViewerModal into Assignment & Course Resources
- **Task ID:** P1-T04
- **Title:** Wire MD-08 DocumentViewerModal into Assignment & Course Resources
- **Size:** MEDIUM
- **Objective:** Connect the canonical shared `DocumentViewerModal.jsx` (which currently has 0 imports) to assignment brief attachments and course syllabus materials for supported file formats, maintaining download fallbacks for unsupported formats.
- **Current State:** `frontend/components/shared/DocumentViewerModal.jsx` exists with PDF and web image preview, zoom controls, and download buttons, but is completely unused. Clicking resources on `/student/assignments/[id]` and `/student/academics/subjects/[code]` triggers generic file downloads or empty clicks.
- **Scope:**
  - `frontend/components/assignments/details/AssignmentResources.jsx`
  - `frontend/components/assignments/details/AssignmentDetailsAssembler.jsx`
  - `frontend/components/academics/subject-details/CourseResources.jsx`
  - `frontend/components/academics/subject-details/SubjectDetailsAssembler.jsx`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Import `DocumentViewerModal` from `@/components/shared/DocumentViewerModal` into `AssignmentDetailsAssembler.jsx` and `SubjectDetailsAssembler.jsx`.
  2. Support visual preview ONLY for file types supported natively by `DocumentViewerModal`: PDF, PNG, JPG, JPEG, WEBP, GIF.
  3. For unsupported file types (DOCX, PPTX, XLSX, ZIP, code archives), invoke the existing download handler; do NOT fake in-browser rendering for binary office files.
  4. In `AssignmentResources.jsx` and `CourseResources.jsx`, provide an explicit "Preview Document" button alongside the existing "Download" button for supported formats.
  5. Preserve `DocumentViewerModal` styling and structure without unnecessary redesigns.
  6. Do NOT delete legacy local viewers (`NoticePdfViewerModal`, `OpportunityDocViewerModal`) during this task.
- **Acceptance Criteria:**
  - Supported files (PDF, PNG, JPG, JPEG, WEBP, GIF) open through the canonical `DocumentViewerModal` with existing preview, zoom, rotate, fullscreen, multi-file navigation, download, and open-in-new-tab controls.
  - Unsupported files (e.g. `.docx`, `.xlsx`, `.zip` archives) fall back cleanly to file download without launching a broken modal preview.
  - Closing the modal cleanly returns focus to the parent resource section.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not delete `NoticePdfViewerModal` or `OpportunityDocViewerModal` yet (handled in Phase 2). Do not redesign `DocumentViewerModal.jsx`.

---

## PHASE 2: Shared Component Consolidation & Dead Code Cleanup

**Goal:** Consolidate document viewing into the canonical MD-08 component, safely remove verified dead duplicate files, and standardize local storage key naming with backwards compatibility.

### - [ ] P2-T01: Migrate Notice Reader to Canonical DocumentViewerModal
- **Task ID:** P2-T01
- **Title:** Migrate Notice Reader to Canonical DocumentViewerModal
- **Size:** SMALL
- **Objective:** Replace the localized `NoticePdfViewerModal.jsx` inside the Notice Reader page with the shared `DocumentViewerModal.jsx`.
- **Current State:** `frontend/components/notices/details/NoticeReaderAssembler.jsx` imports and renders `NoticePdfViewerModal.jsx`, duplicating features already present in the shared `DocumentViewerModal.jsx`.
- **Scope:**
  - `frontend/components/notices/details/NoticeReaderAssembler.jsx`
  - `frontend/components/notices/details/NoticeDocumentReader.jsx`
- **Dependencies:** P1-T04 must be verified.
- **Implementation Requirements:**
  1. In `NoticeReaderAssembler.jsx`, replace the import of `./NoticePdfViewerModal` with `@/components/shared/DocumentViewerModal`.
  2. Adapt props passed to `DocumentViewerModal` (title, fileUrl, fileType, department, referenceNumber).
  3. Ensure the notice letterhead embed and "View Full Screen Document" buttons trigger the shared viewer.
- **Acceptance Criteria:**
  - Clicking "Preview Document" or fullscreen on any notice circular opens the shared `DocumentViewerModal`.
  - Zoom, print, download, and close interactions operate flawlessly.
  - `NoticePdfViewerModal` is no longer imported by `NoticeReaderAssembler.jsx`.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not delete `NoticePdfViewerModal.jsx` yet (handled in P2-T03). Do not alter notice text or letterhead layout.

---

### - [ ] P2-T02: Migrate Opportunity Details to Canonical DocumentViewerModal
- **Task ID:** P2-T02
- **Title:** Migrate Opportunity Details to Canonical DocumentViewerModal
- **Size:** SMALL
- **Objective:** Replace the localized `OpportunityDocViewerModal.jsx` in the Opportunity Details module with the shared `DocumentViewerModal.jsx`.
- **Current State:** `frontend/components/internships/details/OpportunityDetailsAssembler.jsx` imports and renders `OpportunityDocViewerModal.jsx` for viewing internship brochures and guidelines.
- **Scope:**
  - `frontend/components/internships/details/OpportunityDetailsAssembler.jsx`
  - `frontend/components/internships/details/OpportunityDocuments.jsx`
- **Dependencies:** P2-T01 must be verified.
- **Implementation Requirements:**
  1. In `OpportunityDetailsAssembler.jsx`, replace the import of `./OpportunityDocViewerModal` with `@/components/shared/DocumentViewerModal`.
  2. Map opportunity document metadata (title, company name, brochure URL, file type) to `DocumentViewerModal`.
  3. Verify that brochure preview actions trigger the modal cleanly.
- **Acceptance Criteria:**
  - Clicking any internship brochure or hackathon rulebook opens `DocumentViewerModal`.
  - `OpportunityDocViewerModal` has 0 remaining active imports.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not delete `OpportunityDocViewerModal.jsx` yet (handled in P2-T03). Do not touch internship apply modals.

---

### - [ ] P2-T03: Safely Remove Deprecated Localized Document Viewers
- **Task ID:** P2-T03
- **Title:** Safely Remove Deprecated Localized Document Viewers
- **Size:** SMALL
- **Objective:** Delete the redundant, superseded viewer components after verifying zero active consumers.
- **Current State:** `NoticePdfViewerModal.jsx` and `OpportunityDocViewerModal.jsx` remain in the filesystem despite being fully replaced by `DocumentViewerModal.jsx`.
- **Scope:**
  - `frontend/components/notices/details/NoticePdfViewerModal.jsx` (delete)
  - `frontend/components/internships/details/OpportunityDocViewerModal.jsx` (delete)
- **Dependencies:** P2-T01 and P2-T02 must be complete and committed.
- **Implementation Requirements:**
  1. Run a grep search across `frontend/` to confirm zero remaining imports of `NoticePdfViewerModal` and `OpportunityDocViewerModal`.
  2. Delete `frontend/components/notices/details/NoticePdfViewerModal.jsx`.
  3. Delete `frontend/components/internships/details/OpportunityDocViewerModal.jsx`.
  4. Ensure other legitimate specialized viewer components (such as media lightbox or transcript modal) are untouched.
  5. Run build verification.
- **Acceptance Criteria:**
  - `NoticePdfViewerModal.jsx` and `OpportunityDocViewerModal.jsx` are confirmed to have zero active imports and are deleted from disk.
  - All migrated notice and opportunity document preview interactions continue functioning via canonical `DocumentViewerModal`.
  - Zero import or bundling errors occur.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not delete any other viewer or modal files. Do not modify other files in `notices/` or `internships/`.

---

### - [ ] P2-T04: Safely Remove 6 Orphaned Dead Files in Saved Items Module
- **Task ID:** P2-T04
- **Title:** Safely Remove 6 Orphaned Dead Files in Saved Items Module
- **Size:** SMALL
- **Objective:** Delete the 6 verified orphaned duplicate files left in `frontend/components/saved/` from previous iterations.
- **Current State:** The audit confirmed these 6 files have 0 imports and are shadowed by canonical components:
  1. `SavedCollectionsModal.jsx` (shadowed by `ManageCollectionsModal.jsx`)
  2. `SavedHeader.jsx` (shadowed by `SavedItemsHeader.jsx`)
  3. `SavedSearchFilterBar.jsx` (shadowed by `SavedFilterBar.jsx`)
  4. `SavedRightSidebar.jsx` (shadowed by `SavedSidebarRail.jsx`)
  5. `SavedSummaryMetrics.jsx` (shadowed by `SavedSummaryCards.jsx`)
  6. `savedItemsData.js` (shadowed by `savedItemData.js` and `savedItemsStore.js`)
- **Scope:** `frontend/components/saved/`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Verify zero external imports for each of the 6 target files.
  2. Delete the 6 files:
     - `frontend/components/saved/SavedCollectionsModal.jsx`
     - `frontend/components/saved/SavedHeader.jsx`
     - `frontend/components/saved/SavedSearchFilterBar.jsx`
     - `frontend/components/saved/SavedRightSidebar.jsx`
     - `frontend/components/saved/SavedSummaryMetrics.jsx`
     - `frontend/components/saved/savedItemsData.js`
  3. Verify that `/student/saved` still renders and compiles cleanly.
- **Acceptance Criteria:**
  - All 6 orphaned files are deleted.
  - `SavedItemsAssembler.jsx` continues to operate without missing dependencies.
  - `npm run build` passes with zero errors.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not modify `SavedItemsAssembler.jsx`, `savedItemData.js`, or `savedItemsStore.js`.

---

### - [ ] P2-T05: Normalize Profile LocalStorage Key with Migration Fallback
- **Task ID:** P2-T05
- **Title:** Normalize Profile LocalStorage Key with Migration Fallback
- **Size:** SMALL
- **Objective:** Standardize the profile storage key to `college_os_profile_v1` while preserving user data from the legacy `collegeos_student_profile_edit` key across all consumer components.
- **Current State:** Profile state uses `collegeos_student_profile_edit` without standard underscores or versioning. `Profile.jsx` and `PublicStudentProfileAssembler.jsx` read this directly, while `editProfileData.js` exports helpers used by `Navbar.jsx` and `UserProfileDropdown.jsx`.
- **Scope:**
  - `frontend/components/profile/edit/editProfileData.js`
  - `frontend/components/profile/Profile.jsx`
  - `frontend/components/profile/public/PublicStudentProfileAssembler.jsx`
  - `frontend/components/layout/Navbar.jsx`
  - `frontend/components/layout/UserProfileDropdown.jsx`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Inspect all 5 known consumers: `editProfileData.js`, `Profile.jsx`, `PublicStudentProfileAssembler.jsx`, `Navbar.jsx`, and `UserProfileDropdown.jsx`.
  2. In `editProfileData.js`, define canonical key `export const PROFILE_STORAGE_KEY = "college_os_profile_v1";` and legacy key `const LEGACY_PROFILE_KEY = "collegeos_student_profile_edit";`.
  3. In `loadProfileEditState()`, check `college_os_profile_v1` first. If null, check `collegeos_student_profile_edit`. If legacy data is found, migrate it to `college_os_profile_v1` and return it. Do NOT delete legacy data prematurely to ensure safe rollback.
  4. In `saveProfileEditState()`, write to canonical key.
  5. Refactor direct `localStorage.getItem` reads in `Profile.jsx` and `PublicStudentProfileAssembler.jsx` to call `loadProfileEditState()` rather than raw string access.
  6. Dispatch `college_os_profile_updated` on save so Navbar and Profile stay synchronized.
- **Acceptance Criteria:**
  - All existing profile customizations stored under `collegeos_student_profile_edit` are preserved and accessible under `college_os_profile_v1`.
  - Zero data loss occurs upon page reload or browser restart.
  - All 5 profile consumer components read and write through the canonical storage layer.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not change profile layout, do not alter avatar uploads, do not modify peer connection stores.

---

## PHASE 3: Missing Catalog & Curricular Completeness

**Goal:** Implement the missing Course/Subject Catalog page using real existing subject data across semesters to satisfy the Academics "View All Subjects" action.

### - [ ] P3-T01: Build All Subjects Catalog Page (`/student/academics/subjects`)
- **Task ID:** P3-T01
- **Title:** Build All Subjects Catalog Page (`/student/academics/subjects`)
- **Size:** MEDIUM
- **Objective:** Create the aggregate Course/Subject Catalog page using real existing academic course data, replacing the placeholder toast on `/student/academics` with a functional catalog browser.
- **Current State:** Clicking "View All Subjects" in `CurrentSemesterSubjectsCard.jsx` triggers a toast saying "Full subject catalog will be available in a future update." The route `/student/academics/subjects` returns a 404.
- **Scope:**
  - Create: `frontend/app/student/academics/subjects/page.jsx`
  - Create: `frontend/app/student/academics/subjects/loading.jsx`
  - Create: `frontend/components/academics/catalog/SubjectCatalogAssembler.jsx`
  - Create: `frontend/components/academics/catalog/SubjectCatalogHeader.jsx`
  - Create: `frontend/components/academics/catalog/SubjectCatalogFilters.jsx`
  - Create: `frontend/components/academics/catalog/SubjectCatalogGrid.jsx`
  - Create: `frontend/components/academics/catalog/subjectCatalogData.js`
  - Modify: `frontend/components/academics/CurrentSemesterSubjectsCard.jsx`
  - Modify: `frontend/components/academics/Academics.jsx`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Follow the **Page → Assembler → Components** architecture per `docs/AI_INSTRUCTIONS.md`.
  2. **REUSE REAL DATA ONLY — ZERO FABRICATION:**  
     - Source all subject records directly from `SUBJECT_DETAILS_MAP` in `components/academics/subject-details/subjectDetailsData.js` and `CURRENT_SEMESTER_SUBJECTS` in `academicsData.js` (including `CSE-302-dsa`, `CSE-101-web`, `CSE-302-dbms`, `Lab-2-networks`, `Lab-1-web`, `CSE-401-cloud`).
     - Do NOT invent arbitrary placeholder courses, fake course codes, fake departments, or fake units merely to populate empty semester tabs.
     - Expose filterable dimensions (Semester, Type: Theory/Lab, Department) that strictly match the existing mock metadata.
  3. Include semester filter tabs matching the available datasets, search bar, and course type toggles.
  4. Render subject cards displaying code, name, department, credits, and a "View Course Details" button linking to the canonical detail route: `/student/academics/subjects/[code]`.
  5. In `Academics.jsx`, change `onViewAllSubjects` from showing a toast to `router.push("/student/academics/subjects")`.
  6. Support light/dark theme, responsive mobile grid, and empty search state.
- **Acceptance Criteria:**
  - Navigating to `/student/academics/subjects` renders the complete catalog of existing courses.
  - Clicking "View All Subjects" on `/student/academics` navigates cleanly to `/student/academics/subjects`.
  - Clicking any subject card navigates to `/student/academics/subjects/[code]`.
  - Zero fabricated course records are added to the academic model.
  - Production build compiles the new route statically (`○ /student/academics/subjects`).
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not alter the Subject Details page (`/student/academics/subjects/[code]`). Do not invent new semesters or courses.

---

## PHASE 4: Missing Sub-Page SP-07 (Security & Connected Accounts UI)

**Goal:** Implement the missing sub-page SP-07 (`/student/settings/security`) strictly as a frontend local-state experience, providing account security, 2FA, session visibility, and OAuth connection cards without backend services.

### - [ ] P4-T01: Scaffold SP-07 Route & Security Assembler Architecture
- **Task ID:** P4-T01
- **Title:** Scaffold SP-07 Route & Security Assembler Architecture
- **Size:** SMALL
- **Objective:** Create the route structure, loading skeleton, and master assembler for `/student/settings/security`, labeled clearly as local demo state with zero fabricated security telemetry.
- **Current State:** `frontend/app/student/settings/security` does not exist (returns 404).
- **Scope:**
  - Create: `frontend/app/student/settings/security/page.jsx`
  - Create: `frontend/app/student/settings/security/loading.jsx`
  - Create: `frontend/components/settings/security/SecurityAssembler.jsx`
  - Create: `frontend/components/settings/security/SecurityHeader.jsx`
  - Create: `frontend/components/settings/security/SecuritySkeleton.jsx`
  - Create: `frontend/components/settings/security/securityData.js`
- **Dependencies:** None.
- **Implementation Requirements:**
  1. Thin `page.jsx` with metadata (`Security & Connected Accounts - College OS`) rendering `SecurityAssembler`.
  2. Implement breadcrumb navigation (`Settings > Security & Connected Accounts`).
  3. Create demo-safe seed dataset in `securityData.js`:
     - 2FA status (`enabled: false`)
     - Password metadata with ZERO fabricated history: `lastChanged: null` and status notice `"Demo state — authentication backend not connected"` (or `"No real authentication/security data available"`). Do NOT make the UI appear to know the user's real password history, security history, login history, or account state.
     - Active login sessions labeled explicitly as `"Demo Session (This Device)"` and `"Local Mobile Demo"` (Platform: Windows / Android, Browser: Chrome, Status: `"Active Demo Session"`).
     - Connected accounts (Google, GitHub, LinkedIn, Microsoft — all defaulted to `"Not Connected"`).
  4. Ensure prominent disclaimer: `"Local Demo Mode: Security settings, credentials, and session states are simulated locally within this browser session. No authentication backend is connected."`
  5. Ensure light/dark mode tokens and responsive shell layout.
- **Acceptance Criteria:**
  - Direct navigation to `/student/settings/security` renders the page shell without errors.
  - Loading skeleton matches existing settings pages.
  - Clear local demo indicator and backend-not-connected notice are present.
  - Password metadata reflects demo state (`lastChanged: null`) with no invented history.
  - `npm run build` generates the route statically.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not wire interactive forms yet (handled in P4-T02 and P4-T03). Do not connect real backend auth.

---

### - [ ] P4-T02: Build 2-Factor Authentication & Password Management UI (Demo Simulation)
- **Task ID:** P4-T02
- **Title:** Build 2-Factor Authentication & Password Management UI (Demo Simulation)
- **Size:** MEDIUM
- **Objective:** Implement interactive frontend UI for Two-Factor Authentication setup walkthrough and password management using client-side validation only, with explicit demo-safe messaging.
- **Current State:** 2FA in `SecurityRegionCard.jsx` has a static "Coming Soon" badge. Password change only exists as a basic modal in `SettingsModals.jsx`.
- **Scope:**
  - Create: `frontend/components/settings/security/TwoFactorAuthCard.jsx`
  - Create: `frontend/components/settings/security/TwoFactorSetupModal.jsx`
  - Create: `frontend/components/settings/security/PasswordManagementCard.jsx`
  - Modify: `frontend/components/settings/security/SecurityAssembler.jsx`
- **Dependencies:** P4-T01 must be complete.
- **Implementation Requirements:**
  1. **TwoFactorAuthCard:** Display 2FA status toggle. Clicking "Enable 2FA" opens `TwoFactorSetupModal`.
  2. **TwoFactorSetupModal (Simulated Local UI):** 3-step walkthrough:
     - Step 1: Simulated QR code graphic with demo secret key copy button.
     - Step 2: 6-digit OTP verification input with auto-advance (accepts demo codes; client-side simulation only).
     - Step 3: Generated 8 demo recovery backup codes with "Copy All" and "Download TXT" actions.
     - Clearly label: `"Simulated Local UI — no real authenticator service is contacted and the account is not truly protected by 2FA."`
  3. **PasswordManagementCard (Client-side Only):**
     - Inputs: Current password, new password with dynamic strength meter (characters, digits, symbols), confirm password input, and save action.
     - Validation: Perform client-side validation only (minimum 8 characters, confirmation matching).
     - **STRICT DEMO SAFETY:**
       - No backend update.
       - No API call.
       - No password persistence.
       - No plaintext password storage.
       - No fake production authentication behavior.
       - Do NOT use wording such as `"Password updated successfully"` as if a real account password was changed.
       - Use clearly demo-safe wording: `"Demo password update validated locally (UI demo — no real password was changed)"`.
  4. Store 2FA enabled boolean in `localStorage` under `college_os_security_settings_v1`.
  5. Provide toast notifications using demo-safe wording for successful local state changes.
- **Acceptance Criteria:**
  - Completing the 2FA setup updates the toggle to "Enabled (Demo)" and updates local state.
  - Password form performs client-side validation without storing raw credentials or calling any backend.
  - Success feedback explicitly states that the password update was a local UI demo.
  - Modal and cards clearly indicate that 2FA and password management are simulated local UI experiences.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** DO NOT integrate real authenticator APIs (Google Authenticator / Twilio). DO NOT hash passwords on a server. Frontend local mock state only.

---

### - [ ] P4-T03: Build Active Login Sessions & Connected Accounts UI (Demo State)
- **Task ID:** P4-T03
- **Title:** Build Active Login Sessions & Connected Accounts UI (Demo State)
- **Size:** MEDIUM
- **Objective:** Implement demo session cards with local revoke actions, and connected accounts cards with all providers defaulted to "Not Connected", without fabricated security telemetry.
- **Current State:** No UI exists for viewing active devices or managing external connected accounts.
- **Scope:**
  - Create: `frontend/components/settings/security/ActiveSessionsCard.jsx`
  - Create: `frontend/components/settings/security/ConnectedAccountsCard.jsx`
  - Create: `frontend/components/settings/security/RevokeSessionModal.jsx`
  - Create: `frontend/components/settings/security/SecurityAuditLogCard.jsx`
  - Modify: `frontend/components/settings/security/SecurityAssembler.jsx`
- **Dependencies:** P4-T02 must be complete.
- **Implementation Requirements:**
  1. **ActiveSessionsCard:**
     - List session cards labeled strictly as mock/local UI state:
       - `"Demo Session (This Device)"` (Browser: Chrome, Platform: Windows, Status: `"Active Demo Session"`)
       - `"Local Mobile Demo"` (Browser: Mobile Safari, Platform: iOS / Android, Status: `"Active Demo Session"`)
     - **NO FAKE SECURITY TELEMETRY:**
       - Do NOT invent or display realistic fake IP addresses (e.g. 192.168.x.x, 203.0.113.x).
       - Do NOT invent fake geographic locations (e.g. "San Francisco, CA", "New Delhi, IN").
       - Do NOT invent exact fake login timestamps presented as real history.
       - Do NOT invent device fingerprints or fake session IDs.
     - Include "Revoke Session" button with confirmation modal that removes the session card from local React state.
     - Clearly state in UI: `"Revoking a demo session removes it from this local preview only; no server-side session invalidation occurs."`
  2. **ConnectedAccountsCard:** Render 4 provider rows:
     - Google — `"Not Connected"`
     - GitHub — `"Not Connected"`
     - LinkedIn — `"Not Connected"`
     - Microsoft / Office 365 — `"Not Connected"`
  3. **DEFAULT TO "NOT CONNECTED":** All 4 providers must initialize as `"Not Connected"`. Do NOT assume or fabricate a connected institutional email or provider profile.
  4. Clicking "Connect" opens an explicitly local/demo confirmation dialog and toggles status to `"Connected (Demo)"`.
  5. Clicking "Disconnect" prompts for confirmation and reverts status to `"Not Connected"`.
  6. Store connection preferences in `localStorage` under `college_os_connected_accounts_v1`.
  7. **SecurityAuditLogCard:** Chronological list of demo events labeled as simulated (e.g. `"Local demo session initialized"`, `"Demo 2FA walkthrough completed"`).
- **Acceptance Criteria:**
  - All 4 provider accounts initialize in "Not Connected" state.
  - Zero fabricated IP addresses, geolocations, or realistic telemetry are rendered.
  - Toggling connect/disconnect updates local demo state with toast feedback; zero external OAuth network requests are dispatched.
  - Revoking a demo session removes it from the list with explicit disclaimer that no server session was invalidated.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** DO NOT invoke external OAuth popups or real redirect callbacks. Strictly simulated UI state.

---

### - [ ] P4-T04: Wire Settings Hub to Dedicated SP-07 Security Page
- **Task ID:** P4-T04
- **Title:** Wire Settings Hub to Dedicated SP-07 Security Page
- **Size:** SMALL
- **Objective:** Connect the Security & Privacy card in `/student/settings` directly to the new `/student/settings/security` sub-page.
- **Current State:** In `frontend/components/settings/SecurityRegionCard.jsx`, 2FA displays "Coming Soon" and action items trigger local modals instead of deep linking.
- **Scope:**
  - `frontend/components/settings/SecurityRegionCard.jsx`
  - `frontend/components/settings/Settings.jsx`
- **Dependencies:** P4-T03 must be complete and committed.
- **Implementation Requirements:**
  1. In `SecurityRegionCard.jsx`, replace the static "Coming Soon" badge on Two-Factor Authentication with a clickable link pointing to `/student/settings/security`.
  2. Add a prominent "Manage Full Security & Connected Accounts" button linking to `/student/settings/security`.
  3. Ensure existing inline modals (e.g. quick password change) still work if clicked, but also link out to the full sub-page.
- **Acceptance Criteria:**
  - Clicking "Manage Security" or 2FA in Settings navigates directly to `/student/settings/security`.
  - User can seamlessly navigate back to Settings via breadcrumbs.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *STOP AFTER THIS TASK. USER MUST REVIEW AND COMMIT BEFORE NEXT TASK.*
- **Out of Scope:** Do not redesign `Settings.jsx` or appearance options.

---

## PHASE 5: Comprehensive Frontend QA & Verification

**Goal:** Conduct a strict, zero-code-modification verification pass across the entire completed student frontend surface area.

### - [ ] P5-T01: Comprehensive Frontend Quality Assurance & Verification
- **Task ID:** P5-T01
- **Title:** Comprehensive Frontend Quality Assurance & Verification
- **Size:** SMALL
- **Objective:** Validate that all routes compile, all audited flows operate without broken links or placeholder toasts, and desktop/mobile responsiveness remains 100% intact, distinguishing code-level verification from browser testing availability.
- **Current State:** All planned features, fixes, and consolidations from Phases 1–4 are implemented.
- **Scope:** Repository-wide audit inspection (read-only verification).
- **Dependencies:** All mandatory tasks P1-T01 through P4-T04 must be completed and committed.
- **Implementation Requirements:**
  1. **Build Verification:** Run `npm run build` inside `frontend/` and confirm exit code 0 with zero compilation errors across all static and dynamic routes.
  2. **Source/Code Link Verification:** Verify via code inspection and ripgrep that zero dead links (`/student/dashboard`, non-prefixed `/academics`, etc.) or orphaned files remain.
  3. **Verification of Primary Routes:**
     - `/student`
     - `/student/academics`
     - `/student/academics/subjects`
     - `/student/academics/subjects/[code]`
     - `/student/academics/grade-card`
     - `/student/academics/timetable`
     - `/student/assignments`
     - `/student/assignments/[id]`
     - `/student/campus-ai`
     - `/student/events`
     - `/student/events/[id]`
     - `/student/feed`
     - `/student/feed/[id]`
     - `/student/feed/groups/[id]`
     - `/student/internships`
     - `/student/internships/[id]`
     - `/student/internships/applications`
     - `/student/internships/resume-builder`
     - `/student/lost-and-found`
     - `/student/lost-and-found/my-reports`
     - `/student/notices`
     - `/student/notices/[id]`
     - `/student/notifications`
     - `/student/profile`
     - `/student/profile/[id]`
     - `/student/profile/edit`
     - `/student/projects`
     - `/student/projects/[id]`
     - `/student/saved`
     - `/student/search`
     - `/student/settings`
     - `/student/settings/security`
  4. **Modals & Overlays Code Verification:**
     - MD-01 Command Palette (`⌘K`)
     - MD-02 Notification Quick Panel
     - MD-03 User Profile Dropdown
     - MD-04 Edit Project Modal
     - MD-05 Submission History Modal
     - MD-06 Peer Direct Message / Connect Modal
     - MD-07 Claim Item Verification Modal (wired from Lost & Found cards and My Reports)
     - MD-08 Document Viewer Modal (wired from Assignments, Course resources, Notices, Internships)
     - MD-09 Mobile Filter Drawers (all 10 drawers)
  5. **Environment Disclosure:** Explicitly document whether verification was conducted via Next.js production build compiler and code-level inspection, or via interactive browser sessions. Do not make unsupported automated browser test claims if headless testing suites are absent.
- **Acceptance Criteria:**
  - Production build produces exit code 0.
  - All audited flows have verified canonical destinations.
  - Final QA checklist signed off.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *FINAL SIGN-OFF. MAIN FRONTEND COMPLETION MILESTONE REACHED.*
- **Out of Scope:** DO NOT write new code during this QA task. If a bug is discovered, document it as a separate follow-up task.

---

## OPTIONAL PHASE 6: Post-Audit Community Enhancement

> [!NOTE]
> **Optional Scope Notice:**  
> The original audit ([student_ui_audit.md](file:///c:/Users/INFINIX/OneDrive/Desktop/Major%20Project/collage-os/docs/student_ui_audit.md)) designated **FP-12** specifically as the individual Club Hub (`/student/feed/groups/[id]`), which is already 100% complete. Community discovery is already fulfilled via `JoinCommunityModal.jsx` and `/student/search?type=communities`.  
> Therefore, this task is **OPTIONAL** and **DOES NOT BLOCK** the main frontend completion milestone.

### - [ ] OPT-T01: Build Community Groups Directory Hub (`/student/feed/groups`)
- **Task ID:** OPT-T01
- **Title:** Build Community Groups Directory Hub (`/student/feed/groups`)
- **Classification:** OPTIONAL — DOES NOT BLOCK MAIN FRONTEND COMPLETION
- **Size:** MEDIUM
- **Objective:** Provide a dedicated standalone directory route for browsing all campus student societies and clubs.
- **Current State:** Navigating to `/student/feed/groups` returns a 404. Discovery is handled by `JoinCommunityModal.jsx` on `/student/feed`.
- **Scope:**
  - Create: `frontend/app/student/feed/groups/page.jsx`
  - Create: `frontend/app/student/feed/groups/loading.jsx`
  - Create: `frontend/components/campus-feed/groups/directory/CommunityDirectoryAssembler.jsx`
  - Create: `frontend/components/campus-feed/groups/directory/CommunityDirectoryHero.jsx`
  - Create: `frontend/components/campus-feed/groups/directory/CommunityDirectoryGrid.jsx`
  - Modify: `frontend/components/campus-feed/JoinCommunityModal.jsx` (add "View Full Directory" link)
- **Dependencies:** None (can be executed at any time after Phase 5).
- **Implementation Requirements:**
  1. Follow the **Page → Assembler → Components** architecture.
  2. Source data directly from `ALL_COMMUNITIES` in `communityGroupData.js` (zero duplicate data).
  3. Include category filters (Technology, Robotics, Arts & Culture, Sports, Academics), search bar, and membership status toggles.
  4. Connect cards to `/student/feed/groups/[id]`.
- **Acceptance Criteria:**
  - `/student/feed/groups` compiles and displays all existing campus communities.
  - Joining/leaving a group updates `college_os_communities_membership_v1`.
- **Build / Validation:** Run `npm run build` inside `frontend/`.
- **Commit Checkpoint:**  
  *OPTIONAL TASK COMPLETE. USER COMMITS INDEPENDENTLY.*
- **Out of Scope:** Do not touch individual club detail hubs (`/student/feed/groups/[id]`).

---

## 4. Plan Summary

```text
TOTAL PHASES:            6 (5 Mandatory + 1 Optional)
TOTAL TASKS:             16 (15 Mandatory + 1 Optional)

MANDATORY BREAKDOWN:
Phase 1 (Core Correctness & Modal Integrations):      4 tasks (P1-T01 to P1-T04)
Phase 2 (Consolidation & Dead Code Cleanup):          5 tasks (P2-T01 to P2-T05)
Phase 3 (Missing Catalog & Curricular Completeness):  1 task  (P3-T01)
Phase 4 (Missing Sub-Page SP-07 Security):            4 tasks (P4-T01 to P4-T04)
Phase 5 (Comprehensive Frontend QA & Verification):   1 task  (P5-T01)
-------------------------------------------------------------------------
TOTAL MANDATORY TASKS:                                15 tasks

OPTIONAL BREAKDOWN:
Optional Phase 6 (Post-Audit Community Enhancement):  1 task  (OPT-T01)
-------------------------------------------------------------------------
TOTAL OPTIONAL TASKS:                                 1 task

FIRST TASK TO EXECUTE:
P1-T01 (Fix Notification Center Canonical Dashboard Route)

NEXT TASK AFTER USER COMMIT:
P1-T02 (Fix Event ID Mismatch Across Notifications and Feed)
```
