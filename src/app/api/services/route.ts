import { NextRequest, NextResponse } from "next/server";
import { services, type Service } from "@/data/services";

/**
 * CORS headers for cross-origin requests.
 */
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * OPTIONS handler for CORS preflight requests.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * GET handler for retrieving SSAIR services.
 *
 * Accepts optional query parameter:
 * - `category`: Filter services by category (e.g., "ai-software", "defence-aerospace",
 *   "robotics-autonomous", "innovation-research", or formatted names like "Defence", "Robotics", "AI & Software").
 *
 * Returns filtered or all services as a JSON array.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

    let result: Service[] = services;

    if (categoryParam && categoryParam.trim()) {
      const normalizedParam = categoryParam.trim().toLowerCase();

      // If category is "all", return all services
      if (normalizedParam !== "all") {
        const slugParam = normalizedParam
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        // 1. Attempt exact match against category id or display category name (including slugified variations)
        const exactMatches = services.filter((service) => {
          const cat = (service.category || "").toLowerCase();
          const catName = (service.categoryName || "").toLowerCase();
          const slugCat = cat.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          const slugCatName = catName.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

          return (
            cat === normalizedParam ||
            catName === normalizedParam ||
            slugCat === slugParam ||
            slugCatName === slugParam
          );
        });

        if (exactMatches.length > 0) {
          result = exactMatches;
        } else {
          // 2. Fallback to substring matching (e.g. "defence", "robotics", "ai")
          result = services.filter((service) => {
            const cat = (service.category || "").toLowerCase();
            const catName = (service.categoryName || "").toLowerCase();
            return cat.includes(normalizedParam) || catName.includes(normalizedParam);
          });
        }
      }
    }

    return NextResponse.json(result, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[SSAIR Services API] Error fetching services:", error);

    return NextResponse.json(
      {
        error: "Failed to retrieve services. Please try again later.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
