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
    const emailHtml = generateContactEmailHtml(formData);
    const emailSubject = `New Contact Form Submission: ${formData.subject}`;
    const recipientEmail = "codecafelabtechnologies@gmail.com";

    // Nodemailer transporter setup with provided SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "hello@codecafelab.in",
        pass: "CCl@1234@1234",
      },
    });

    // Send mail with defined transport object
    try {
      await transporter.verify(); // Verify connection configuration
      const info = await transporter.sendMail({
        from: `"CodeCafe Lab Contact" <hello@codecafelab.in>`,
        to: recipientEmail,
        replyTo: formData.email,
        subject: emailSubject,
        html: emailHtml,
      });
      console.log("Contact form email sent: %s", info.messageId);
      return NextResponse.json({ 
        message: "Contact form submitted and email sent successfully!" 
      }, { status: 200 });
    } catch (emailError: any) {
      console.error('Error sending contact form email:', emailError);
      if (emailError.responseCode) {
         console.error('SMTP Error Code:', emailError.responseCode);
         console.error('SMTP Error Message:', emailError.response);
      }
      return NextResponse.json({ 
        message: 'Form data processed, but failed to send email.', 
        error: `Email Error: ${emailError.message}` 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      message: 'Failed to process contact form.', 
      error: error.message 
    }, { status: 500 });
  }
} 