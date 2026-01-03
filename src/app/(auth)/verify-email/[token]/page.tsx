"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifyEmailAction } from "./actions/verify-email.action";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const token = params.token as string;
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      const result = await verifyEmailAction(token);
      if (result.error) {
        setStatus("error");
        setMessage(result.error);
      } else {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
        // Redirect to login after 3 seconds
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    verify();
  }, [params.token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {status === "loading" && (
              <>
                <Loader2 className="w-16 h-16 animate-spin text-emerald-600 mx-auto" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Verifying your email...
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Please wait while we verify your email address.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Email Verified!
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">{message}</p>
                <p className="text-sm text-zinc-400">
                  Redirecting to login page...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="w-16 h-16 text-red-600 mx-auto" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Verification Failed
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">{message}</p>
                <div className="flex flex-col gap-3 mt-6">
                  <Link href="/login">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Go to Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full">
                      Register Again
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
