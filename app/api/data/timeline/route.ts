import { createDataGetHandler } from "@/lib/api-data-response";
import { getTimeline } from "@/lib/data";

export const GET = createDataGetHandler(getTimeline, "Failed to load timeline");
