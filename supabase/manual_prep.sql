-- Bulletproof Cleanup & Manual Seeding Prep
-- 1. Remove the trigger completely. We will handle profiles manually in the seeder.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Clear all conflicting data
DELETE FROM auth.users WHERE email IN ('admin@parul.edu', 'teacher@parul.edu', 'student@parul.edu');
DELETE FROM public.profiles WHERE email IN ('admin@parul.edu', 'teacher@parul.edu', 'student@parul.edu');

-- 3. Ensure profiles table is clean and ready
-- (No changes needed to table structure, just ensuring data is gone)
