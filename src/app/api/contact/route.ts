import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function generateContactEmailHtml(data: ContactFormData): string {
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

  const htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission from ${data.name}</title>
      </head>
      <body style="${styles.body}">
        <div style="${styles.container}">
          <div style="${styles.header}">
            <h1 style="${styles.headerTitle}">CodeCafe Lab - New Contact Form Submission</h1>
          </div>
          
          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Contact Information</h2>
            <table style="${styles.table}">
              <tr><th style="${styles.th}">Name:</th><td style="${styles.td}">${data.name}</td></tr>
              <tr><th style="${styles.th}">Email:</th><td style="${styles.td}">${data.email}</td></tr>
              <tr><th style="${styles.th}">Subject:</th><td style="${styles.td}">${data.subject}</td></tr>
            </table>
          </div>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Message</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #FFC72C;">
              <p style="${styles.paragraph}">${data.message}</p>
            </div>
          </div>

          <div style="${styles.footer}">
            <p>This email was generated from a contact form submission on the CodeCafe Lab website.</p>
            <p>&copy; ${new Date().getFullYear()} CodeCafe Lab. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  return htmlContent;
}

export async function POST(req: NextRequest) {
  try {
    const rawData: unknown = await req.json();
    const validationResult = contactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json({ 
        message: "Invalid form data.", 
        errors: validationResult.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const formData = validationResult.data;

    // Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "hello@codecafelab.in",
        pass: process.env.SMTP_PASS || "CCl@1234@1234",
      },
    });

    const emailHtml = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong><br/>${formData.message}</p>
    `;

    await transporter.sendMail({
      from: `"CodeCafe Lab Contact" <${process.env.SMTP_USER || "hello@codecafelab.in"}>`,
      to: "codecafelabtechnologies@gmail.com",
      replyTo: formData.email,
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: emailHtml,
    });

    return NextResponse.json({ 
      message: "Contact form submitted and email sent successfully!" 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      message: 'Failed to process contact form.', 
      error: error.message 
    }, { status: 500 });
  }
}

// (Optional) GET for admin dashboard
export async function GET() {
  try {
    // This part of the code was removed as per the edit hint to remove Prisma.
    // If you need to fetch messages, you'll need to implement a different method
    // like direct SQL, another ORM, or no database at all.
    return NextResponse.json({ message: 'Contact message fetching is currently disabled.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch messages.', error: error.message }, { status: 500 });
  }
} 