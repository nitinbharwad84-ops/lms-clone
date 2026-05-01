import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Wraps page content in a full-screen, centered container that applies the Inter font.
 *
 * @param children - The content to render inside the centered layout
 * @returns A React element that wraps `children` in a full-height, centered container with a light-gray background and padding
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 flex items-center justify-center p-4`}>
      {children}
    </div>
  );
}
