import { NextResponse } from "next/server";
import tls from "tls";

const SMTP_HOST = "smtp.hostinger.com";
const SMTP_PORT = 465;
const SMTP_USER = "info@mowglai.com";
const SMTP_PASS = "Jungle!@#99";
const TO_EMAIL = "info@mowglai.com";

/**
 * Direct zero-dependency TLS socket SMTP client for Hostinger
 */
function sendSmtpEmail({
    subject,
    fromEmail,
    fromName,
    bodyText,
    bodyHtml,
}: {
    subject: string;
    fromEmail: string;
    fromName: string;
    bodyText: string;
    bodyHtml: string;
}): Promise<string> {
    return new Promise((resolve, reject) => {
        const socket = tls.connect(
            {
                host: SMTP_HOST,
                port: SMTP_PORT,
                rejectUnauthorized: false,
            },
            () => {
                let step = 0;
                let buffer = "";

                const sendCommand = (cmd: string) => {
                    socket.write(cmd + "\r\n");
                };

                socket.on("data", (data) => {
                    const response = data.toString();
                    buffer += response;

                    if (step === 0 && response.startsWith("220")) {
                        step = 1;
                        sendCommand(`EHLO mowglai.com`);
                    } else if (step === 1 && response.startsWith("250")) {
                        step = 2;
                        sendCommand(`AUTH LOGIN`);
                    } else if (step === 2 && response.startsWith("334")) {
                        step = 3;
                        sendCommand(Buffer.from(SMTP_USER).toString("base64"));
                    } else if (step === 3 && response.startsWith("334")) {
                        step = 4;
                        sendCommand(Buffer.from(SMTP_PASS).toString("base64"));
                    } else if (step === 4 && response.startsWith("235")) {
                        step = 5;
                        sendCommand(`MAIL FROM:<${SMTP_USER}>`);
                    } else if (step === 5 && response.startsWith("250")) {
                        step = 6;
                        sendCommand(`RCPT TO:<${TO_EMAIL}>`);
                    } else if (step === 6 && response.startsWith("250")) {
                        step = 7;
                        sendCommand(`DATA`);
                    } else if (step === 7 && response.startsWith("354")) {
                        step = 8;
                        const messageId = `<${Date.now()}@mowglai.com>`;
                        const dateStr = new Date().toUTCString();

                        const headers = [
                            `From: "${fromName.replace(/"/g, "")}" <${SMTP_USER}>`,
                            `Reply-To: ${fromEmail}`,
                            `To: ${TO_EMAIL}`,
                            `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
                            `Date: ${dateStr}`,
                            `Message-ID: ${messageId}`,
                            `MIME-Version: 1.0`,
                            `Content-Type: text/html; charset=UTF-8`,
                            `Content-Transfer-Encoding: base64`,
                            ``,
                        ].join("\r\n");

                        const base64Body = Buffer.from(bodyHtml).toString("base64");
                        const formattedBody = base64Body.match(/.{1,76}/g)?.join("\r\n") || base64Body;

                        const fullData = headers + "\r\n" + formattedBody + "\r\n.\r\n";
                        socket.write(fullData);
                    } else if (step === 8 && response.startsWith("250")) {
                        step = 9;
                        sendCommand(`QUIT`);
                        resolve(response.trim());
                        socket.end();
                    } else if (response.startsWith("4") || response.startsWith("5")) {
                        reject(new Error(`SMTP Error at step ${step}: ${response.trim()}`));
                        socket.end();
                    }
                });

                socket.on("error", (err) => {
                    reject(err);
                });
            }
        );

        socket.setTimeout(15000, () => {
            socket.destroy();
            reject(new Error("SMTP socket connection timed out"));
        });
    });
}

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        const subject = payload.subject || "New Website Submission — mowglai.com";
        const email = payload.email || "no-reply@mowglai.com";
        const name = payload.name || payload.full_name || "Website Visitor";
        const phone = payload.phone_number || payload.phone || "N/A";
        const formType = payload.form_type || "general";
        const userMessage = payload.message || payload.project_description || "";

        // Build elegant HTML email template
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
        .header { background: linear-gradient(135deg, #10b981, #059669); padding: 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 1px; text-transform: uppercase; }
        .content { padding: 24px; }
        .field { margin-bottom: 16px; border-bottom: 1px solid #334155; padding-bottom: 12px; }
        .label { font-size: 11px; text-transform: uppercase; color: #10b981; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
        .value { font-size: 15px; color: #f8fafc; word-break: break-word; }
        .footer { padding: 16px; text-align: center; font-size: 12px; color: #64748b; background: #0f172a; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>Mowglai — New Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Form Type</div>
                <div class="value">${formType.toUpperCase()}</div>
            </div>
            <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
            </div>
            <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
            </div>
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
            </div>
            <div class="field">
                <div class="label">Phone / WhatsApp</div>
                <div class="value">${phone}</div>
            </div>
            ${userMessage ? `
            <div class="field">
                <div class="label">Message / Project Details</div>
                <div class="value" style="white-space: pre-wrap;">${userMessage}</div>
            </div>
            ` : ""}
            <div class="field">
                <div class="label">Full Form Data (JSON)</div>
                <div class="value"><pre style="font-size: 12px; background: #0f172a; padding: 12px; border-radius: 8px; overflow-x: auto;">${JSON.stringify(payload, null, 2)}</pre></div>
            </div>
        </div>
        <div class="footer">
            Sent via Mowglai Hostinger Real-Time SMTP Engine • ${new Date().toLocaleString()}
        </div>
    </div>
</body>
</html>
        `;

        const smtpResult = await sendSmtpEmail({
            subject,
            fromEmail: email,
            fromName: name,
            bodyText: `New Form Submission (${formType})\n\nSubject: ${subject}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${userMessage}`,
            bodyHtml: htmlBody,
        });

        return NextResponse.json({
            status: "success",
            message: "Your details have been submitted and emailed to info@mowglai.com instantly!",
            smtpResponse: smtpResult,
        });
    } catch (error: any) {
        console.error("API send-email error:", error);
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Failed to deliver email via Hostinger SMTP.",
            },
            { status: 500 }
        );
    }
}
