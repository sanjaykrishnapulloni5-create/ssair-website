import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession().catch(() => null);
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      track,
      domain,
      projectCode,
      title,
      requirements,
    } = body;

    if (!fullName || !email || !phone || !track || !domain || !title || !requirements) {
      return NextResponse.json(
        { error: "Please fill in all required project fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const requestRecord = await prisma.projectRequest.create({
      data: {
        userId: session?.user?.id ?? null,
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        track: String(track).trim(),
        domain: String(domain).trim(),
        projectCode: projectCode ? String(projectCode).trim() : null,
        title: String(title).trim(),
        requirements: String(requirements).trim(),
      },
    });

    return NextResponse.json({ request: requestRecord }, { status: 201 });
  } catch (error) {
    console.error("Project request error:", error);
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

    const requests = await prisma.projectRequest.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { email: session.user.email },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Fetch project requests error:", error);
    return NextResponse.json(
      { error: "Failed to load project requests" },
      { status: 500 }
    );
  }
}
