import { NextRequest, NextResponse } from "next/server";
import { CATALOG_ITEMS, ACADEMY_PROGRAMS } from "@/data/catalog";
import { dbCatalog } from "@/lib/db";
import { logStructured } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain")?.trim().toLowerCase() || "all";
    const track = searchParams.get("track")?.trim().toLowerCase() || "all";
    const q = searchParams.get("q")?.trim().toLowerCase() || "";

    // Touch D1 health metrics gracefully so DB counts remain consistent
    await dbCatalog.getHealthSnapshot().catch(() => null);

    const items = CATALOG_ITEMS.filter((item) => {
      const domainOk = domain === "all" || item.domain.toLowerCase() === domain;
      const trackOk = track === "all" || item.track.toLowerCase() === track;
      const qOk =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q));
      return domainOk && trackOk && qOk;
    });

    return NextResponse.json(
      {
        count: items.length,
        items,
        academyPrograms: ACADEMY_PROGRAMS,
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
      }
    );
  } catch (error) {
    logStructured("error", "projects_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Failed to retrieve projects" }, { status: 500 });
  }
}
