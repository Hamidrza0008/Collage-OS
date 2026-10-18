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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
