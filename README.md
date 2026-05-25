# RecallAI

RecallAI is an AI-powered intelligent notes workspace that helps you **capture, organize, and understand your thoughts**.  
It goes beyond traditional notes by generating **daily and weekly AI summaries** of your content.

Built with a modern UI, teal design system, and a focus on speed, clarity, and productivity.

<img width="1432" height="691" alt="Screenshot 2026-05-25 at 3 34 17 PM" src="https://github.com/user-attachments/assets/3e7b8892-f54a-41a3-bc2e-93ce46fc06fe" />

---
## Core Features

### Smart Notes System
- Create and manage notes instantly
- Clean Apple Notes-style interface
- Grouped by time (Today / Last 7 Days / Monthly)
- Fast backend API integration

---

### AI Summaries (Core Feature)
RecallAI automatically analyzes your notes and generates:

-  **Daily Summary**
  - What you worked on today
  - Key ideas and tasks
  - Important highlights

-  **Weekly Summary**
  - Weekly progress overview
  - Repeated themes across notes
  - Productivity insights

-  **Context Understanding**
  - Detects patterns in your writing
  - Groups related ideas automatically
  - Helps you recall forgotten thoughts

---

###  Authentication
- Email/password login
- NextAuth session handling
- Protected workspace
- Jwt 

---

###  Modern UI System
- Apple + Linear inspired design
- Teal-based accent system
- Glassmorphism effects
- Dark / Light mode support
- Fully responsive (mobile-first)

---

## UI Layout

- **Left Panel:** Notes list (grouped by date)
- **Center/Right Panel:** Note editor
- **Top Bar:** Profile + theme toggle
- **AI Panel (future/optional):** Summary insights

---

##  Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js
- **Icons:** Lucide React
- **Backend:** .NET
- **AI Layer:** Summary generation service (groq)

---

##  How AI Summaries Work

1. User writes notes throughout the day
2. Notes are stored in backend
3. AI service processes:
   - text clustering
   - topic extraction
   - time-based grouping
4. System generates:
   - daily summary
   - weekly summary
   - insights view

---

