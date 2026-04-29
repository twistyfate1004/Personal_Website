import { createDataGetHandler } from "@/lib/api-data-response";
import { getWorkExperiences } from "@/lib/data";

export const GET = createDataGetHandler(
  getWorkExperiences,
  "Failed to load work experiences"
);
