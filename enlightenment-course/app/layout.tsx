import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Age of Enlightenment - Ideas That Shaped America",
  description: "Explore Enlightenment philosophy and how it shaped American democracy through immersive stories, flashcards, and quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
