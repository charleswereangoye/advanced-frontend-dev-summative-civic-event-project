# CivicEvents+ Portal

**CivicEvents+** is an accessible, community-driven civic engagement portal connecting city residents with local events, public audio announcements, promotional videos, and community services.

Developed as a summative assessment for the **Advanced Frontend Development** course, this full-stack project combines a robust Node.js/Express + PostgreSQL backend with a lightweight, high-performance HTML5, Tailwind CSS, and jQuery 3.7.1 frontend.

---

## Repository Structure

```
├── backend/                  # Node.js + Express API & PostgreSQL database
│   ├── migrations/           # Database schema migrations
│   ├── src/                  # Express controllers, models, and routes
│   └── README.md             # Backend setup & API documentation
│
├── frontend/                 # Client-side web application
│   ├── assets/               # SVG logo and media assets
│   ├── js/                   # config.js, auth.js, api.js, components.js
│   ├── index.html            # Civic events listing & discovery
│   ├── event-detail.html     # Event details, registration, & feedback
│   ├── announcements.html    # Audio announcements hub with custom player
│   ├── promos.html           # Video promos hub with WebVTT captions
│   ├── dashboard.html        # Administrator analytics & user management
│   ├── profile.html          # Citizen account profile management
│   ├── my-registrations.html # Citizen event attendance tracker
│   ├── login.html            # User authentication
│   ├── signup.html           # User registration
│   └── README.md             # Frontend setup, RBAC architecture, and route map
│
└── video-demo/               # Assessment video demonstration
    └── README.md             # Video submission link & 5-7 min walkthrough script
```

---

## Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
npm run start
```
*Runs on `http://localhost:5000` (or configured port in `.env`).*

### 2. Frontend Setup
```bash
cd frontend
python3 -m http.server 8000
```
*Open `http://localhost:8000` in any modern web browser.*

For detailed configuration, RBAC architecture, and testing instructions, please review the [Frontend Documentation](frontend/README.md) and [Backend Documentation](backend/README.md).