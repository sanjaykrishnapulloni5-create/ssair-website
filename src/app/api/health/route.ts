import { NextResponse } from "next/server";
import { dbCatalog } from "@/lib/db";
import { hasConfiguredJwtSecret } from "@/lib/auth";
import { logStructured } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [dbHealth, jwtConfigured] = await Promise.all([
      dbCatalog.getHealthSnapshot(),
      hasConfiguredJwtSecret(),
    ]);

    return NextResponse.json(
      {
        status: "healthy",
        service: "ssair-website",
        runtime: dbHealth.engine === "cloudflare-d1" ? "cloudflare-workers" : "node",
        database: {
          connected: true,
          engine: dbHealth.engine,
          counts: dbHealth.counts,
        },
        security: {
          webCryptoAvailable: typeof crypto?.subtle !== "undefined",
          jwtSecretConfigured: jwtConfigured,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    logStructured("error", "healthcheck_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Database connectivity check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
