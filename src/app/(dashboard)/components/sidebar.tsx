"use client";

import Link from "next/link";
import { X, Menu, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { menuItems } from "./menu-item";
import { useSidebar } from "../hooks/use-sidebar";

export const Sidebar = () => {
  const {
    isMobileOpen,
    isMounted,
    openDropdowns,
    toggleDropdown,
    handleLogout,
    toggleSidebar,
    isSidebarCollapsed,
    setIsMobileOpen,
    hasPermission,
    user,
    pathname,
  } = useSidebar();

  if (!isMounted) return null;

  const showFloating = isSidebarCollapsed; // Desktop hover floating logic applies when collapsed
  const showInline = !isSidebarCollapsed || isMobileOpen; // Show regular text when expanded OR on mobile drawer

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Top Header (Visible only when sidebar is closed) */}
      {!isMobileOpen && (
        <header className="fixed top-0 left-0 right-0 h-16 lg:hidden z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
              <span className="text-white font-black text-[10px]">AM</span>
            </div>
            <h1 className="text-sm font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
              AMMA<span className="text-emerald-600">NAH</span>
            </h1>
          </div>
          <button
            className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-all"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900 transition-all duration-300 ease-in-out transform lg:static lg:translate-x-0 group/sidebar",
          isSidebarCollapsed ? "w-72 lg:w-20" : "w-72 lg:w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full relative group/content">
          {/* Desktop Toggle Button - Positioned exactly at the navbar-sidebar intersection */}
          <div className="hidden lg:block absolute -right-4 top-[72px] z-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center p-0 group/toggle"
            >
              <div
                className={cn(
                  "transition-all duration-500",
                  isSidebarCollapsed ? "rotate-0" : "rotate-180"
                )}
              >
                <ChevronRight
                  size={16}
                  className={cn(
                    "transition-colors",
                    isSidebarCollapsed
                      ? "text-emerald-600"
                      : "text-zinc-400 group-hover/toggle:text-emerald-600"
                  )}
                />
              </div>
            </Button>
          </div>

          <div
            className={cn(
              "h-20 border-b border-zinc-50 dark:border-zinc-900 flex items-center transition-all duration-500",
              showInline ? "px-6 justify-between" : "px-0 justify-center"
            )}
          >
            <div
              className={cn(
                "flex items-center transition-all duration-500 gap-2",
                showInline ? "w-auto" : "w-20 justify-center gap-0"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200 dark:shadow-none hover:scale-105 transition-transform">
                <span className="text-white font-black text-sm">AM</span>
              </div>
              <div className="flex flex-col items-start justify-end">
                <h1
                  className={cn(
                    "text-xl font-black text-zinc-900 dark:text-white tracking-tighter truncate transition-all duration-300",
                    isSidebarCollapsed
                      ? "opacity-0 w-0 pointer-events-none ml-0"
                      : "opacity-100 w-auto"
                  )}
                >
                  AMMA<span className="text-emerald-600">NAH</span>
                </h1>
                <p
                  className={cn(
                    "text-xs text-zinc-500 dark:text-zinc-400",
                    "text-emerald-600",
                    isSidebarCollapsed
                      ? "opacity-0 w-0 pointer-events-none ml-0"
                      : "opacity-100 w-auto"
                  )}
                >
                  Aplikasi Manajemen Masjid
                </p>
              </div>
            </div>

            {/* Mobile Close Button (inside the drawer) */}
            {isMobileOpen && (
              <button
                className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-all lg:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav
            className={cn(
              "flex-1 px-3 py-6 space-y-1",
              isSidebarCollapsed ? "overflow-visible" : "overflow-y-auto"
            )}
          >
            {menuItems.map((item) => {
              // Check permission for parent item
              if (item.permission && !hasPermission(item.permission))
                return null;

              // If item has children, render as dropdown
              if (item.children) {
                // Filter children by permission
                const visibleChildren = item.children.filter(
                  (child) =>
                    !child.permission || hasPermission(child.permission)
                );

                if (visibleChildren.length === 0) return null;

                // Check if any child is active
                const isAnyChildActive = visibleChildren.some(
                  (child) => child.href && pathname === child.href
                );

                // Get dropdown state
                const isOpen = openDropdowns[item.name] || false;

                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-2xl transition-all group/item py-3 hover:cursor-pointer relative",
                        isSidebarCollapsed
                          ? "justify-center px-0"
                          : "justify-between px-4",
                        isAnyChildActive
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 shadow-sm shadow-emerald-100/50 dark:shadow-none"
                          : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      <item.icon
                        size={22}
                        className={cn(
                          "transition-all shrink-0",
                          isAnyChildActive
                            ? "text-emerald-600"
                            : "group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-100"
                        )}
                      />
                      {showInline && (
                        <>
                          <span className="font-bold text-sm truncate flex-1 text-left">
                            {item.name}
                          </span>
                          <ChevronRight
                            size={14}
                            className={cn(
                              "transition-all opacity-50 shrink-0",
                              isOpen && "rotate-90"
                            )}
                          />
                        </>
                      )}

                      {/* Floating Submenu for Collapsed State (Desktop only) */}
                      {showFloating && !isMobileOpen && (
                        <div className="invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 transition-all duration-300 absolute left-full top-0 ml-4 z-50">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 min-w-[200px] backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                            <div className="px-3 py-2 border-b border-zinc-50 dark:border-zinc-800 mb-2">
                              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                                {item.name}
                              </span>
                            </div>
                            <div className="space-y-1">
                              {visibleChildren.map((child) => {
                                const isChildActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href!}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-2 rounded-xl transition-all group/child text-sm",
                                      isChildActive
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 font-bold"
                                        : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                                    )}
                                  >
                                    <child.icon
                                      size={18}
                                      className={cn(
                                        "transition-all shrink-0",
                                        isChildActive
                                          ? "text-emerald-600"
                                          : "group-hover/child:text-zinc-900 dark:group-hover/child:text-zinc-100"
                                      )}
                                    />
                                    <span>{child.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Regular Inline Children (Expanded State OR Mobile) */}
                    {showInline && isOpen && (
                      <div className="mt-1 space-y-1 ml-4 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-top-2 duration-200">
                        {visibleChildren.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href!}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all group text-sm",
                                isChildActive
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 font-bold"
                                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                              )}
                            >
                              <child.icon
                                size={18}
                                className={cn(
                                  "transition-all shrink-0",
                                  isChildActive
                                    ? "text-emerald-600"
                                    : "group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                                )}
                              />
                              <span>{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular menu item (no children)
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl transition-all group/item py-3 relative",
                    isSidebarCollapsed
                      ? "justify-center px-0"
                      : "justify-between px-4",
                    isActive
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 shadow-sm shadow-emerald-100/50 dark:shadow-none"
                      : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  <item.icon
                    size={22}
                    className={cn(
                      "transition-all shrink-0",
                      isActive
                        ? "text-emerald-600"
                        : "group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-100"
                    )}
                  />
                  {showInline && (
                    <>
                      <span className="font-bold text-sm truncate flex-1">
                        {item.name}
                      </span>
                      {isActive && (
                        <ChevronRight
                          size={14}
                          className="opacity-50 shrink-0"
                        />
                      )}
                    </>
                  )}

                  {/* Floating Label for Collapsed State (Desktop only) */}
                  {showFloating && !isMobileOpen && (
                    <div className="invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 transition-all duration-300 absolute left-full top-0 ml-4 z-50 pointer-events-none">
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl px-4 py-3 whitespace-nowrap backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </span>
                        {isActive && (
                          <div className="mt-1 h-0.5 bg-emerald-500 rounded-full w-full" />
                        )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-2 border-t border-zinc-100 dark:border-zinc-900 space-y-2">
            <div
              className={cn(
                "flex items-center gap-3 p-2 rounded-2xl transition-all relative group/item",
                isSidebarCollapsed
                  ? "justify-center"
                  : "bg-zinc-50/50 dark:bg-zinc-900/30 justify-start"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              {showInline && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate font-medium tracking-wider">
                    {user?.email}
                  </p>
                </div>
              )}

              {/* Floating Info for Collapsed State (Desktop only) */}
              {showFloating && !isMobileOpen && (
                <div className="invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 transition-all duration-300 absolute left-full top-0 ml-4 z-50 pointer-events-none">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl px-4 py-3 min-w-[150px] backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate font-medium tracking-wider">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant={`ghost`}
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-sm relative group/item",
                showInline ? "px-4 py-3 justify-start" : "justify-center px-0"
              )}
            >
              <LogOut size={22} className="shrink-0" />
              {showInline && <span>Logout</span>}

              {/* Floating Logout Label (Desktop only) */}
              {showFloating && !isMobileOpen && (
                <div className="invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 transition-all duration-300 absolute left-full top-1 ml-4 z-50 pointer-events-none">
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl shadow-2xl px-4 py-2 whitespace-nowrap">
                    <span className="text-sm font-bold text-red-600">
                      Logout
                    </span>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
