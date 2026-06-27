import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Renders the authenticated user's dashboard layout.
 *
 * Redirects to "/login" if there is no authenticated user. Fetches the user's profile
 * and supplies it to Sidebar and Navbar; renders `children` inside the main content area.
 *
 * @param children - Content to render within the dashboard's main area
 * @returns A React element containing the Sidebar, Navbar, and the provided main content
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen">
      <Sidebar user={profile} />
      <div className="flex-1">
        <Navbar user={profile} />
        <main className="ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
