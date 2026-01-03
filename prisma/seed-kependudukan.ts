import {
  PrismaClient,
  JenisKelamin,
  Pendidikan,
  Pekerjaan,
  GolonganDarah,
  Agama,
  HubunganKeluarga,
  StatusKawin,
  StatusPenduduk,
  StatusRumah,
  PenghasilanRange,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { fakerID_ID as faker } from "@faker-js/faker";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("--- START SEEDING KEPENDUDUKAN DATA ---");

  // 0. Cleanup existing data (Optional, but recommended for clean seeding)
  console.log("Cleaning up existing population data...");
  await prisma.mutasiPenduduk.deleteMany();
  await prisma.penduduk.deleteMany();
  await prisma.kK.deleteMany();
  await prisma.rumah.deleteMany();
  // await prisma.gang.deleteMany(); // Keep gangs as they are upserted

  // 1. Get Admin User for Auditing
  const admin = await prisma.user.findFirst({
    where: { email: "admin@me.id" },
  });
  const adminId = admin?.id;

  // 2. Create Gangs
  console.log("Seeding Gangs...");
  const gangNames = [
    "Icarus",
    "Daedalus",
    "Olympus",
    "Ares",
    "Athena",
    "Zeus",
    "Hera",
    "Poseidon",
    "Hades",
    "Hermes",
  ];
  const gangs = [];
  for (const name of gangNames) {
    const gang = await prisma.gang.upsert({
      where: { nama: `Gang ${name}` },
      update: {},
      create: {
        nama: `Gang ${name}`,
        keterangan: null,
        createdById: adminId,
      },
    });
    gangs.push(gang);
  }

  // 3. Create Rumah (400)
  console.log("Seeding 400 Houses...");
  const rumahs = [];
  for (let i = 1; i <= 400; i++) {
    const gang = faker.helpers.arrayElement(gangs);
    const rumah = await prisma.rumah.create({
      data: {
        nomor: `${i}`,
        gangId: gang.id,
        status: StatusRumah.DIHUNI,
        keterangan: null,
        createdById: adminId,
      },
    });
    rumahs.push(rumah);
  }

  // 4. Create KK and Residents
  console.log("Seeding 400 KKs and 900 Residents...");
  let totalResidents = 0;
  const targetResidents = 900;
  const totalKKs = 400;

  for (let i = 0; i < totalKKs; i++) {
    const rumah = rumahs[i];
    const nomorKK = faker.string.numeric(16);

    // Create KK
    const kk = await prisma.kK.create({
      data: {
        nomorKK,
        rumahId: rumah.id,
        alamat: null,
        createdById: adminId,
      },
    });

    // Create Kepala Keluarga
    const isMale = true; // Most heads are male in traditional datasets
    const headFirstName = faker.person.firstName("male");
    const headLastName = faker.person.lastName();
    const headName = `${headFirstName} ${headLastName}`;

    const head = await prisma.penduduk.create({
      data: {
        nik: faker.string.numeric(16),
        nama: headName,
        tempatLahir: faker.location.city(),
        tanggalLahir: faker.date.birthdate({ min: 30, max: 70, mode: "age" }),
        jenisKelamin: JenisKelamin.LAKI_LAKI,
        agama: faker.helpers.arrayElement(Object.values(Agama)),
        statusKawin: StatusKawin.KAWIN,
        hubunganKeluarga: HubunganKeluarga.KEPALA_KELUARGA,
        pendidikan: faker.helpers.arrayElement([
          Pendidikan.SMA,
          Pendidikan.D4_S1,
          Pendidikan.S2,
        ]),
        pekerjaan: faker.helpers.arrayElement([
          Pekerjaan.KARYAWAN_SWASTA,
          Pekerjaan.WIRASWASTA,
          Pekerjaan.PNS,
        ]),
        penghasilanRange: faker.helpers.arrayElement(
          Object.values(PenghasilanRange)
        ),
        kkId: kk.id,
        status: StatusPenduduk.AKTIF,
        createdById: adminId,
      },
    });

    totalResidents++;

    // Randomly add Istri (probability 80%)
    let wife: any = null;
    if (faker.datatype.boolean(0.8)) {
      wife = await prisma.penduduk.create({
        data: {
          nik: faker.string.numeric(16),
          nama: `${faker.person.firstName("female")} ${headLastName}`,
          tempatLahir: faker.location.city(),
          tanggalLahir: faker.date.birthdate({ min: 25, max: 65, mode: "age" }),
          jenisKelamin: JenisKelamin.PEREMPUAN,
          agama: faker.helpers.arrayElement(Object.values(Agama)),
          statusKawin: StatusKawin.KAWIN,
          hubunganKeluarga: HubunganKeluarga.ISTRI,
          pendidikan: faker.helpers.arrayElement([
            Pendidikan.SMA,
            Pendidikan.D4_S1,
          ]),
          pekerjaan: faker.helpers.arrayElement([
            Pekerjaan.IBU_RUMAH_TANGGA,
            Pekerjaan.KARYAWAN_SWASTA,
          ]),
          kkId: kk.id,
          status: StatusPenduduk.AKTIF,
          createdById: adminId,
        },
      });
      totalResidents++;
    }

    // Add Children (random 1-3)
    const childrenCount = faker.number.int({ min: 0, max: 2 });
    for (let j = 0; j < childrenCount; j++) {
      if (totalResidents >= targetResidents) break;

      const gender = faker.helpers.arrayElement([
        JenisKelamin.LAKI_LAKI,
        JenisKelamin.PEREMPUAN,
      ]);
      await prisma.penduduk.create({
        data: {
          nik: faker.string.numeric(16),
          nama: `${faker.person.firstName(
            gender === JenisKelamin.LAKI_LAKI ? "male" : "female"
          )} ${headLastName}`,
          tempatLahir: faker.location.city(),
          tanggalLahir: faker.date.birthdate({ min: 1, max: 25, mode: "age" }),
          jenisKelamin: gender,
          agama: faker.helpers.arrayElement(Object.values(Agama)),
          statusKawin: StatusKawin.BELUM_KAWIN,
          hubunganKeluarga: HubunganKeluarga.ANAK,
          pendidikan: faker.helpers.arrayElement([
            Pendidikan.SD,
            Pendidikan.SMP,
            Pendidikan.SMA,
            Pendidikan.TIDAK_SEKOLAH,
          ]),
          pekerjaan: Pekerjaan.PELAJAR_MAHASISWA,
          kkId: kk.id,
          status: StatusPenduduk.AKTIF,
          createdById: adminId,
        },
      });
      totalResidents++;
    }

    if (totalResidents >= targetResidents) break;
  }

  // If still not enough residents, fill up randomly
  while (totalResidents < targetResidents) {
    const kk = await prisma.kK.findFirst({
      skip: faker.number.int({ min: 0, max: 399 }),
    });
    if (!kk) break;

    const gender = faker.helpers.arrayElement([
      JenisKelamin.LAKI_LAKI,
      JenisKelamin.PEREMPUAN,
    ]);
    await prisma.penduduk.create({
      data: {
        nik: faker.string.numeric(16),
        nama: faker.person.fullName({
          sex: gender === JenisKelamin.LAKI_LAKI ? "male" : "female",
        }),
        tempatLahir: faker.location.city(),
        tanggalLahir: faker.date.birthdate({ min: 1, max: 80, mode: "age" }),
        jenisKelamin: gender,
        agama: faker.helpers.arrayElement(Object.values(Agama)),
        statusKawin: faker.helpers.arrayElement(Object.values(StatusKawin)),
        hubunganKeluarga: HubunganKeluarga.FAMILI_LAIN,
        penghasilanRange: faker.helpers.arrayElement(
          Object.values(PenghasilanRange)
        ),
        kkId: kk.id,
        status: StatusPenduduk.AKTIF,
        createdById: adminId,
      },
    });
    totalResidents++;
  }

  console.log(
    `--- SEEDING SUCCESS: ${totalResidents} Residents in ${totalKKs} KKs ---`
  );
}

main()
  .catch((e) => {
    console.error("Gagal saat seeding kependudukan:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
