"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  className?: string;
  iconClassName?: string;
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  className,
  iconClassName,
  loading = false,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {title}
            </p>
            {loading ? (
              <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
            ) : (
              <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                {value}
              </h3>
            )}
            {description && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {description}
              </p>
            )}
          </div>
          <div
            className={cn(
              "p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
              iconClassName
            )}
          >
            <Icon size={28} className="text-white" />
          </div>
        </div>
      </CardContent>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />
    </Card>
  );
}
