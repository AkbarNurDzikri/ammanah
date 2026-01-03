import { useState } from "react";
import { toast } from "sonner";
import { resendVerificationEmailAction } from "../../verify-email/[token]/actions/resend-verification-email.action";

export function ResendVerification({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address first");
      return;
    }

    setLoading(true);
    try {
      const result = await resendVerificationEmailAction(email);
      if (result.error) {
        toast.error(result.error);
      } else {
        setSent(true);
        toast.success("Verification email resent!");
      }
    } catch (error) {
      toast.error("Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return null;

  return (
    <div className="pt-2 border-t dark:border-zinc-800">
      <p className="text-[11px] text-zinc-400 mb-1">
        Haven't received the verification link?
      </p>
      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className="text-xs font-bold text-zinc-500 hover:text-emerald-600 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
    </div>
  );
}
