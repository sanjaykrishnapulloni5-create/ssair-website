import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email, phone, qualification, specialization, experience, motivation } = body;

    if (!fullName || !email || !phone || !qualification || !specialization || !experience || !motivation) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already has a pending application
    const existing = await prisma.teachingApplication.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ["PENDING", "REVIEWING"] },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already have an active application. Please wait for review." },
        { status: 409 }
      );
    }

    const application = await prisma.teachingApplication.create({
      data: {
        userId: session.user.id,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        qualification: qualification.trim(),
        specialization: specialization.trim(),
        experience: experience.trim(),
        motivation: motivation.trim(),
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Teaching application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const applications = await prisma.teachingApplication.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
