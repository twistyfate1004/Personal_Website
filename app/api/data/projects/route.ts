import { createDataGetHandler } from "@/lib/api-data-response";
import { getProjects } from "@/lib/data";

export const GET = createDataGetHandler(getProjects, "Failed to load projects");
