import { createDataGetHandler } from "@/lib/api-data-response";
import { getLives } from "@/lib/data";

export const GET = createDataGetHandler(getLives, "Failed to load lives");
