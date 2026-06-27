import { redirect } from "next/navigation";

/**
 * Performs a server-side redirect to the "/dashboard" route.
 *
 * This page component immediately issues a navigation redirect to "/dashboard" on the server; it does not render UI.
 */
export default function Home() {
  redirect("/dashboard");
}
