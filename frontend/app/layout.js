import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FontProvider } from "@/components/providers/FontProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "College OS - Modern Digital Campus",
  description: "Learn, Connect, and Grow with College OS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider>
            <FontProvider>{children}</FontProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
