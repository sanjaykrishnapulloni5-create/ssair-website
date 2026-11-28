import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logStructured } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getSession();
    if (!result) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { authenticated: true, user: result.user },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    logStructured("error", "auth_session_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
