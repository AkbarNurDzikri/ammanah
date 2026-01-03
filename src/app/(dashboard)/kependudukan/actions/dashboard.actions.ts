"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";
import { INCOME_LABELS, INCOME_ORDER } from "@/config/kependudukan";
import {
  JenisKelamin,
  Pendidikan,
  Pekerjaan,
  Agama,
  StatusKawin,
  StatusPenduduk,
  PenghasilanRange,
  HubunganKeluarga,
} from "@/types/prisma-enums";

function formatLabel(str: string) {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

import { handleDbError } from "@/lib/db-error-handler";

export async function getKependudukanStats() {
  const hasPerm = await verifyPermission("dashboardKependudukan:read");
  if (!hasPerm) {
    throw new Error("Forbidden");
  }

  try {
    const [totalPenduduk, totalKK, totalMutasi, totalRumah] = await Promise.all(
      [
        prisma.penduduk.count({ where: { status: StatusPenduduk.AKTIF } }),
        prisma.kK.count(),
        prisma.mutasiPenduduk.count(),
        prisma.rumah.count(),
      ]
    );

    const genderStats = await prisma.penduduk.groupBy({
      by: ["jenisKelamin"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const religionStats = await prisma.penduduk.groupBy({
      by: ["agama"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const educationStats = await prisma.penduduk.groupBy({
      by: ["pendidikan"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const occupationStats = await prisma.penduduk.groupBy({
      by: ["pekerjaan"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const maritalStatusStats = await prisma.penduduk.groupBy({
      by: ["statusKawin"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const incomeStats = await prisma.penduduk.groupBy({
      by: ["penghasilanRange"],
      _count: { _all: true },
      where: { status: StatusPenduduk.AKTIF },
    });

    const kkIncomeStats = await prisma.penduduk.groupBy({
      by: ["penghasilanRange"],
      _count: { _all: true },
      where: {
        status: StatusPenduduk.AKTIF,
        hubunganKeluarga: HubunganKeluarga.KEPALA_KELUARGA,
      },
    });

    const penduduk = await prisma.penduduk.findMany({
      where: { status: StatusPenduduk.AKTIF },
      select: { tanggalLahir: true },
    });

    const now = new Date();
    const ages = penduduk.map((p: { tanggalLahir: Date | null }) => {
      if (!p.tanggalLahir) return 0;
      const age = now.getFullYear() - p.tanggalLahir.getFullYear();
      const m = now.getMonth() - p.tanggalLahir.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < p.tanggalLahir.getDate())) {
        return age - 1;
      }
      return age;
    });

    const ageBins = [
      { label: "0-5", min: 0, max: 5 },
      { label: "6-12", min: 6, max: 12 },
      { label: "13-17", min: 13, max: 17 },
      { label: "18-25", min: 18, max: 25 },
      { label: "26-35", min: 26, max: 35 },
      { label: "36-45", min: 36, max: 45 },
      { label: "46-55", min: 46, max: 55 },
      { label: "56+", min: 56, max: 150 },
    ];

    const ageDistribution = ageBins.map((bin) => ({
      name: bin.label,
      value: ages.filter((age: number) => age >= bin.min && age <= bin.max)
        .length,
    }));

    return {
      counts: {
        totalPenduduk,
        totalKK,
        totalMutasi,
        totalRumah,
      },
      gender: genderStats.map((s: any) => ({
        name: formatLabel(s.jenisKelamin),
        value: s._count._all,
      })),
      religion: religionStats.map((s: any) => ({
        name: formatLabel(s.agama),
        value: s._count._all,
      })),
      education: educationStats
        .filter((s) => s.pendidikan)
        .map((s: any) => ({
          name: formatLabel(s.pendidikan!),
          value: s._count._all,
        })),
      occupation: occupationStats
        .filter((s) => s.pekerjaan)
        .map((s: any) => ({
          name: formatLabel(s.pekerjaan!),
          value: s._count._all,
        })),
      maritalStatus: maritalStatusStats
        .filter((s) => s.statusKawin)
        .map((s: any) => ({
          name: formatLabel(s.statusKawin!),
          value: s._count._all,
        })),
      income: INCOME_ORDER.map((range) => ({
        name: INCOME_LABELS[range],
        value:
          incomeStats.find((s: any) => s.penghasilanRange === range)?._count
            ._all || 0,
      })),
      kkIncome: INCOME_ORDER.map((range) => ({
        name: INCOME_LABELS[range],
        value:
          kkIncomeStats.find((s: any) => s.penghasilanRange === range)?._count
            ._all || 0,
      })),
      ageDistribution,
    };
  } catch (error) {
    handleDbError(error);
  }
}
