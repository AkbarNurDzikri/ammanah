"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Users,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { StatsCard } from "./components/stats-card";
import { RecentLogins } from "./components/recent-logins";
import {
  getDashboardStats,
  type DashboardStats,
} from "../actions/get-dashboard-stats";
import { getRecentLogins, type RecentUser } from "../actions/get-recent-logins";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [statsResult, recentResult] = await Promise.all([
        getDashboardStats(),
        getRecentLogins(5),
      ]);

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data);
      }

      if (recentResult.success && recentResult.data) {
        setRecentUsers(recentResult.data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
      {/* Welcome Banner */}
      <Card className="border-none bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl shadow-emerald-200 dark:shadow-emerald-900/40 relative overflow-hidden group">
        <CardContent className="p-8 relative z-10">
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            Welcome back, <br className="md:hidden" /> {user?.name || "User"}!
          </h1>
          <p className="text-emerald-50/80 text-lg max-w-xl leading-relaxed">
            You are currently logged in as
            <span className="font-bold text-white ml-2 bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">
              {user?.isSuperAdmin ? "Super Admin" : user?.roles?.[0] || "User"}
            </span>
          </p>
        </CardContent>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Stats */}
        <div className="xl:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white mb-4 uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              General Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Users"
                value={stats?.totalUsers || 0}
                icon={Users}
                iconClassName="bg-blue-500 shadow-lg shadow-blue-200 dark:shadow-none"
                loading={loading}
              />
              <StatsCard
                title="Total Roles"
                value={stats?.totalRoles || 0}
                icon={ShieldCheck}
                iconClassName="bg-purple-500 shadow-lg shadow-purple-200 dark:shadow-none"
                loading={loading}
              />
              <StatsCard
                title="Assigned Roles"
                value={stats?.totalUserRoles || 0}
                icon={UserCheck}
                iconClassName="bg-orange-500 shadow-lg shadow-orange-200 dark:shadow-none"
                loading={loading}
              />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white mb-4 uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              User Status Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Active"
                value={stats?.activeUsers || 0}
                icon={UserPlus}
                iconClassName="bg-emerald-500 shadow-lg shadow-emerald-200 dark:shadow-none"
                loading={loading}
              />
              <StatsCard
                title="Inactive"
                value={stats?.inactiveUsers || 0}
                icon={UserMinus}
                iconClassName="bg-zinc-400 shadow-lg shadow-zinc-200 dark:shadow-none"
                loading={loading}
              />
              <StatsCard
                title="Verified"
                value={stats?.verifiedUsers || 0}
                icon={CheckCircle2}
                iconClassName="bg-blue-400 shadow-lg shadow-blue-200 dark:shadow-none"
                loading={loading}
              />
              <StatsCard
                title="Unverified"
                value={stats?.unverifiedUsers || 0}
                icon={XCircle}
                iconClassName="bg-red-400 shadow-lg shadow-red-200 dark:shadow-none"
                loading={loading}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="xl:col-span-1">
          <RecentLogins users={recentUsers} loading={loading} />
        </div>
      </div>
    </div>
  );
}
