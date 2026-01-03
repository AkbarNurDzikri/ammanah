import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export function ValidateFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Invalid Reset Link
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              This password reset link is invalid or has expired.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/forgot-password">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Request New Link
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
