import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Seeds a predefined set of users into Supabase (creates auth users and corresponding profiles) and renders the per-user outcomes.
 *
 * Attempts to create each seed user's auth record with email confirmed and user metadata, inserts a matching row into the `profiles` table, and collects success or error details for display.
 *
 * @returns A React element that displays the seeding results for each user, including error messages when present.
 */
export default async function SeedUsersPage() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const users = [
    { email: "admin@parul.edu", password: "admin123", full_name: "System Administrator", role: "ADMIN" },
    { email: "teacher@parul.edu", password: "teacher123", full_name: "Dr. Rajesh Kumar", role: "TEACHER" },
    { email: "student@parul.edu", password: "student123", full_name: "Nitin Kumar", role: "STUDENT" },
  ];

  const results = [];

  for (const user of users) {
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { 
        full_name: user.full_name, 
        role: user.role 
      }
    });

    if (authError) {
      results.push({ email: user.email, status: "Error (Auth)", message: authError.message });
    } else {
      // Manual Profile Creation
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        });

      if (profileError) {
        results.push({ email: user.email, status: "Error (Profile)", message: profileError.message });
      } else {
        results.push({ email: user.email, status: "Success" });
      }
    }
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-6">User Seeding Results</h1>
      <div className="space-y-4">
        {results.map((res, i) => (
          <div key={i} className={`p-4 rounded-xl border ${res.status === "Success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"}`}>
            <strong>{res.email}</strong>: {res.status} {res.message && `- ${res.message}`}
          </div>
        ))}
      </div>
      <p className="mt-6 text-gray-500">You can now delete this file and try logging in at /login.</p>
    </div>
  );
}
