"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Home,
  Database,
  ArrowRightLeft,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

interface StatsProps {
  data: any;
}

// Premium Color Palette
const COLORS = [
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#8b5cf6", // Violet
];

const GRADIENTS = [
  { id: "gradEmerald", color: "#10b981" },
  { id: "gradBlue", color: "#3b82f6" },
  { id: "gradIndigo", color: "#6366f1" },
  { id: "gradAmber", color: "#f59e0b" },
  { id: "gradRose", color: "#f43f5e" },
  { id: "gradViolet", color: "#8b5cf6" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: payload[0].fill || payload[0].color }}
          />
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {payload[0].value.toLocaleString()}{" "}
            <span className="text-zinc-500 font-medium">Jiwa</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardStats({ data }: StatsProps) {
  const {
    counts,
    gender,
    religion,
    education,
    occupation,
    maritalStatus,
    income,
    kkIncome,
    ageDistribution,
  } = data;

  const cardData = [
    {
      label: "Total Penduduk",
      value: counts.totalPenduduk,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50 dark:bg-emerald-500/10",
      description: "Warga Terdaftar Aktif",
    },
    {
      label: "Total KK",
      value: counts.totalKK,
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50/50 dark:bg-blue-500/10",
      description: "Kartu Keluarga Terverifikasi",
    },
    {
      label: "Total Rumah",
      value: counts.totalRumah,
      icon: Home,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50 dark:bg-indigo-500/10",
      description: "Unit Bangunan Terdata",
    },
    {
      label: "Riwayat Mutasi",
      value: counts.totalMutasi,
      icon: ArrowRightLeft,
      color: "text-rose-600",
      bg: "bg-rose-50/50 dark:bg-rose-500/10",
      description: "Pergerakan Data Warga",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* SVG Gradients Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {GRADIENTS.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={g.color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={g.color} stopOpacity={0.3} />
            </linearGradient>
          ))}
          <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, i) => (
          <Card
            key={card.label}
            className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden group hover:border-emerald-500/50 transition-all duration-300"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-700 ${card.bg}`}
            />
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    {card.label}
                  </p>
                  <h3 className="text-4xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tighter">
                    {card.value.toLocaleString()}
                  </h3>
                  <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                    {card.description}
                  </p>
                </div>
                <div
                  className={`${card.bg} ${card.color} p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution (Pie) */}
        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
                <PieChartIcon size={20} className="text-emerald-500" />
                Dinamika Gender
              </CardTitle>
              <p className="text-xs text-zinc-500 font-medium">
                Komposisi Penduduk Aktif
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 p-2 rounded-xl text-xs font-bold">
              2 Kategori
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gender}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                >
                  {gender.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Groups (Bar) */}
        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                Struktur Usia
              </CardTitle>
              <p className="text-xs text-zinc-500 font-medium">
                Demografi Berdasarkan Kelompok
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#888888"
                  opacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.02)" }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="value"
                  fill="url(#gradBlue)"
                  radius={[10, 10, 0, 0]}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Religion Distribution (Horizontal Bar) */}
        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Database size={20} className="text-amber-500" />
              Keberagaman Agama
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium">
              Sebaran Keyakinan Wilayah
            </p>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={religion} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#888888"
                  opacity={0.05}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  fontSize={10}
                  width={100}
                  tickLine={false}
                  axisLine={false}
                  fontWeight="bold"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="url(#gradAmber)"
                  radius={[0, 10, 10, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Education (Horizontal Bar) */}
        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <BarChartIcon size={20} className="text-indigo-500" />
              Pilar Pendidikan
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium">
              Profil Latar Belakang Akademik
            </p>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={education}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#888888"
                  opacity={0.05}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  fontSize={10}
                  width={100}
                  tickLine={false}
                  axisLine={false}
                  fontWeight="bold"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="url(#gradIndigo)"
                  radius={[0, 10, 10, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Income Distribution Section (Gradient Bars) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Wallet size={20} className="text-emerald-500" />
              Kapasitas Ekonomi (Individu)
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium">
              Rentang Penghasilan Per Orang
            </p>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={income}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  fontWeight="bold"
                />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="url(#gradEmerald)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Wallet size={20} className="text-blue-500" />
              Kapasitas Ekonomi (Keluarga)
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium">
              Berdasarkan Penghasilan Kepala Keluarga
            </p>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kkIncome}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  fontWeight="bold"
                />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="url(#gradBlue)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Occupation Card (Full Width with Modern Area/Bar Hybrid Feel) */}
      <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Users size={20} className="text-rose-500" />
              Lanskap Pekerjaan
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium">
              Potensi Sumber Daya Manusia
            </p>
          </div>
          <div className="flex gap-2">
            {/* Legend placeholder or other tools */}
          </div>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupation} margin={{ bottom: 40 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#888888"
                opacity={0.05}
              />
              <XAxis
                dataKey="name"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                interval={0}
                fontWeight="bold"
              />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#gradRose)"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
