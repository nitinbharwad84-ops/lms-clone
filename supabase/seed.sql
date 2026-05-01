-- Seed Data for LMS Clone

-- 1. Create a Teacher
-- Note: Replace with actual auth.user id later if needed
-- For now, we assume the admin creates these.

-- 2. Create Courses
INSERT INTO courses (title, description, thumbnail_url) VALUES
('Object Oriented Programming using JAVA', 'Master the fundamentals of Java and OOP concepts.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'),
('Database Management Systems', 'Learn about relational databases and SQL.', 'https://images.unsplash.com/photo-1544383335-607b4aa127c9'),
('Data Structures and Algorithms', 'Advanced topics in computing and problem solving.', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea'),
('Web Technologies', 'Full stack development with modern frameworks.', 'https://images.unsplash.com/photo-1547658719-da2b51169166'),
('Software Engineering', 'Processes, methodologies and project management.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'),
('Operating Systems', 'Fundamentals of OS design and implementation.', 'https://images.unsplash.com/photo-1518770660439-4636190af475'),
('Computer Networks', 'OSI model, protocols and network security.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51');

-- 3. Create Modules for Course 1 (Java)
WITH java_course AS (SELECT id FROM courses WHERE title = 'Object Oriented Programming using JAVA' LIMIT 1)
INSERT INTO modules (course_id, title, "order") VALUES
((SELECT id FROM java_course), 'Introduction to Java', 1),
((SELECT id FROM java_course), 'OOPS Concepts', 2),
((SELECT id FROM java_course), 'Exception Handling', 3),
((SELECT id FROM java_course), 'Multithreading', 4),
((SELECT id FROM java_course), 'Java Collections', 5);

-- 4. Create Lessons for Module 1
WITH intro_module AS (SELECT id FROM modules WHERE title = 'Introduction to Java' LIMIT 1)
INSERT INTO lessons (module_id, title, type, "order", duration) VALUES
((SELECT id FROM intro_module), 'History of Java', 'VIDEO', 1, '10:00'),
((SELECT id FROM intro_module), 'JVM vs JRE vs JDK', 'PDF', 2, '5 mins'),
((SELECT id FROM intro_module), 'First Java Program', 'VIDEO', 3, '15:00'),
((SELECT id FROM intro_module), 'Data Types and Variables', 'PPT', 4, '12 slides');
