"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  MapPin,
  User as UserIcon,
  Briefcase,
  GraduationCap,
  Droplets,
  CalendarDays,
} from "lucide-react";
import { KKWithRelations } from "../types";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface KKDetailsProps {
  data: KKWithRelations;
}

export default function KKDetails({ data }: KKDetailsProps) {
  const members = data.penduduk || [];

  const calculateAge = (birthDate: Date | null) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age}`;
  };

  const formatEnumValue = (val: string | null | undefined) => {
    if (!val) return "-";
    return val
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900/50">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-2xl">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Nomor Kartu Keluarga
              </p>
              <h4 className="text-xl font-black text-zinc-900 dark:text-white">
                {data.nomorKK}
              </h4>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900/50">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-2xl">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Domisili
              </p>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                {data.rumah.nomor} - {data.rumah.gang.nama}
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                {data.alamat || "KK sudah sesuai dengan domisili"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
            Daftar Anggota Keluarga{" "}
            <span className="text-emerald-600 ml-1">({members.length})</span>
          </h3>
        </div>

        <div className="grid gap-3">
          {members
            .sort((a, b) => {
              if (a.hubunganKeluarga === "KEPALA_KELUARGA") return -1;
              if (b.hubunganKeluarga === "KEPALA_KELUARGA") return 1;
              return 0;
            })
            .map((member, idx) => (
              <div
                key={member.id}
                className="group border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-2xl shadow-sm ${
                        member.hubunganKeluarga === "KEPALA_KELUARGA"
                          ? "bg-zinc-900 text-white dark:bg-emerald-600"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-zinc-900 dark:text-white flex items-center gap-2">
                        {member.nama}
                        {member.hubunganKeluarga === "KEPALA_KELUARGA" && (
                          <Badge
                            variant="outline"
                            className="text-[9px] font-black uppercase text-emerald-600 border-emerald-500/20 bg-emerald-50"
                          >
                            Kepala Keluarga
                          </Badge>
                        )}
                      </h5>
                      <p className="text-xs text-zinc-500 font-medium">
                        NIK: {member.nik}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <div className="flex items-center gap-1.5 text-[10px] bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded-lg">
                          <CalendarDays size={12} className="text-zinc-400" />
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">
                            {calculateAge(member.tanggalLahir)} Thn
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded-lg">
                          <Briefcase size={12} className="text-zinc-400" />
                          <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                            {formatEnumValue(member.pekerjaan)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded-lg">
                          <GraduationCap size={12} className="text-zinc-400" />
                          <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase leading-none">
                            {formatEnumValue(member.pendidikan)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg">
                          <Droplets size={12} className="text-rose-500" />
                          <span className="font-black text-rose-600 dark:text-rose-400 uppercase">
                            {member.golonganDarah
                              ?.replace(/_POSITIF/g, "+")
                              .replace(/_NEGATIF/g, "-") || "?"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-center">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">
                        Hubungan
                      </p>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {formatEnumValue(member.hubunganKeluarga)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
