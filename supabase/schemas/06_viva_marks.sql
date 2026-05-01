-- Viva Marks Table
CREATE TABLE viva_marks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  marks INTEGER CHECK (marks >= 0 AND marks <= 100),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(student_id, course_id)
);

-- RLS
ALTER TABLE viva_marks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Teachers can manage viva marks for their courses." ON viva_marks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = viva_marks.course_id 
      AND courses.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own viva marks." ON viva_marks
  FOR SELECT USING (auth.uid() = student_id);
