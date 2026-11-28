import { NextRequest, NextResponse } from "next/server";
import { dbUsers, toPublicUser } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { cleanText, isValidEmail, logStructured, parseJsonBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const parsed = await parseJsonBody<{ email?: string; password?: string }>(req);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const email = cleanText(parsed.data.email, 254).toLowerCase();
    const password = typeof parsed.data.password === "string" ? parsed.data.password : "";

    if (!isValidEmail(email) || !password) {
      return NextResponse.json({ error: "Valid email and password are required" }, { status: 400 });
    }

    const user = await dbUsers.findByEmail(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await createSession(user.id, req);

    return NextResponse.json({
      user: toPublicUser(user),
    });
  } catch (error) {
    logStructured("error", "auth_login_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
