"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeAgo } from "@/utils/date-time.helper";
import { LogIn } from "lucide-react";

interface UserInteraction {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  lastLogin: Date | null;
}

interface RecentLoginsProps {
  users: UserInteraction[] | undefined;
  loading?: boolean;
}

export function RecentLogins({ users, loading = false }: RecentLoginsProps) {
  return (
    <Card className="border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
            Recent Activity
          </CardTitle>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Latest user logins across the system
          </p>
        </div>
        <div className="p-2 bg-emerald-500/10 rounded-xl">
          <LogIn size={20} className="text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))
          ) : users?.length === 0 ? (
            <p className="text-sm text-center text-zinc-500 py-4">
              No recent activity found.
            </p>
          ) : (
            users?.map((user) => (
              <div key={user.id} className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-emerald-500/50 transition-all">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || ""}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-zinc-500">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 border-2 border-white dark:border-zinc-950 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {user.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                  {formatTimeAgo(user.lastLogin)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
