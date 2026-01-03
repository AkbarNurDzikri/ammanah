"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { ProfileForm } from "./components/profile-form";
import { PasswordForm } from "./components/password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
          <SettingsIcon size={26} className="text-zinc-400" />
          Account Settings
        </h1>
        <p className="text-zinc-500">
          Manage your account information and security preferences.
        </p>
      </div>

      <Card className="border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl overflow-hidden">
        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 p-6">
          <CardTitle className="text-xl font-black tracking-tight">
            Profile & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-12">
          {/* Profile Section */}
          <ProfileForm initialName={user?.name} />

          {/* Password Section */}
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
