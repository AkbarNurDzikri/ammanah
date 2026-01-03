import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function VerifyEmailInvalid() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black font-sans">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500 text-center">
            Invalid Access
          </CardTitle>
          <CardDescription className="text-center">
            No email address provided.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <Button variant="outline">Back to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
