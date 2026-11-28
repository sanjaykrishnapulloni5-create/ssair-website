import { NextRequest, NextResponse } from "next/server";
import { services as staticServices, type Service, type ServiceCategory } from "@/data/services";
import { dbCatalog } from "@/lib/db";
import { logStructured } from "@/lib/validation";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function parseJsonArray(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const queryParam = searchParams.get("q");

    // Fetch from D1/SQLite and enrich with canonical display metadata
    let allServices: Service[] = staticServices;
    try {
      const dbRows = await dbCatalog.listServices();
      if (dbRows.length > 0) {
        allServices = dbRows.map((row) => {
          const staticMatch = staticServices.find((s) => s.slug === row.slug);
          return {
            id: row.slug,
            number: row.id,
            slug: row.slug,
            title: row.title,
            icon: staticMatch?.icon || row.icon,
            emoji: staticMatch?.emoji,
            shortDescription: row.shortDescription,
            description: staticMatch?.description || row.shortDescription,
            fullDescription: row.fullDescription,
            category: row.icon as ServiceCategory,
            categoryName: row.category,
            features: parseJsonArray(row.features),
            technologies: parseJsonArray(row.technologies),
            href: `/services/${row.slug}`,
          };
        });
      }
    } catch {
      // Fallback cleanly to static catalog
    }

    let result = allServices;

    if (categoryParam && categoryParam.trim()) {
      const normalizedParam = categoryParam.trim().toLowerCase();
      if (normalizedParam !== "all") {
        const slugParam = normalizedParam
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const exactMatches = allServices.filter((service) => {
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

        result =
          exactMatches.length > 0
            ? exactMatches
            : allServices.filter((service) => {
                const cat = (service.category || "").toLowerCase();
                const catName = (service.categoryName || "").toLowerCase();
                return cat.includes(normalizedParam) || catName.includes(normalizedParam);
              });
      }
    }

    if (queryParam && queryParam.trim()) {
      const q = queryParam.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Cache-Control": "public, max-age=300, s-maxage=600",
      },
    });
  } catch (error) {
    logStructured("error", "services_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: "Failed to retrieve services. Please try again later." },
      { status: 500, headers: corsHeaders }
    );
  }
}
