"use server";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { verifyPermission } from "./rbac";
import { PermissionName } from "@/config/permissions";
import { INCOME_LABELS } from "@/config/kependudukan";
import { PenghasilanRange } from "@/types/prisma-enums";

function buildWhereClause(searchField: string, searchValue: string) {
  const parts = searchField.split(".");
  const root: any = {};
  let current = root;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      // Enum handling: detect enum fields and use exact or IN matches
      if (part === "penghasilanRange") {
        const matchingEnums = Object.entries(INCOME_LABELS)
          .filter(([_, label]) =>
            label.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map(([value, _]) => value);

        if (matchingEnums.length > 0) {
          current[part] = { in: matchingEnums };
        } else {
          // If no specific labels match, try to see if the search term matches any enum key values directly (case-insensitive)
          const allValues = Object.values(PenghasilanRange);
          const matchedValues = allValues.filter((v) =>
            v.toLowerCase().includes(searchValue.toLowerCase())
          );
          if (matchedValues.length > 0) {
            current[part] = { in: matchedValues };
          } else {
            // No match found, use a non-matching value to effectively nullify this branch
            current[part] = { in: [] };
          }
        }
      } else {
        current[part] = { contains: searchValue, mode: "insensitive" };
      }
    } else {
      current[part] = {};
      current = current[part];
    }
  }
  return root;
}

export interface DataTableParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchField?: string;
}

export type PrismaModelName = Uncapitalize<Prisma.ModelName>;

// Define searchable fields for each model
const SEARCHABLE_FIELDS: Record<PrismaModelName, string[]> = {
  user: ["name", "email"],
  role: ["name", "description", "users.some.user.email"],
  permission: ["name", "description"],
  userRole: [],
  rolePermission: [],
  verificationToken: ["email"],
  passwordResetToken: ["email"],
  gang: ["nama", "keterangan", "ketuaGang.nama"],
  rumah: ["nomor", "keterangan", "gang.nama"],
  kK: [
    "nomorKK",
    "alamat",
    "rumah.nomor",
    "penduduk.some.nama",
    "penduduk.some.penghasilanRange",
  ],
  penduduk: [
    "nik",
    "nama",
    "tempatLahir",
    "kk.nomorKK",
    "kk.rumah.nomor",
    "kk.rumah.gang.nama",
  ],
  mutasiPenduduk: ["penduduk.nama", "alasan"],
};

// Define default includes for each model (e.g. relations or counts needed for display)
const INCLUDE_CONFIG: Partial<Record<PrismaModelName, any>> = {
  user: {
    _count: {
      select: { roles: true },
    },
  },
  gang: {
    ketuaGang: true,
    _count: { select: { rumah: true } },
  },
  rumah: {
    gang: true,
    _count: { select: { kk: true } },
  },
  kK: {
    rumah: { include: { gang: true } },
    penduduk: true,
    _count: { select: { penduduk: true } },
  },
  penduduk: {
    kk: {
      include: {
        rumah: {
          include: { gang: true },
        },
      },
    },
    ketuaGang: true,
  },
  mutasiPenduduk: {
    penduduk: true,
  },
};

export async function getPaginatedData<T extends PrismaModelName>(
  model: T,
  params: DataTableParams
) {
  console.log(`[DataTableServer] Fetching data for model: ${model}`);

  // Determine required permission
  // Default: [model]:read
  let requiredPermission: PermissionName = `${model}:read` as PermissionName;

  // Special mapping for mutasiPenduduk -> mutasi:read
  if (model === "mutasiPenduduk") {
    requiredPermission = "mutasi:read";
  } else if (model === "kK") {
    requiredPermission = "kk:read";
  }

  const hasPerm = await verifyPermission(requiredPermission);
  console.log(`[DataTableServer] hasPerm for ${model}: ${hasPerm}`);

  if (!hasPerm) {
    console.error(`[DataTableServer] Permission denied for ${model}`);
    throw new Error(`Forbidden: You do not have permission to read ${model}`);
  }
  const { page = 1, pageSize = 10, sortBy, sortOrder = "asc", search } = params;

  const skip = (page - 1) * pageSize;

  const where: any = {};

  if (search) {
    const searchFields = SEARCHABLE_FIELDS[model] || [];
    if (searchFields.length > 0) {
      where.OR = searchFields.map((field) => buildWhereClause(field, search));
    }
  }

  // We use any here because Prisma's dynamic model access is notoriously hard to type perfectly
  // without complex mapped types, but we constrain the 'model' parameter to valid names.
  const delegate = (prisma as any)[model];

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" };

  // Advanced include/select logic for specifically enriched models
  const queryOptions: any = {
    where,
    orderBy,
    take: pageSize,
    skip,
  };

  if (INCLUDE_CONFIG[model]) {
    queryOptions.include = INCLUDE_CONFIG[model];
  }

  try {
    const [data, total] = await Promise.all([
      delegate.findMany(queryOptions),
      delegate.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error: any) {
    // If createdAt sorting fails (e.g. model doesn't have it yet), try without default sorting
    if (!sortBy && error.message?.includes("createdAt")) {
      const [data, total] = await Promise.all([
        delegate.findMany({ ...queryOptions, orderBy: undefined }),
        delegate.count({ where }),
      ]);
      return {
        data,
        meta: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }
    throw error;
  }
}

export async function deleteData<T extends PrismaModelName>(
  model: T,
  id: string
) {
  let requiredPermission: PermissionName = `${model}:delete` as PermissionName;

  if (model === "mutasiPenduduk") {
    requiredPermission = "mutasi:delete";
  } else if (model === "kK") {
    requiredPermission = "kk:delete";
  }

  const hasPerm = await verifyPermission(requiredPermission);

  if (!hasPerm) {
    return {
      error: `Forbidden: You do not have permission to delete ${model}`,
    };
  }

  try {
    const delegate = (prisma as any)[model];
    await delegate.delete({
      where: { id },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || `Failed to delete ${model}` };
  }
}
