"use client";

import { useForgotPasswordForm } from "./hooks/use-forgot-password.form";
import { EmailSentCard } from "./components/email-sent-card";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { useForgotPassword } from "./hooks/use-forgot-password";

export default function ForgotPasswordPage() {
  const { emailSent, setEmailSent } = useForgotPassword();
  const { form } = useForgotPasswordForm();

  if (emailSent) {
    return <EmailSentCard email={form.getValues("email")} />;
  }

  return <ForgotPasswordForm form={form} setEmailSent={setEmailSent} />;
}
