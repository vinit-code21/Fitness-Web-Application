'use server';

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    // If no email credentials, return fallback message
    if (!emailUser || !emailPassword) {
      console.log("⚠️ Email credentials not configured. Falling back to mailto.");
      return NextResponse.json(
        { 
          success: true, 
          message: "Message ready to send. Please use the fallback email method.",
          fallback: true 
        },
        { status: 200 }
      );
    }

    // Dynamic import of nodemailer (server-side only)
    const nodemailer = require("nodemailer");

    // Configure nodemailer transporter
    // Using Gmail - make sure to enable "Less secure apps" or use App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Email options
    const mailOptions = {
      from: emailUser,
      to: "vinit17620073@gmail.com",
      subject: "New Message from FitnessPro Website",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f1f1f; border-bottom: 2px solid #80FF72; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin: 20px 0;">
              <p style="color: #666; margin: 10px 0;">
                <strong>Message:</strong>
              </p>
              <p style="color: #333; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #80FF72; border-radius: 4px;">
                ${message.replace(/\n/g, "<br>")}
              </p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
              <p>This email was sent from the FitnessPro contact form.</p>
            </div>
          </div>
        </div>
      `,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact API Error:", error);
    // Return success with fallback flag on email error
    return NextResponse.json(
      { 
        success: true, 
        message: "Message received. Please use the email contact method to ensure delivery.",
        fallback: true,
        error: error.message
      },
      { status: 200 }
    );
  }
}
