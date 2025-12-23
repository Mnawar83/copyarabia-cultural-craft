import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const buildCorsHeaders = (req: Request) => {
  const requestHeaders =
    req.headers.get("Access-Control-Request-Headers") ??
    corsHeaders["Access-Control-Allow-Headers"];

  return {
    ...corsHeaders,
    "Access-Control-Allow-Headers": requestHeaders,
  };
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
    });
  }

  try {
    const body = (await req.json()) as Partial<ContactEmailRequest>;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    console.log("Processing contact form submission from:", email);

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
      });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
      });
    }

    const RESEND_FROM_EMAIL =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "CopyArabia Contact <onboarding@resend.dev>";
    const RESEND_TO_EMAIL =
      Deno.env.get("RESEND_TO_EMAIL") ?? "copywriter@copyarabia.com";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessageHtml = escapeHtml(message).replace(/\n/g, "<br>");
    const textBody =
      `New Contact Form Submission\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n`;

    const payload = {
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
      subject: `New Contact Form Message from ${name}`,
      // Compatibility: REST typically uses reply_to; SDK shows replyTo. :contentReference[oaicite:3]{index=3}
      reply_to: email,
      replyTo: email,
      text: textBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
              ${safeMessageHtml}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the CopyArabia contact form.
          </p>
        </div>
      `,
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const emailData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", emailData);

      // Optional: keep your test-mode fallback if you want it,
      // but note: it’s better to fix domain verification instead of auto-forwarding.
      throw new Error(emailData?.message || "Failed to send email");
    }

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
    });
  }
};

serve(handler);
