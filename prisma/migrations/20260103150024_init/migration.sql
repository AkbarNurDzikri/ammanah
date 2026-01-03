-- CreateEnum
CREATE TYPE "StatusRumah" AS ENUM ('KOSONG', 'DIHUNI', 'DIKONTRAKKAN', 'RENOVASI', 'LAINNYA');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "Pendidikan" AS ENUM ('TIDAK_SEKOLAH', 'SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'D4_S1', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "Pekerjaan" AS ENUM ('TIDAK_BEKERJA', 'PNS', 'TNI_POLRI', 'KARYAWAN_SWASTA', 'WIRASWASTA', 'BURUH', 'PETANI_NELAYAN', 'PELAJAR_MAHASISWA', 'IBU_RUMAH_TANGGA', 'PENSIUNAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('A_POSITIF', 'A_NEGATIF', 'B_POSITIF', 'B_NEGATIF', 'AB_POSITIF', 'AB_NEGATIF', 'O_POSITIF', 'O_NEGATIF', 'TIDAK_TAHU');

-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDHA', 'KONGHUCU');

-- CreateEnum
CREATE TYPE "HubunganKeluarga" AS ENUM ('KEPALA_KELUARGA', 'ISTRI', 'ANAK', 'MENANTU', 'CUCU', 'ORANG_TUA', 'MERTUA', 'FAMILI_LAIN', 'PEMBANTU', 'LAINNYA');

-- CreateEnum
CREATE TYPE "StatusKawin" AS ENUM ('BELUM_KAWIN', 'KAWIN', 'CERAI_HIDUP', 'CERAI_MATI');

-- CreateEnum
CREATE TYPE "PenghasilanRange" AS ENUM ('DI_BAWAH_1JT', 'SATU_SAMPAI_3JT', 'TIGA_SAMPAI_5JT', 'LIMA_SAMPAI_10JT', 'DI_ATAS_10JT');

-- CreateEnum
CREATE TYPE "StatusPenduduk" AS ENUM ('AKTIF', 'PINDAH', 'MENINGGAL');

-- CreateEnum
CREATE TYPE "MutasiJenis" AS ENUM ('PINDAH_DATANG', 'PINDAH_KELUAR', 'PINDAH_INTERNAL', 'MENINGGAL', 'LAHIR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "ketuaGangId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Gang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rumah" (
    "id" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "gangId" TEXT NOT NULL,
    "status" "StatusRumah" NOT NULL DEFAULT 'DIHUNI',
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Rumah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KK" (
    "id" TEXT NOT NULL,
    "nomorKK" TEXT NOT NULL,
    "rumahId" TEXT NOT NULL,
    "alamat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "KK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penduduk" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "golonganDarah" "GolonganDarah",
    "agama" "Agama" NOT NULL,
    "pendidikan" "Pendidikan",
    "pekerjaan" TEXT,
    "statusKawin" "StatusKawin",
    "hubunganKeluarga" "HubunganKeluarga" NOT NULL,
    "penghasilan" DECIMAL(15,2),
    "penghasilanRange" "PenghasilanRange",
    "ayahKandung" TEXT,
    "ibuKandung" TEXT,
    "isKtpSesuaiDomisili" BOOLEAN NOT NULL DEFAULT true,
    "alamatKtp" TEXT,
    "kkId" TEXT,
    "status" "StatusPenduduk" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutasiPenduduk" (
    "id" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "jenis" "MutasiJenis" NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alasan" TEXT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "MutasiPenduduk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Gang_nama_key" ON "Gang"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Gang_ketuaGangId_key" ON "Gang"("ketuaGangId");

-- CreateIndex
CREATE UNIQUE INDEX "Rumah_nomor_key" ON "Rumah"("nomor");

-- CreateIndex
CREATE UNIQUE INDEX "KK_nomorKK_key" ON "KK"("nomorKK");

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_ketuaGangId_fkey" FOREIGN KEY ("ketuaGangId") REFERENCES "Penduduk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_gangId_fkey" FOREIGN KEY ("gangId") REFERENCES "Gang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KK" ADD CONSTRAINT "KK_rumahId_fkey" FOREIGN KEY ("rumahId") REFERENCES "Rumah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KK" ADD CONSTRAINT "KK_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KK" ADD CONSTRAINT "KK_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_kkId_fkey" FOREIGN KEY ("kkId") REFERENCES "KK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
