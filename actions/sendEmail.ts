"use server";

import React from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { validateString, validateEmail, sanitizeString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

export const sendEmail = async (formData: FormData) => {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    return {
      error: "Email service is not configured. Please contact the administrator."
    }
  }

  const resend = new Resend(resendApiKey)

  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email"
    }
  }

  if (!validateEmail(senderEmail as string)) {
    return {
      error: "Invalid email format"
    }
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message"
    }
  }

  // Sanitize message content to prevent XSS (email address is validated separately)
  const sanitizedMessage = sanitizeString(message as string)

  let data
  try {
    // Render the React email component to HTML ourselves to avoid renderToReadableStream issues
    const emailHtml = await render(
      React.createElement(ContactFormEmail, {
        message: sanitizedMessage,
        senderEmail: senderEmail as string
      })
    );

    data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'diamondlouden@gmail.com',
      subject: 'Message from contact form',
      reply_to: senderEmail as string,
      html: emailHtml,
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    }
  }

  return {
    data
  }
};
