
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const partnerRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number is required."),
  partnershipType: z.string().min(1, "Partnership type is required."),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }

    return Buffer.concat(chunks);
}


function generateHtmlEmail(data: z.infer<typeof partnerRequestSchema>): string {
    const styles = {
        body: `font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;`,
        container: `max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);`,
        header: `background-color: #FFC72C; color: #392013; padding: 15px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;`,
        headerTitle: `margin: 0; font-size: 24px;`,
        section: `margin-bottom: 20px;`,
        sectionTitle: `color: #392013; font-size: 18px; border-bottom: 2px solid #FFC72C; padding-bottom: 5px; margin-bottom: 10px;`,
        table: `width: 100%; border-collapse: collapse;`,
        th: `text-align: left; padding: 8px; background-color: #f9f9f9; border: 1px solid #ddd; font-weight: bold; color: #555; min-width: 120px; vertical-align: top;`,
        td: `text-align: left; padding: 8px; border: 1px solid #ddd; vertical-align: top;`,
        footer: `text-align: center; font-size: 12px; color: #777; margin-top: 20px;`,
        paragraph: `white-space: pre-wrap; word-wrap: break-word;`
    };

    return `
      <html>
        <body style="${styles.body}">
          <div style="${styles.container}">
            <div style="${styles.header}"><h1 style="${styles.headerTitle}">New Partnership Request</h1></div>
            <div style="${styles.section}">
              <h2 style="${styles.sectionTitle}">Partner Details</h2>
              <table style="${styles.table}">
                <tr><th style="${styles.th}">Name:</th><td style="${styles.td}">${data.name}</td></tr>
                <tr><th style="${styles.th}">Email:</th><td style="${styles.td}">${data.email}</td></tr>
                <tr><th style="${styles.th}">Phone:</th><td style="${styles.td}">${data.phone}</td></tr>
                <tr><th style="${styles.th}">Partnership Type:</th><td style="${styles.td}">${data.partnershipType}</td></tr>
                ${data.productInterest ? `<tr><th style="${styles.th}">Product Interest:</th><td style="${styles.td}">${data.productInterest}</td></tr>` : ''}
              </table>
            </div>
            <div style="${styles.section}">
              <h2 style="${styles.sectionTitle}">Message</h2>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #FFC72C;">
                <p style="${styles.paragraph}">${data.message}</p>
              </div>
            </div>
            <div style="${styles.footer}"><p>This email was sent from the CodeCafe Lab website.</p></div>
          </div>
        </body>
      </html>
    `;
}


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const rawData = Object.fromEntries(formData.entries());
        
        const file = formData.get("file") as File | null;

        const validationResult = partnerRequestSchema.safeParse(rawData);

        if (!validationResult.success) {
            return NextResponse.json({ 
                message: "Invalid form data.", 
                errors: validationResult.error.flatten().fieldErrors 
            }, { status: 400 });
        }

        const emailData = validationResult.data;
        const emailHtml = generateHtmlEmail(emailData);
        const emailSubject = `New Partnership Request: ${emailData.partnershipType} from ${emailData.name}`;
        const recipientEmail = "codecafelabtechnologies@gmail.com";

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "hello@codecafelab.in",
                pass: "CCl@1234@1234",
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"CodeCafe Lab Partners" <hello@codecafelab.in>`,
            to: recipientEmail,
            replyTo: emailData.email,
            subject: emailSubject,
            html: emailHtml,
        };

        if (file) {
            const buffer = await streamToBuffer(file.stream());
            mailOptions.attachments = [
                {
                    filename: file.name,
                    content: buffer,
                    contentType: file.type,
                },
            ];
        }

        await transporter.verify();
        await transporter.sendMail(mailOptions);
        
        // In a real app, you would save this data to your database here.
        // e.g., await db.partnerRequests.create({ data: emailData });

        return NextResponse.json({ message: "Partnership request submitted successfully!" }, { status: 200 });

    } catch (error: any) {
        console.error('Error processing partnership request:', error);
        return NextResponse.json({ message: 'Failed to process request.', error: error.message }, { status: 500 });
    }
}
