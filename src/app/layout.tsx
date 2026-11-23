import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/context/ThemeContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ssair.in"),
  title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI Solutions",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) is a premier Indian technology company engineering intelligent robotics, defense drones, and computer vision systems. Sister company of Sri Saraswathi AI & Robotics.",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "Sri Saraswathi Artificial Intelligence and Robotics",
    "Dadireddy Srinivasulu Reddy",
    "DRDO CAIR",
    "IISc Bangalore",
    "Robotics India",
    "Defense Drones",
    "Autonomous Systems",
    "Industrial Robotics",
    "Bengaluru Robotics",
  ],
  authors: [{ name: "Sri Srinivasa AI Robotics Pvt. Ltd." }],
  creator: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  publisher: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ssair.in",
    siteName: "SSAIR - Sri Srinivasa AI Robotics",
    title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI Solutions",
    description:
      "Intelligent robotics, autonomous defense systems, and computer vision founded by former DRDO CAIR Scientist 'D' Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SSAIR - Sri Srinivasa AI Robotics Pvt. Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Srinivasa AI Robotics (SSAIR)",
    description:
      "Intelligent robotics, autonomous defense systems, and AI solutions founded by former DRDO CAIR scientist Dr. Dadireddy Srinivasulu Reddy.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white font-sans transition-colors duration-200">
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
