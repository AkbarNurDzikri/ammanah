import { useState } from "react";

export function useForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  return {
    emailSent,
    setEmailSent,
  };
}
