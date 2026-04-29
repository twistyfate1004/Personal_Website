import { createDataGetHandler } from "@/lib/api-data-response";
import { getEducation } from "@/lib/data";

export const GET = createDataGetHandler(getEducation, "Failed to load education");
