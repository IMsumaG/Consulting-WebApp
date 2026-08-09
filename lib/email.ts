import type { ReactElement } from "react";

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  react: ReactElement;
  replyTo?: string;
};

export async function sendEmail({ to, subject, react, replyTo }: SendEmailArgs) {
  return {
    success: false,
    skipped: true,
    reason: `Email delivery is not configured yet for ${Array.isArray(to) ? to.join(", ") : to}`,
    subject,
    react,
    replyTo,
  };
}
