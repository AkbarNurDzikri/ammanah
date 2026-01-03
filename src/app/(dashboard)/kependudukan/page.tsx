import { Suspense } from "react";
import { getKependudukanStats } from "./actions/dashboard.actions";
import DashboardStats from "./components/dashboard-stats";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Dashboard Kependudukan | AMMANAH",
  description: "Insight dan statistik data kependudukan",
};

export default async function KependudukanDashboardPage() {
  const stats = await getKependudukanStats();

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Wawasan <span className="text-emerald-600">Kependudukan</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
          Pantau statistik dan distribusi demografi wilayah secara real-time.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[400px]">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
          </div>
        }
      >
        <DashboardStats data={stats} />
      </Suspense>
    </div>
  );
}
