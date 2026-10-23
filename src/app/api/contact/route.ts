import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// In-memory rate limiting map: ip -> last timestamp
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // 1. IP rate limiting (1 request per 15 seconds per IP)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown_client";
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    if (lastRequest && now - lastRequest < 15000) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a few moments before sending another message.",
        },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // 2. Parse and validate body
    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check for bots
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Spam detection triggered." },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message body cannot be empty." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_TO_EMAIL || "priyanshujha19.work@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    // 3. If RESEND_API_KEY is configured, transmit email via Resend REST API
    if (resendApiKey) {
      const fromEmail = process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev";

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Portfolio Contact Form <${fromEmail}>`,
          to: [recipientEmail],
          reply_to: email.trim(),
          subject: `[Portfolio Inquiry] ${subject.trim()} — from ${name.trim()}`,
          text: `You received a new inquiry from your developer portfolio contact form:

Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}

Message:
${message.trim()}

---
Timestamp: ${new Date().toISOString()}
Origin: Portfolio Contact Form API`,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          {
            error:
              errorData.message ||
              "Email service rejected the message. Please reach out directly to priyanshujha19.work@gmail.com.",
          },
          { status: 502 }
        );
      }

      const resendData = await resendResponse.json();
      return NextResponse.json({
        success: true,
        deliveryMethod: "resend",
        messageId: resendData.id,
      });
    }

    // 4. If RESEND_API_KEY is not yet configured, return clear instructions and fallback
    return NextResponse.json(
      {
        success: false,
        requiresConfiguration: true,
        message:
          "RESEND_API_KEY is not configured in environment variables. Falling back to direct email client dispatch.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Contact API route exception:", err);
    return NextResponse.json(
      { error: "Internal server error processing inquiry." },
      { status: 500 }
    );
  }
}
