import { createDataGetHandler } from "@/lib/api-data-response";
import { getSkillsAndInterests } from "@/lib/data";

export const GET = createDataGetHandler(
  getSkillsAndInterests,
  "Failed to load skills and interests"
);
