import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Layout wrapper for course pages that applies the Inter font and base page styles.
 *
 * @param children - The content to render inside the course layout.
 * @returns A top-level div element with the Inter font class and `min-h-screen bg-white flex flex-col` styles that wraps `children`.
 */
export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-white flex flex-col`}>
      {children}
    </div>
  );
}
