-- SQL to seed users in Auth.Users and Public.Profiles
-- This uses the handle_new_user trigger to populate public.profiles automatically.

-- 1. Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Create Admin User
-- Email: admin@parul.edu | Password: admin123
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, role, aud, confirmation_token)
SELECT 
  gen_random_uuid(), 
  'admin@parul.edu', 
  crypt('admin123', gen_salt('bf')), 
  now(), 
  '{"full_name": "System Administrator", "role": "ADMIN"}', 
  'authenticated', 
  'authenticated', 
  ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@parul.edu');

-- 3. Create Teacher User
-- Email: teacher@parul.edu | Password: teacher123
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, role, aud, confirmation_token)
SELECT 
  gen_random_uuid(), 
  'teacher@parul.edu', 
  crypt('teacher123', gen_salt('bf')), 
  now(), 
  '{"full_name": "Dr. Rajesh Kumar", "role": "TEACHER"}', 
  'authenticated', 
  'authenticated', 
  ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher@parul.edu');

-- 4. Create Student User
-- Email: student@parul.edu | Password: student123
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, role, aud, confirmation_token)
SELECT 
  gen_random_uuid(), 
  'student@parul.edu', 
  crypt('student123', gen_salt('bf')), 
  now(), 
  '{"full_name": "Nitin Kumar", "role": "STUDENT", "roll_number": "2301010101"}', 
  'authenticated', 
  'authenticated', 
  ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student@parul.edu');
