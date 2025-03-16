import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(from, subject, body) {
    try {
        const emailInfo = await transporter.sendMail({ 
            from: `"Contact Form" <${process.env.EMAIL_USER}>`, 
            replyTo: from, 
            to: process.env.EMAIL_USER,
            subject: subject,
            html: `<p><strong>From:</strong> ${from}</p><p>${body}</p>`
        });

        console.log("✅ Email sent:", emailInfo.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

export default sendMail;