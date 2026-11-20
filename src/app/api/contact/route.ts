import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface ContactRequestBody {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactRequestBody>;
    const { name, email, phone, subject, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message content is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Save to SQLite database via Prisma ORM
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : "General Inquiry",
        message: message.trim(),
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to SSAIR. Your inquiry has been safely recorded.",
        id: inquiry.id,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("[API_CONTACT_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing your request." },
      { status: 500, headers: corsHeaders }
    );
  }
}
