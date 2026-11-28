import { NextRequest, NextResponse } from "next/server";
import { dbTeachingApps } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { cleanText, isValidEmail, logStructured, parseJsonBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const parsed = await parseJsonBody<{
      fullName?: string;
      email?: string;
      phone?: string;
      qualification?: string;
      specialization?: string;
      experience?: string;
      motivation?: string;
    }>(req);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const fullName = cleanText(parsed.data.fullName, 120);
    const email = cleanText(parsed.data.email, 254).toLowerCase();
    const phone = cleanText(parsed.data.phone, 40);
    const qualification = cleanText(parsed.data.qualification, 120);
    const specialization = cleanText(parsed.data.specialization, 140);
    const experience = cleanText(parsed.data.experience, 80);
    const motivation = cleanText(parsed.data.motivation, 4000);

    if (!fullName || !email || !phone || !qualification || !specialization || !experience || !motivation) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const existing = await dbTeachingApps.findActiveByUserId(session.user.id);
    if (existing) {
      return NextResponse.json(
        { error: "You already have an active application. You can edit or withdraw it in the Teaching Applications tab." },
        { status: 409 }
      );
    }

    const application = await dbTeachingApps.create({
      userId: session.user.id,
      fullName,
      email,
      phone,
      qualification,
      specialization,
      experience,
      motivation,
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    logStructured("error", "teaching_application_create_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const applications = await dbTeachingApps.findByUserId(session.user.id);
    return NextResponse.json({ applications });
  } catch (error) {
    logStructured("error", "teaching_application_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const parsed = await parseJsonBody<{
      id?: number;
      phone?: string;
      qualification?: string;
      specialization?: string;
      experience?: string;
      motivation?: string;
    }>(req);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const id = Number(parsed.data.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Valid application id is required" }, { status: 400 });
    }

    const updated = await dbTeachingApps.updatePending(id, session.user.id, {
      phone: parsed.data.phone ? cleanText(parsed.data.phone, 40) : undefined,
      qualification: parsed.data.qualification ? cleanText(parsed.data.qualification, 120) : undefined,
      specialization: parsed.data.specialization ? cleanText(parsed.data.specialization, 140) : undefined,
      experience: parsed.data.experience ? cleanText(parsed.data.experience, 80) : undefined,
      motivation: parsed.data.motivation ? cleanText(parsed.data.motivation, 4000) : undefined,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Pending application not found or cannot be edited" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application: updated });
  } catch (error) {
    logStructured("error", "teaching_application_update_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const idParam = req.nextUrl.searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || !Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Valid application id is required" }, { status: 400 });
    }

    const deleted = await dbTeachingApps.deletePending(id, session.user.id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Pending application not found or cannot be withdrawn" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    logStructured("error", "teaching_application_delete_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
