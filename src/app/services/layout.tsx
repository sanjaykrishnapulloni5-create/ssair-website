import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Services & Technologies | SSAIR - Sri Srinivasa AI Robotics",
  description:
    "Explore our deep-tech engineering capabilities across AI & Software, Defence & Aerospace, Robotics & Autonomous Systems, and Frontier Research. Founded by former DRDO CAIR leadership.",
  keywords: [
    "SSAIR",
    "Robotics",
    "Defense Systems",
    "Aerospace Engineering",
    "Artificial Intelligence",
    "Autonomous Drones",
    "Swarm Intelligence",
    "Computer Vision",
    "Counter-UAS",
  ],
  openGraph: {
    title: "Services & Technologies | SSAIR",
    description:
      "Explore deep-tech engineering capabilities across AI, Robotics, and Defense systems at Sri Srinivasa AI Robotics Pvt. Ltd.",
    url: "https://ssair.in/services",
    siteName: "SSAIR",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
