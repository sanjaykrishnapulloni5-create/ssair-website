import { NextRequest, NextResponse } from "next/server";
import { dbProjectRequests } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { cleanText, isValidEmail, logStructured, parseJsonBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession().catch(() => null);
    const parsed = await parseJsonBody<{
      fullName?: string;
      email?: string;
      phone?: string;
      track?: string;
      domain?: string;
      projectCode?: string;
      title?: string;
      requirements?: string;
    }>(req);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const fullName = cleanText(parsed.data.fullName, 120);
    const email = cleanText(parsed.data.email, 254).toLowerCase();
    const phone = cleanText(parsed.data.phone, 40);
    const track = cleanText(parsed.data.track, 120);
    const domain = cleanText(parsed.data.domain, 120);
    const projectCode = cleanText(parsed.data.projectCode, 60) || null;
    const title = cleanText(parsed.data.title, 220);
    const requirements = cleanText(parsed.data.requirements, 4000);

    if (!fullName || !email || !phone || !track || !domain || !title || !requirements) {
      return NextResponse.json(
        { error: "Please fill in all required project fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const requestRecord = await dbProjectRequests.create({
      userId: session?.user?.id ?? null,
      fullName,
      email,
      phone,
      track,
      domain,
      projectCode,
      title,
      requirements,
    });

    return NextResponse.json({ request: requestRecord }, { status: 201 });
  } catch (error) {
    logStructured("error", "project_request_create_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Failed to submit project request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const requests = await dbProjectRequests.findByUserOrEmail(
      session.user.id,
      session.user.email
    );

    return NextResponse.json({ requests });
  } catch (error) {
    logStructured("error", "project_request_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Failed to load project requests" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const idParam = req.nextUrl.searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || !Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Valid request id is required" }, { status: 400 });
    }

    const deleted = await dbProjectRequests.deleteSubmitted(
      id,
      session.user.id,
      session.user.email
    );
    if (!deleted) {
      return NextResponse.json(
        { error: "Submitted project request not found or already under review" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    logStructured("error", "project_request_delete_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Failed to withdraw project request" },
      { status: 500 }
    );
  }
}
