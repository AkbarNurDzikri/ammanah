import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateResetToken } from "../actions/validate-reset-token.action";

export function useResetPassword() {
  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const params = useParams();

  useEffect(() => {
    const validate = async () => {
      const token = params.token as string;
      if (!token) {
        setIsValid(false);
        setValidating(false);
        return;
      }

      const result = await validateResetToken(token);
      if (result.error) {
        setIsValid(false);
        toast.error(result.error);
      } else {
        setIsValid(true);
        setEmail(result.email || "");
      }
      setValidating(false);
    };

    validate();
  }, [params.token]);

  return {
    validating,
    isValid,
    email,
  };
}
