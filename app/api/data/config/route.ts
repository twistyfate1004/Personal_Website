import { createDataGetHandler } from "@/lib/api-data-response";
import { getConfig } from "@/lib/data";

export const GET = createDataGetHandler(getConfig, "Failed to load config");
