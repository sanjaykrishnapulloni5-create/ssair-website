import React, { Suspense } from "react";
import type { Metadata } from "next";
import ProductsExplorerClient from "@/components/products/ProductsExplorerClient";

export const metadata: Metadata = {
  title: "Systems, Products & R&D Catalog | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Explore SSAIR autonomous drones, industrial 5-bar robotic manipulators, AI computer vision suites, and academic M.Tech/B.Tech/PhD R&D project blueprints.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <ProductsExplorerClient />
    </Suspense>
  );
}
