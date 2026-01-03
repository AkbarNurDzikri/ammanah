import { toast } from "sonner";
import { resendVerificationEmailAction } from "../actions/resend-verification-email.action";

export const handleResendVerification = async (
  email: string,
  setLoading: (loading: boolean) => void,
  setSent: (sent: boolean) => void
) => {
  if (!email) return;

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
