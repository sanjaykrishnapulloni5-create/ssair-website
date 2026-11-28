import { NextRequest, NextResponse } from "next/server";
import { dbUsers, toPublicUser } from "@/lib/db";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";
import { cleanText, logStructured, parseJsonBody } from "@/lib/validation";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const parsed = await parseJsonBody<{
      name?: string;
      phone?: string;
      institution?: string;
      currentPassword?: string;
      newPassword?: string;
    }>(req);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, phone, institution, currentPassword, newPassword } = parsed.data;
    const cleanName = cleanText(name, 120);
    if (!cleanName) {
      return NextResponse.json({ error: "Full name cannot be empty" }, { status: 400 });
    }

    // Optional password change verification
    if (newPassword !== undefined && newPassword !== "") {
      if (typeof newPassword !== "string" || newPassword.length < 6 || newPassword.length > 128) {
        return NextResponse.json(
          { error: "New password must be between 6 and 128 characters" },
          { status: 400 }
        );
      }

      const fullUser = await dbUsers.findById(session.user.id);
      if (!fullUser?.passwordHash || !currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password" },
          { status: 400 }
        );
      }

      const ok = await verifyPassword(currentPassword, fullUser.passwordHash);
      if (!ok) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }

      const newHash = await hashPassword(newPassword);
      await dbUsers.updatePasswordHash(session.user.id, newHash);
    }

    const updated = await dbUsers.updateProfile(session.user.id, {
      name: cleanName,
      phone: phone !== undefined ? cleanText(phone, 40) || null : session.user.phone,
      institution:
        institution !== undefined ? cleanText(institution, 180) || null : session.user.institution,
    });

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: toPublicUser(updated) });
  } catch (error) {
    logStructured("error", "auth_profile_update_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
