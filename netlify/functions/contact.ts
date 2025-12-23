interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

interface HandlerEvent {
  httpMethod: string;
  body: string | null;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

type Handler = (event: HandlerEvent) => Promise<HandlerResponse> | HandlerResponse;

const jsonResponse = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  let payload: ContactEmailRequest;
  try {
    payload = JSON.parse(event.body || "{}") as ContactEmailRequest;
  } catch (error) {
    console.error("Invalid JSON payload:", error);
    return jsonResponse(400, { error: "Invalid JSON payload" });
  }

  const { name, email, message } = payload;

  if (!name || !email || !message) {
    return jsonResponse(400, { error: "Missing required fields" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return jsonResponse(500, { error: "Missing RESEND_API_KEY" });
  }

  const RESEND_FROM_EMAIL =
    process.env.RESEND_FROM_EMAIL ||
    "CopyArabia Contact <onboarding@resend.dev>";
  const RESEND_TO_EMAIL =
    process.env.RESEND_TO_EMAIL || "copywriter@copyarabia.com";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
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
              ${message.replace(/\n/g, "<br>")}
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
    return jsonResponse(500, {
      error: emailData?.message || "Failed to send email",
    });
  }

  return jsonResponse(200, emailData);
};
