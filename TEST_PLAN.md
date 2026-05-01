# 🧪 LMS Implementation Test Plan

This document lists the critical tests to verify the high-fidelity implementation of the Parul University LMS Clone.

## 1. Authentication & Role-Based Access
- [ ] **Admin Login**: Verify access to `/admin/dashboard` and presence of the "ADMINISTRATION" sidebar group.
- [ ] **Teacher Login**: Verify access to `/teaching/courses` and presence of the "TEACHING" sidebar group.
- [ ] **Student Login**: Verify access to the standard dashboard and presence of "LEARNING" and "ASSESSMENTS" groups.
- [ ] **RBAC Security**: Attempt to access `/admin/dashboard` while logged in as a Student (should redirect or deny).

## 2. Administrative Control (Phase 7)
- [ ] **User Management**: 
    - [ ] List all users.
    - [ ] Create a new Teacher account via the "Add User" modal.
    - [ ] Verify the new user appears in the list and can log in.
- [ ] **Course Administration**: 
    - [ ] Create a new Course.
    - [ ] Assign a Teacher to the course.
    - [ ] Verify the Course appears in the Teacher's "Assigned Courses" list.
- [ ] **Enrollment**: 
    - [ ] Enroll a Student into a Course.
    - [ ] Verify the Course appears in the Student's "My Courses" section.

## 3. Academic & Result Management (Phase 6)
- [ ] **Exams**: 
    - [ ] View Exam List as a Student.
    - [ ] Generate and view the "Digital Admit Card" (check QR code and branding).
- [ ] **Results**: 
    - [ ] View "Program Results" and "Provisional Results".
    - [ ] Verify table filters (Semester, Exam Type) are functional.
- [ ] **Timetable**: 
    - [ ] View the interactive calendar grid.
    - [ ] Verify category filters (Live, Practical, Doubt) update the display.

## 4. Faculty Assessment Tools (Phase 7)
- [ ] **Student Directory**: View students enrolled in the teacher's courses via `/teaching/students`.
- [ ] **Viva Mark Entry**: 
    - [ ] Select a student in the Assessment Hub.
    - [ ] Enter a viva score and feedback.
    - [ ] Verify the mark is saved (upserted) and reflects in the table.

## 5. Global UI & Communication (Phase 8)
- [ ] **Notices**: View the official notice board and check the "Download PDF" UI.
- [ ] **Notifications**: View personal alerts and mark them as read.
- [ ] **Responsive Design**: Verify the sidebar collapses/expands and tables are scrollable on smaller screens.
- [ ] **Design Fidelity**: Compare font weights, border-radii (`rounded-[40px]`), and colors against the original screenshots.

## 6. Database & Performance
- [ ] **RLS Verification**: Verify that students cannot see other students' results in the `exam_results` table.
- [ ] **Real-time Sync**: Verify that adding a lesson in the Teacher portal immediately updates the Course Viewer for Students.
