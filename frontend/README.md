# CivicEvents+ Frontend Documentation

CivicEvents+ is an accessible, modern web portal designed for city residents and civic administrators. It provides a centralized hub to discover upcoming public events, register attendance, stream multimedia announcements, and manage community activities.

Built for the **Advanced Frontend Development Summative Assessment**, this project strictly follows university rubric guidelines, utilizing **semantic HTML5**, **Tailwind CSS (via CDN)**, and **jQuery 3.7.1** for DOM manipulation and asynchronous API communication with a Node.js/Express and PostgreSQL backend.

---

## 1. Technology Stack & Design System

### Core Technologies
- **Markup:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<figure>`, `<audio>`, `<video>`).
- **Styling:** Tailwind CSS (loaded via CDN) adhering to the custom design tokens from the course Figma design file (`#F8FAFC` slate background, `#2563EB` brand accent).
- **DOM & State Management:** jQuery 3.7.1 for event handling, dynamic rendering, AJAX transactions, and accessible drawer/modal controls.
- **Charts:** Chart.js 4.4.1 for interactive dashboard analytics.
- **Media Accessibility:** Native HTML5 audio with custom controls, and HTML5 video with WebVTT closed captions (`<track kind="captions">`).

### Design Guidelines & Figma Alignment
The interface follows the 60-30-10 color rule and high-contrast accessibility standards:
- **60% Dominant Canvas:** Slate background (`#F8FAFC`) with crisp white card containers (`#FFFFFF`).
- **30% Structural Elements:** Dark slate typography (`#0F172A`), muted labels (`#64748B`), and borders (`#E2E8F0`).
- **10% Interactive Accent:** Civic Blue (`#2563EB` / `#1D4ED8`) for primary CTAs, active tab indicators, and badges.
- **Typography:** Inter (Google Fonts) with explicit font weights (400, 500, 600, 700, 800) for visual hierarchy.

---

## 2. Role-Based Access Control (RBAC) Architecture

The application enforces a dual-tier authorization model: **Admin** and **Normal User (Resident)**.

### Client-Side RBAC Architecture
```
┌────────────────────────────────────────────────────────┐
│                   Auth Module (auth.js)                │
│  - getToken()            - getUser()                   │
│  - isAuthenticated()     - isAdmin()                   │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   [Public/Resident View]        [Administrator View]
   - Browse Events               - All Resident Features
   - Register / Cancel Seats     - Admin Dashboard (Metrics & Charts)
   - Stream Audio Announcements  - Create / Edit / Delete Events
   - Stream Video Promos         - Post Audio Announcements
   - Submit Event Feedback       - Post Video Promos + WebVTT Captions
   - Manage Personal Profile     - Enable / Disable User Accounts
   - Read Notifications          - View Attendee Rosters & Broadcasts
```

### Key RBAC Implementation Highlights

1. **Session & Persistence Guards (`js/auth.js`):**
   - Stores session state in either `localStorage` ("Remember Me") or `sessionStorage` (single-session).
   - `Auth.isAuthenticated()`: Validates that a valid JWT token exists before allowing access to protected views (`profile.html`, `my-registrations.html`, `dashboard.html`).
   - `Auth.isAdmin()`: Confirms `user.role === 'admin'`.

2. **Route Guards on Protected Pages:**
   - In `dashboard.html`:
     ```javascript
     if (!Auth.isAuthenticated()) {
       window.location.replace('login.html');
     } else if (!Auth.isAdmin()) {
       window.location.replace('index.html'); // Citizens cannot view admin metrics
     }
     ```
   - In `profile.html` and `my-registrations.html`:
     ```javascript
     if (!Auth.isAuthenticated()) {
       window.location.replace('login.html');
     }
     ```

3. **Contextual UI Rendering (`js/components.js`):**
   - **Navbar:** Displays the **Dashboard** link and admin badge strictly when `Auth.isAdmin()` returns `true`.
   - **Notifications Drawer:** Displays the "Delete Notification" trash button only to administrators.
   - **Events Feed (`index.html`):** Renders "Create Event", "Edit", and "Delete" buttons exclusively for administrators.
   - **Event Detail (`event-detail.html`):** Renders the full attendee list roster and attendee count strictly for administrators.
   - **Announcements & Promos (`announcements.html`, `promos.html`):** Renders "Upload Audio Announcement" and "Upload Video Promo" modal triggers exclusively for administrators.
   - **Profile Settings (`profile.html`):** Displays assigned roles and account status as disabled, read-only badges to prevent privilege escalation from the client.

