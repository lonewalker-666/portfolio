import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { personal } from "@/app/data/resume";

const submissions = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();

  const timestamps = (
    submissions.get(ip) ?? []
  ).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  timestamps.push(now);

  submissions.set(ip, timestamps);

  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            parsed.error.issues[0]?.message ??
            "Invalid input.",
        },
        { status: 400 }
      );
    }

    /*
     * Hidden honeypot.
     * A legitimate visitor should always leave this empty.
     */
    if (parsed.data.website) {
      return NextResponse.json({
        success: true,
      });
    }

    const {
      name,
      email,
      company,
      message,
    } = parsed.data;

    const apiKey =
      process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error(
        "RESEND_API_KEY is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Contact form isn't configured yet. Please email directly.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Portfolio <onboarding@resend.dev>",

      to:
        process.env.CONTACT_TO_EMAIL ??
        personal.email,

      replyTo: email,

      subject:
        `New portfolio message from ${name}`,

      text: [
        `From: ${name} <${email}>`,
        `Company: ${company || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (result.error) {
      console.error(
        "Resend error:",
        result.error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to send your message. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}