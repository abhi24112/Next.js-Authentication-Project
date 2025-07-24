import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // --- Dynamic Content ---
    // Determines the content based on the email type
    const subject =
      emailType === "VERIFY"
        ? "Verify Your Email Address"
        : "Reset Your Password";

    const title =
      emailType === "VERIFY" ? "Confirm Your Email" : "Reset Your Password";

    const bodyText =
      emailType === "VERIFY"
        ? "Thank you for registering. Please click the button below to verify your email address and complete your registration."
        : "You have requested to reset your password. Click the button below to set a new password.";

    const buttonText =
      emailType === "VERIFY" ? "Verify Email" : "Reset Password";

    const verificationLink = emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    // --- Email Options Object ---
    const mailOption = {
      from: '"Authenitication form Abhishek" <no-reply@abhishek.com>',
      to: email,
      subject: subject,
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-g">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 20px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        
                        <tr>
                            <td align="center" style="padding: 40px 0 30px 0; border-bottom: 1px solid #eeeeee;">
                                <h1 style="color: #333333; margin: 0; font-size: 28px;">${title}</h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 40px 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                <p style="margin: 0;">${bodyText}</p>
                            </td>
                        </tr>
                        
                        <tr>
                            <td align="center" style="padding: 0 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" style="border-radius: 5px;" bgcolor="#4A90E2">
                                            <a href="${verificationLink}" target="_blank" style="font-size: 16px; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; display: inline-block; font-weight: bold;">
                                                ${buttonText}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 0 30px 20px 30px; color: #888888; font-size: 12px; text-align: center;">
                                <p style="margin: 0;">If the button above doesn't work, copy and paste this link into your browser:</p>
                                <p style="margin: 10px 0 0 0; word-break: break-all;"><a href="${verificationLink}" target="_blank" style="color: #4A90E2;">${verificationLink}</a></p>
                            </td>
                        </tr>
                        
                        <tr>
                            <td align="center" style="padding: 20px 30px; background-color: #f9f9f9; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; color: #aaaaaa; font-size: 12px;">
                                <p style="margin: 0;">© ${new Date().getFullYear()} Profile Authenticator. All rights reserved.</p>
                                <p style="margin: 5px 0 0 0;">If you did not request this, please ignore this email.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `,
    };

    const mailresponse = await transport.sendMail(mailOption);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
