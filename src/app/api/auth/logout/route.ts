import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { logStructured } from "@/lib/validation";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    logStructured("error", "auth_logout_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
