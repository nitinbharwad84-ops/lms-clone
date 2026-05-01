-- Assign the default teacher to all existing courses
DO $$
DECLARE
    teacher_uuid UUID;
BEGIN
    -- Find the teacher's ID
    SELECT id INTO teacher_uuid FROM public.profiles WHERE email = 'teacher@parul.edu';

    -- If found, update all courses
    IF teacher_uuid IS NOT NULL THEN
        UPDATE public.courses SET teacher_id = teacher_uuid WHERE teacher_id IS NULL;
    END IF;
END $$;
