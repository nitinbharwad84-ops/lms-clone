# 🚀 LMS Clone Setup Guide

Follow these steps to initialize the Parul University LMS clone on your local environment.

## 1. Database Initialization (Supabase)

Run the following SQL files in the **Supabase SQL Editor** in the exact order listed below to ensure all tables, types, and policies are created correctly.

### Schema Sequence:
1. `supabase/schemas/00_init.sql` (Core tables: Profiles, Courses, Enrollments)
2. `supabase/schemas/01_exams.sql` (Exam & Result management)
3. `supabase/schemas/06_viva_marks.sql` (Faculty assessment tools)

### Critical Step: User Seeding
To fix **"Invalid Login Credentials"**, you MUST run this file to create the default accounts:
- `supabase/seed_users.sql` (Creates Admin, Teacher, and Student login accounts)

### Additional Data (Optional):
- `supabase/seed.sql` (Initial courses and modules)
- `supabase/seed_exams.sql` (Mock exam data)
- `supabase/seed_timetable.sql` (Academic schedule data)

---

## 2. Environment Configuration

Create a `.env.local` file in the root directory and populate it with your Supabase credentials.

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Required for Admin User Creation

# SMTP Configuration (For Auth emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
SMTP_FROM=noreply@lmsclone.com
```

---

## 3. Local Development Startup

Ensure you have [Node.js](https://nodejs.org/) installed, then run the following commands in your terminal:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 4. Default Credentials (If Using Seed)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | admin@parul.edu | admin123 |
| **Teacher** | teacher@parul.edu | teacher123 |
| **Student** | student@parul.edu | student123 |
