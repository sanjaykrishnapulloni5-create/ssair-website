import { NextRequest, NextResponse } from "next/server";
import { dbContactInquiries } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { cleanText, isValidEmail, logStructured, parseJsonBody } from "@/lib/validation";

export interface ContactRequestBody {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
    const parsed = await parseJsonBody<Partial<ContactRequestBody>>(request);
    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400, headers: corsHeaders }
      );
    }

    const name = cleanText(parsed.data.name, 120);
    const email = cleanText(parsed.data.email, 254).toLowerCase();
    const phone = cleanText(parsed.data.phone, 40) || null;
    const subject = cleanText(parsed.data.subject, 200) || "General Inquiry";
    const message = cleanText(parsed.data.message, 5000);

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: "Please include at least a brief message (min 5 characters)." },
        { status: 400, headers: corsHeaders }
      );
    }

    const inquiry = await dbContactInquiries.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to SSAIR. Your inquiry has been safely recorded.",
        id: inquiry.id,
        inquiry,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    logStructured("error", "contact_create_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing your request." },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const inquiries = await dbContactInquiries.findByEmail(session.user.email);
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    logStructured("error", "contact_fetch_error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Failed to load inquiries" }, { status: 500 });
  }
}
