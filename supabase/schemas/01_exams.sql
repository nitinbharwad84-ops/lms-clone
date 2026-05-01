-- Exams Table
CREATE TABLE exams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration TEXT NOT NULL,
  questions_count INTEGER DEFAULT 0,
  type TEXT DEFAULT 'FINAL', -- 'MIDTERM', 'PRACTICAL', 'MOCK'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Exam Results Table
CREATE TABLE exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'COMPLETED', -- 'PENDING', 'ABSENT'
  score DECIMAL(5,2),
  percentage DECIMAL(5,2),
  time_taken TEXT,
  attempt_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(exam_id, student_id)
);

-- RLS for Exams
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exams are viewable by everyone." ON exams FOR SELECT USING (true);

-- RLS for Exam Results
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own exam results." ON exam_results
  FOR SELECT USING (auth.uid() = student_id);

-- Timetable Table
CREATE TABLE timetable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL, -- 'Monday', 'Tuesday', etc.
  subject TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  teacher_name TEXT,
  room_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own timetable." ON timetable
  FOR SELECT USING (auth.uid() = student_id);
