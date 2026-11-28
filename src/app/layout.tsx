import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { UIModalProvider } from "@/context/UIModalContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BlueprintModal from "@/components/ui/BlueprintModal";
import StartProjectModal from "@/components/ui/StartProjectModal";
import CommandSearchModal from "@/components/ui/CommandSearchModal";
import QuickAssistDock from "@/components/ui/QuickAssistDock";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050811" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://srinivas.ai"),
  title: "Sri Srinivasa AI Robotics (SSAIR) | Autonomous Robotics, Defense AI & R&D Academy",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) engineers autonomous drones, defense robotics, industrial 5-bar kinematics, computer vision, and hands-on R&D fellowships. Sister company of Sri Saraswathi AI & Robotics.",
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
    "AI Robotics Internships Workshops",
    "Bengaluru Robotics",
  ],
  authors: [{ name: "Sri Srinivasa AI Robotics Pvt. Ltd." }],
  creator: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  publisher: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://srinivas.ai",
    siteName: "SSAIR - Sri Srinivasa AI Robotics",
    title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI Solutions",
    description:
      "Intelligent robotics, autonomous defense systems, computer vision, and deep-tech student R&D fellowships founded by former DRDO CAIR Scientist 'D' Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).",
    images: [
      {
        url: "/images/academy-lab.jpg",
        width: 1200,
        height: 675,
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

const themeInitScript = `(function(){try{var s=sessionStorage.getItem('ssair-theme-session-v2')||localStorage.getItem('ssair-theme-v2');var t=s==='light'?'light':'dark';var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950 font-sans transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <UIModalProvider>
              <LoadingScreen />
              <ScrollProgress />
              <Navbar />
              <main className="flex-1 w-full flex flex-col">{children}</main>
              <Footer />
              <BlueprintModal />
              <StartProjectModal />
              <CommandSearchModal />
              <QuickAssistDock />
            </UIModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
