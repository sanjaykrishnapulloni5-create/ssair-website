import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/context/ThemeContext";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ssair.in"),
  title: "SSAIR | Sri Srinivasa AI Robotics - AI, Defence & Robotics Solutions",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) pioneers cutting-edge deep-tech research and engineering in artificial intelligence, autonomous defence systems, robotics kinematics, computer vision, and aerospace technologies. Founded by former DRDO CAIR leadership.",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "AI Robotics",
    "Defence Robotics",
    "Autonomous Systems",
    "Defence AI",
    "Robotics Kinematics",
    "DRDO CAIR",
    "Five-Bar Mechanism",
    "YOLO Computer Vision",
    "Deep Learning",
    "Cyber Security",
    "UAV Drones",
    "Self Driving Vehicles",
  ],
  authors: [{ name: "Sri Srinivasa AI Robotics Pvt. Ltd." }],
  creator: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  publisher: "Sri Srinivasa AI Robotics Pvt. Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://ssair.in",
    siteName: "SSAIR - Sri Srinivasa AI Robotics",
    title: "SSAIR | Sri Srinivasa AI Robotics - AI, Defence & Robotics Solutions",
    description:
      "Premier Indian deep-tech enterprise pioneering indigenous AI, robotics, and defense technologies. Founded by former DRDO CAIR Scientist 'D' Dadireddy Srinivasulu Reddy (IISc alumnus).",
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
    title: "SSAIR | Sri Srinivasa AI Robotics - AI, Defence & Robotics Solutions",
    description:
      "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) delivers state-of-the-art AI, autonomous robotics, and defence engineering solutions.",
    creator: "@SSAIR_India",
    site: "@SSAIR_India",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-950 text-gray-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-400 font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
