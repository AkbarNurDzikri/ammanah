"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 lg:h-20 px-4 md:px-8 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-3 ml-auto">
        {/* Theme Toggler - Only render after mount to prevent hydration mismatch */}
        {mounted && (
          <div className="flex items-center bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
            <Button
              variant={theme === "light" ? "secondary" : "ghost"}
              size="sm"
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
              className={cn(
                "h-8 w-10 p-0 rounded-lg transition-all",
                theme === "light"
                  ? "bg-white shadow-sm"
                  : "hover:bg-transparent"
              )}
            >
              {theme === "light" ? (
                <Sun
                  size={16}
                  className={
                    theme === "light" ? "text-amber-500" : "text-zinc-500"
                  }
                />
              ) : (
                <Moon
                  size={16}
                  className={
                    theme === "dark" ? "text-indigo-400" : "text-zinc-500"
                  }
                />
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
