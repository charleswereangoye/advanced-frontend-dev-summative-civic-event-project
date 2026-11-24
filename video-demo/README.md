# CivicEvents+ Video Demonstration Guide

This directory contains the submission details, video demonstration link, and walkthrough checklist for the **CivicEvents+** frontend web application.

---

## 1. Video Submission Link

- **Video Demonstration URL:** `[INSERT YOUR YOUTUBE / LOOM / GOOGLE DRIVE LINK HERE]`
- **Video Duration:** ~5–7 minutes
- **Resolution:** 1080p Full HD
- **Audio:** Clear voiceover commentary explaining features and role-based access control.

---

## 2. 5–7 Minute Walkthrough Script & Timing Checklist

Follow this structured script when recording your demonstration video to cover all rubric requirements:

### Part 1: Project Overview & Design System (0:00 – 1:00)
- **Goal:** Introduce the portal, tech stack, and design fidelity.
- **Talking Points:**
  - Introduce the application: *CivicEvents+ - Accessible City Events & Services Portal*.
  - Explain the frontend stack: Pure semantic HTML5, Tailwind CSS via CDN, and jQuery 3.7.1 communicating with the Node.js/Express + PostgreSQL backend.
  - Highlight the Figma design system alignment:
    - 60-30-10 color rule with high-contrast slate background (`#F8FAFC`), crisp white cards, and Civic Blue (`#2563EB`) accent.
    - Responsive 80px fixed header with civic building SVG logo, search bar, and notification drawer.

### Part 2: Resident / Standard User Journey (1:00 – 3:15)
- **Goal:** Demonstrate public browsing, registration, multimedia consumption, and profile self-management.
- **Talking Points & Actions:**
  1. **Registration & Login (`signup.html` & `login.html`):**
     - Show the live password strength meter and form validation.
     - Demonstrate signing in with "Remember Me" checked to show persistent storage handling.
  2. **Events Hub (`index.html`):**
     - Demonstrate real-time search, date filtering, and category selection.
     - Show pagination and the responsive 3-column card grid with contextual event photos.
  3. **Event Details & Attendance (`event-detail.html`):**
     - Click an event to view the 2-column layout and the Google Maps directions link.
     - Click **Register for Event**; show immediate status update to "Confirmed".
     - Submit a 5-star rating with a comment; show the review render instantly in the feedback stream.
  4. **Media Hub (`announcements.html` & `promos.html`):**
     - Navigate to **Audio Announcements**: Play an audio bulletin, demonstrate the custom scrubber, forward/rewind controls, volume slider, and open the audio transcript drawer.
     - Navigate to **Video Promos**: Click a video card to open the accessible modal. Highlight the WebVTT closed captions `<track>` rendering subtitle text on screen.
  5. **My Registrations & Profile (`my-registrations.html` & `profile.html`):**
     - Open **My Registrations**: Show the newly registered event under the "Confirmed" tab.
     - Click **Cancel Registration**; confirm the cancellation modal and observe the status switch to "Cancelled".
     - Open **My Profile**: Update the user's full name, click **Save Changes**, and highlight the immediate synchronization in the top navbar avatar. Point out that the role and status fields are read-only to protect RBAC integrity.

### Part 3: Civic Administrator Journey & RBAC Guards (3:15 – 5:30)
- **Goal:** Showcase administrative features, role-based conditional rendering, and backend security.
- **Talking Points & Actions:**
  1. **Admin Login & Dashboard Navigation (`dashboard.html`):**
     - Log in with the administrator account.
     - Point out the **Dashboard** link now rendered in the navigation bar.
     - Open the Admin Dashboard: showcase the 4 summary metrics cards (Total Events, Active Registrations, Published Promos, Total Citizens).
     - Showcase the 6-month interactive activity growth chart powered by Chart.js.
  2. **User Management Table:**
     - Scroll through the paginated citizen user list.
     - Demonstrate toggling an account's status (**Disable User** / **Enable User**).
     - Point out that role modification is strictly disabled to prevent unauthorized privilege escalation.
  3. **Event Management (`index.html` & `event-detail.html`):**
     - Show that the **Create Event** button is now visible in the hero banner.
     - Open the modal, fill in details, choose an image, and create a live civic event.
     - Navigate to `event-detail.html`: show the **Admin Attendee Roster** card displaying all registered attendee emails.
  4. **Announcements & Promos Management:**
     - Open `announcements.html` and show the **Upload Announcement** modal.
     - Open `promos.html` and show the **Upload Video Promo** modal.
  5. **Notification Management:**
     - Click the notification bell in the top navbar.
     - Demonstrate deleting a broadcast notification using the administrator trash icon.

### Part 4: Code Quality & Rubric Summary (5:30 – 6:30)
- **Goal:** Briefly summarize technical achievements.
- **Talking Points:**
  - Zero framework dependencies (strictly standard HTML5 + Tailwind + jQuery).
  - Explicit client-side page guards preventing citizens from reaching `dashboard.html`.
  - Graceful token expiration handling via central 401 interceptor in `api.js`.
  - Accessible design adhering to WCAG contrast standards, keyboard navigable controls, and WebVTT captions.

---

## 3. Rubric Compliance Verification

| Rubric Requirement | Status | Where Demonstrated |
|---|---|---|
| **Semantic HTML5 & Responsive CSS** | ✅ Completed | All 9 pages using Tailwind CSS and Inter typography. |
| **Vanilla JS / jQuery 3.7.1 (No React/Vue)** | ✅ Completed | Entire application built strictly with jQuery 3.7.1. |
| **Figma Visual Design Adherence** | ✅ Completed | Exact 60-30-10 palette, 80px header, custom cards, SVG logo. |
| **Role-Based Access Control (RBAC)** | ✅ Completed | `Auth.isAdmin()` guards, conditional controls, admin dashboard. |
| **Media Player & WebVTT Closed Captions** | ✅ Completed | Custom audio controls in `announcements.html`; `<track>` in `promos.html`. |
| **Complete Backend API Integration** | ✅ Completed | REST endpoints for auth, events, registrations, feedback, and media. |
| **Documentation & Git Workflow** | ✅ Completed | Feature branch per screen, `frontend/README.md`, video checklist. |