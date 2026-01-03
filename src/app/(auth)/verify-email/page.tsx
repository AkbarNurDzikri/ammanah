"use client";

import { useSearchParams } from "next/navigation";
import { VerifyEmailInvalid } from "./[token]/components/verify-email-invalid";
import { VerifyEmailSuccess } from "./[token]/components/verify-email-success";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    return <VerifyEmailInvalid />;
  }

  return <VerifyEmailSuccess email={email} />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
