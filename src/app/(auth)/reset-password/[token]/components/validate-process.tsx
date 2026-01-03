import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ValidateProcess() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <Loader2 className="w-16 h-16 animate-spin text-emerald-600 mx-auto" />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Validating reset link...
            </h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
