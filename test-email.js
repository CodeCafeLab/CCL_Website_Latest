const nodemailer = require('nodemailer').default || require('nodemailer');

// Test email configuration
const transporter = nodemailer.createTransporter({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "hello@codecafelab.in",
    pass: "CCl@1234@1234",
  },
});

async function testEmail() {
  try {
    console.log('Testing SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: `"CodeCafe Lab Test" <hello@codecafelab.in>`,
      to: "codecafelabtechnologies@gmail.com",
      subject: "Test Email from CodeCafe Lab Website",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify that the SMTP configuration is working correctly.</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
        <p>If you receive this email, the email functionality is working properly!</p>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Error testing email:', error);
    if (error.responseCode) {
      console.error('SMTP Error Code:', error.responseCode);
      console.error('SMTP Error Message:', error.response);
    }
  }
}

testEmail(); 