4. **Centralized API Token Interceptor (`js/api.js`):**
   - Automatically attaches `Authorization: Bearer <token>` to all HTTP requests.
   - Global 401 interceptor: When a token expires or is revoked, the client catches HTTP 401, clears storage, and redirects the user to `login.html`.

---

## 3. Screen Directory & Route Map

| Screen # | File | Route / Name | Access Level | Description |
|---|---|---|---|---|
| **1** | `signup.html` | `/signup.html` | Public | Account registration with live password strength meter and validation. |
| **2** | `login.html` | `/login.html` | Public | Sign in with email and password, "Remember Me" toggle, and role routing. |
| **3** | `js/components.js` | Global Header & Footer | Shared | 80px Figma header, unread notification drawer, avatar menu, and footer. |
| **4** | `index.html` | `/index.html` | Public / Admin | Hero banner, multi-criteria filters, 3-col card grid, and admin event modal. |
| **5** | `event-detail.html` | `/event-detail.html?id=:id` | Public / Admin | 2-column detail view, seat registration, 5-star feedback, and attendee roster. |
| **6** | `announcements.html` | `/announcements.html` | Public / Admin | Custom audio player with scrubber, transcript drawer, and admin upload modal. |
| **7** | `promos.html` | `/promos.html` | Public / Admin | Video grid, video player modal with WebVTT closed captions, and admin upload modal. |
| **8** | `dashboard.html` | `/dashboard.html` | Admin Only | Analytics dashboard, 6-month growth Chart.js chart, and user management table. |
| **9A**| `profile.html` | `/profile.html` | Authenticated | Personal information edit form, RBAC permission summary, and session synchronization. |
| **9B**| `my-registrations.html`| `/my-registrations.html` | Authenticated | Filterable event reservation list with live search and cancellation modal. |

---

## 4. Local Setup & Running Instructions

### Prerequisites
1. **Node.js (v18+)** and **PostgreSQL (v15+)** installed and running.
2. The backend service running locally (default: `http://localhost:5000` or `http://localhost:4000`).

### Step 1: Start the Backend API
Navigate to the `backend/` directory, configure environment variables in `.env`, and start the server:
```bash
cd backend
npm install
npm run start
```
Verify the backend responds on `http://localhost:5000/api` or `http://localhost:4000/api`.

### Step 2: Verify Frontend API Configuration
Open `frontend/js/config.js` and verify the `API_BASE_URL` points to your active backend port:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Step 3: Serve the Frontend
Because modern web browsers enforce CORS and security policies on WebVTT subtitle tracks and audio streams, serve the `frontend/` folder through a local HTTP server:

**Using Python (Recommended):**
```bash
cd frontend
python3 -m http.server 8000
```

**Using VS Code Live Server:**
Right-click on `frontend/index.html` and click **"Open with Live Server"**.

**Using Node `serve` or `http-server`:**
```bash
npx serve frontend -p 8000
```

Open your browser at `http://localhost:8000` to start exploring.

---

## 5. Test Accounts & Evaluation Guide

To test both regular citizen and administrator capabilities, you can register accounts directly through the UI or use the sample accounts below:

### 1. Standard Citizen Account (Normal User)
- **Email:** `resident@civicevents.gov`
- **Password:** `ResidentPass123!`
- **Role:** `user`
- **Recommended Test Flow:**
  1. Browse and filter events on `index.html`.
  2. Open an event detail page, click **Register for Event**, and submit a 5-star review.
  3. Listen to an audio announcement on `announcements.html` using the play/pause, scrub, and volume controls.
  4. Watch a video promo on `promos.html` and verify the closed captions track displays text.
  5. Visit `my-registrations.html` to verify the reserved event appears, then test cancelling the reservation.
  6. Visit `profile.html` to update full name and verify read-only role restrictions.

### 2. Civic Administrator Account
- **Email:** `admin@civicevents.gov`
- **Password:** `AdminPassword123!`
- **Role:** `admin` (or update role directly in PostgreSQL: `UPDATE users SET role='admin' WHERE email='admin@civicevents.gov';`)
- **Recommended Test Flow:**
  1. Notice the **Dashboard** link appears in the main navbar.
  2. Visit `dashboard.html` to review summary metrics, the 6-month growth chart, and user activation toggles.
  3. On `index.html`, click **Create Event**, upload an image, and submit.
  4. On `event-detail.html`, inspect the **Admin Attendee Roster** to view registered participant emails.
  5. On `announcements.html`, click **Upload Announcement** to upload an audio file.
  6. On `promos.html`, click **Upload Video Promo** to upload a video with closed captions.