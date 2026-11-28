import { NextRequest, NextResponse } from "next/server";
import { dbUsers, toPublicUser } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
import { cleanText, isValidEmail, logStructured, parseJsonBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const parsed = await parseJsonBody<{
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      institution?: string;
    }>(req);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const name = cleanText(parsed.data.name, 120);
    const email = cleanText(parsed.data.email, 254).toLowerCase();
    const password = typeof parsed.data.password === "string" ? parsed.data.password : "";
    const phone = cleanText(parsed.data.phone, 40) || null;
    const institution = cleanText(parsed.data.institution, 180) || null;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 6 || password.length > 128) {
      return NextResponse.json({ error: "Password must be between 6 and 128 characters" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const existing = await dbUsers.findByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await dbUsers.create({
      name,
      email,
      passwordHash,
      phone,
      institution,
      provider: "credentials",
    });

    await createSession(user.id, req);

    return NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  } catch (error) {
    logStructured("error", "auth_register_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
