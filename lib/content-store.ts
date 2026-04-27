import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

export type AdminResource =
  | "config"
  | "projects"
  | "work-experience"
  | "education"
  | "timeline"
  | "skills-interests"
  | "lives"
  | "status";

export type AdminLanguage = "en" | "zh";

const localizedResources = new Set<AdminResource>([
  "config",
  "projects",
  "work-experience",
  "education",
  "timeline",
  "skills-interests",
  "lives",
]);

export const adminResources: AdminResource[] = [
  "config",
  "projects",
  "work-experience",
  "education",
  "timeline",
  "skills-interests",
  "lives",
  "status",
];

const dataDirectory = path.join(process.cwd(), "data");
const storageDirectory = path.join(process.cwd(), "storage");
const railwayVolumePath = process.env.RAILWAY_VOLUME_MOUNT_PATH;
const databasePath =
  process.env.DATABASE_PATH ||
  (railwayVolumePath
    ? path.join(railwayVolumePath, "site-content.db")
    : path.join(storageDirectory, "site-content.db"));

let database: Database.Database | null = null;
let initialized = false;

export function isLocalizedResource(resource: AdminResource) {
  return localizedResources.has(resource);
}

export function getContentFilename(resource: AdminResource, language: AdminLanguage) {
  const suffix = isLocalizedResource(resource) && language === "zh" ? "-zh" : "";
  return `${resource}${suffix}.json`;
}

function getSeedFilePath(resource: AdminResource, language: AdminLanguage) {
  return path.join(dataDirectory, getContentFilename(resource, language));
}

function getDatabase() {
  if (!database) {
    fs.mkdirSync(storageDirectory, { recursive: true });
    database = new Database(databasePath);
    database.pragma("journal_mode = WAL");
  }

  if (!initialized) {
    initializeDatabase(database);
    initialized = true;
  }

  return database;
}

function initializeDatabase(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS content_entries (
      resource TEXT NOT NULL,
      language TEXT NOT NULL,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (resource, language)
    )
  `);

  const count = db.prepare("SELECT COUNT(*) as count FROM content_entries").get() as {
    count: number;
  };

  if (count.count > 0) {
    return;
  }

  const insertEntry = db.prepare(`
    INSERT INTO content_entries (resource, language, data, updated_at)
    VALUES (@resource, @language, @data, @updatedAt)
  `);

  const now = new Date().toISOString();
  const languages: AdminLanguage[] = ["en", "zh"];

  for (const resource of adminResources) {
    for (const language of languages) {
      if (!isLocalizedResource(resource) && language === "zh") {
        continue;
      }

      const seedPath = getSeedFilePath(resource, language);
      if (!fs.existsSync(seedPath)) {
        continue;
      }

      const contents = fs.readFileSync(seedPath, "utf8");
      insertEntry.run({
        resource,
        language,
        data: contents,
        updatedAt: now,
      });
    }
  }
}

function normalizeLanguage(resource: AdminResource, language: AdminLanguage) {
  return isLocalizedResource(resource) ? language : "en";
}

export function readStoredData(resource: AdminResource, language: AdminLanguage) {
  const db = getDatabase();
  const normalizedLanguage = normalizeLanguage(resource, language);
  const row = db
    .prepare(
      `
        SELECT data
        FROM content_entries
        WHERE resource = ? AND language = ?
      `
    )
    .get(resource, normalizedLanguage) as { data: string } | undefined;

  if (!row) {
    throw new Error(`Missing content entry for ${resource}/${normalizedLanguage}`);
  }

  return JSON.parse(row.data) as unknown;
}

export function writeStoredData(
  resource: AdminResource,
  language: AdminLanguage,
  data: unknown
) {
  const db = getDatabase();
  const normalizedLanguage = normalizeLanguage(resource, language);
  const serialized = JSON.stringify(data, null, 2);

  db.prepare(
    `
      INSERT INTO content_entries (resource, language, data, updated_at)
      VALUES (@resource, @language, @data, @updatedAt)
      ON CONFLICT(resource, language) DO UPDATE SET
        data = excluded.data,
        updated_at = excluded.updated_at
    `
  ).run({
    resource,
    language: normalizedLanguage,
    data: serialized,
    updatedAt: new Date().toISOString(),
  });

  return JSON.parse(serialized) as unknown;
}

export function getDatabasePath() {
  return databasePath;
}
