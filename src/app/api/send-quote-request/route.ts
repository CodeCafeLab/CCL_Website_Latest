
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import type { QuoteFormData } from '@/components/pricing/QuoteFormSheet'; // Assuming type export

// Re-define schema for server-side validation (can be imported if shared)
const quoteFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().optional(),
  serviceInterest: z.string().min(1, "Service of interest is required."),
  projectDescription: z.string().min(1, "Project description is required."),
  budgetRange: z.string().optional(),
  preferredContactMethod: z.enum(["email", "phone"]).optional(),
  phoneNumber: z.string().optional(),
});

function generateHtmlEmail(data: QuoteFormData): string {
  const recipientEmail = "hello@codecafelab.in";
  const subject = `New Quote Request from ${data.fullName}`;
  
  // Basic inline styles for email client compatibility
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
        <title>${subject}</title>
      </head>
      <body style="${styles.body}">
        <div style="${styles.container}">
          <div style="${styles.header}">
            <h1 style="${styles.headerTitle}">CodeCafe Lab - New Quote Request</h1>
          </div>
          
          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Contact Information</h2>
            <table style="${styles.table}">
              <tr><th style="${styles.th}">Full Name:</th><td style="${styles.td}">${data.fullName}</td></tr>
              <tr><th style="${styles.th}">Email:</th><td style="${styles.td}">${data.email}</td></tr>
              ${data.companyName ? `<tr><th style="${styles.th}">Company:</th><td style="${styles.td}">${data.companyName}</td></tr>` : ''}
              ${data.preferredContactMethod ? `<tr><th style="${styles.th}">Preferred Contact:</th><td style="${styles.td}">${data.preferredContactMethod}</td></tr>` : ''}
              ${data.preferredContactMethod === 'phone' && data.phoneNumber ? `<tr><th style="${styles.th}">Phone Number:</th><td style="${styles.td}">${data.phoneNumber}</td></tr>` : ''}
            </table>
          </div>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Project Details</h2>
            <table style="${styles.table}">
              <tr><th style="${styles.th}">Service of Interest:</th><td style="${styles.td}">${data.serviceInterest}</td></tr>
              ${data.budgetRange ? `<tr><th style="${styles.th}">Estimated Budget:</th><td style="${styles.td}">${data.budgetRange}</td></tr>` : ''}
              <tr>
                <th style="${styles.th}">Project Description:</th>
                <td style="${styles.td}"><p style="${styles.paragraph}">${data.projectDescription}</p></td>
              </tr>
            </table>
          </div>

          <div style="${styles.footer}">
            <p>This email was generated from a quote request on the CodeCafe Lab website.</p>
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
    const validationResult = quoteFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json({ message: "Invalid form data.", errors: validationResult.error.flatten().fieldErrors }, { status: 400 });
    }

    const formData = validationResult.data;
    const emailHtml = generateHtmlEmail(formData);

    // --- !!! IMPORTANT: Email Sending Logic Placeholder !!! ---
    // In a real application, you would integrate an email sending service here.
    // For example, using SendGrid, Resend, Nodemailer + SMTP, etc.
    //
    // Example with Nodemailer (requires setup and credentials):
    //
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: `"CodeCafe Lab Quotes" <quotes@yourdomain.com>`, // Sender address
    //   to: "hello@codecafelab.in", // List of receivers
    //   subject: `New Quote Request from ${formData.fullName}`, // Subject line
    //   html: emailHtml, // HTML body
    // });
    //
    // console.log('Email sending simulated for:', formData.email);
    // --- End of Email Sending Logic Placeholder ---

    console.log("---BEGIN MOCK EMAIL---");
    console.log("To: hello@codecafelab.in");
    console.log(`Subject: New Quote Request from ${formData.fullName}`);
    console.log("Body (HTML):");
    console.log(emailHtml);
    console.log("---END MOCK EMAIL---");
    
    // Return the generated email content for debugging/testing on client if needed,
    // or just a success message.
    return NextResponse.json({ message: "Quote request processed successfully. Email content logged on server.", emailContentPreview: process.env.NODE_ENV === 'development' ? emailHtml : undefined }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing quote request:', error);
    return NextResponse.json({ message: 'Failed to process quote request.', error: error.message }, { status: 500 });
  }
}

    