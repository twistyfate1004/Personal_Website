import {
  AdminLanguage,
  AdminResource,
  adminResources,
  getContentFilename,
  readStoredData,
  writeStoredData,
} from "@/lib/content-store";

export type { AdminLanguage, AdminResource };
export { adminResources };

export function getAdminDataFilename(resource: AdminResource, language: AdminLanguage) {
  if (!adminResources.includes(resource)) {
    throw new Error("Unsupported resource");
  }

  return getContentFilename(resource, language);
}

export async function readAdminData(resource: AdminResource, language: AdminLanguage) {
  return readStoredData(resource, language);
}

export async function writeAdminData(
  resource: AdminResource,
  language: AdminLanguage,
  data: unknown
) {
  return writeStoredData(resource, language, data);
}
