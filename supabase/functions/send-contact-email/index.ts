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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();
    
    console.log("Processing contact form submission from:", email);

    // Validate input
    if (!name || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
        }
      );
    }

    const RESEND_FROM_EMAIL =
      Deno.env.get("RESEND_FROM_EMAIL") ??
      "CopyArabia Contact <onboarding@resend.dev>";
    const RESEND_TO_EMAIL =
      Deno.env.get("RESEND_TO_EMAIL") ?? "copywriter@copyarabia.com";

    // IMPORTANT: Change 'to' address to copywriter@copyarabia.com after verifying domain
    // Also update 'from' to use your verified domain (e.g., noreply@copyarabia.com)
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [RESEND_TO_EMAIL], // Primary recipient (production)
        subject: `New Contact Form Message from ${name}`,
        reply_to: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This email was sent from the CopyArabia contact form.
            </p>
          </div>
        `,
      }),
    });

    const emailData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", emailData);

      // Fallback for Resend test mode: auto-send to the allowed test email from the error message
      const msg = String(emailData?.message || "");
      const match = msg.match(/\(([^)]+)\)/); // extracts email inside parentheses
      const allowedEmail = match?.[1];

      if (emailData?.statusCode === 403 && msg.includes("You can only send testing emails") && allowedEmail) {
        console.log("Falling back to allowed test email:", allowedEmail);
        const retry = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: [allowedEmail],
            subject: `[TEST MODE] New Contact Form Message from ${name}`,
            reply_to: email,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 10px 0;"><strong>Message:</strong></p>
                  <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  This email was sent from the CopyArabia contact form.
                </p>
              </div>
            `,
          }),
        });

        const retryData = await retry.json();
        if (!retry.ok) {
          console.error("Retry Resend API error:", retryData);
          throw new Error(retryData.message || "Failed to send email");
        }

        return new Response(JSON.stringify(retryData), {
          status: 200,
          headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
        });
      }

      throw new Error(emailData.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...buildCorsHeaders(req),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(req) },
      }
    );
  }
};

serve(handler);
