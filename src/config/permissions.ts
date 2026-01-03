export const PERMISSIONS = [
  { name: "user:read", description: "melihat daftar user" },
  { name: "user:assign", description: "mengassign role ke user" },
  {
    name: "user:activation",
    description: "mengaktifkan / menonaktifkan user",
  },
  { name: "role:read", description: "melihat daftar role" },
  { name: "role:create", description: "membuat role baru" },
  { name: "role:manage", description: "mengelola role dan permission" },
  { name: "role:delete", description: "menghapus role" },
  { name: "dashboard:read", description: "mengakses halaman dashboard" },

  // Gang Permissions
  { name: "gang:read", description: "melihat data gang" },
  { name: "gang:create", description: "menambah data gang" },
  { name: "gang:edit", description: "mengubah data gang" },
  { name: "gang:delete", description: "menghapus data gang" },

  // Rumah Permissions
  { name: "rumah:read", description: "melihat data rumah" },
  { name: "rumah:create", description: "menambah data rumah" },
  { name: "rumah:edit", description: "mengubah data rumah" },
  { name: "rumah:delete", description: "menghapus data rumah" },

  // KK Permissions
  { name: "kk:read", description: "melihat data KK" },
  { name: "kk:create", description: "menambah data KK" },
  { name: "kk:edit", description: "mengubah data KK" },
  { name: "kk:delete", description: "menghapus data KK" },
  { name: "kk:detail", description: "melihat detail data KK" },

  // Penduduk Permissions
  { name: "penduduk:read", description: "melihat data penduduk" },
  { name: "penduduk:create", description: "menambah data penduduk" },
  { name: "penduduk:edit", description: "mengubah data penduduk" },
  { name: "penduduk:delete", description: "menghapus data penduduk" },
  { name: "penduduk:detail", description: "melihat detail data penduduk" },

  // Mutasi Permissions
  { name: "mutasi:read", description: "melihat riwayat mutasi" },
  { name: "mutasi:create", description: "mencatat mutasi baru" },
  { name: "mutasi:edit", description: "mengubah data mutasi" },
  { name: "mutasi:delete", description: "menghapus data mutasi" },

  // dashboard kependudukan
  { name: "dashboardKependudukan:read", description: "melihat data penduduk" },
] as const;

export type PermissionName = (typeof PERMISSIONS)[number]["name"];

export const SUPER_ADMIN_EMAIL = "admin@alakbar.com";
export const SUPER_ADMIN_ROLE = "SUPER_ADMIN";
