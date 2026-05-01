-- Cleanup script to start fresh
-- Run this if you are getting "Database error" or "User already exists"

-- 1. Disable the trigger temporarily to avoid conflicts during manual cleanup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Delete existing test users from Auth and Profiles
DELETE FROM auth.users WHERE email IN ('admin@parul.edu', 'teacher@parul.edu', 'student@parul.edu');
DELETE FROM public.profiles WHERE email IN ('admin@parul.edu', 'teacher@parul.edu', 'student@parul.edu');

-- 3. Re-create the trigger with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'), 
    new.email, 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'STUDENT')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Verify the types exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');
    END IF;
END$$;
