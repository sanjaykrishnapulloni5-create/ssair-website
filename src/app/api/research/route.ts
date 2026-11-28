import { NextRequest, NextResponse } from "next/server";
import { RESEARCH_ARTICLES } from "@/data/research";
import { dbCatalog } from "@/lib/db";
import { logStructured } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category")?.trim() || "all";

    let articles = RESEARCH_ARTICLES;
    if (category.toLowerCase() !== "all") {
      articles = RESEARCH_ARTICLES.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }

    const dbArticles = await dbCatalog.listNewsArticles(category).catch(() => []);

    return NextResponse.json(
      {
        count: articles.length,
        articles,
        dbRecordCount: dbArticles.length,
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
      }
    );
  } catch (error) {
    logStructured("error", "research_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Failed to retrieve research articles" }, { status: 500 });
  }
}
