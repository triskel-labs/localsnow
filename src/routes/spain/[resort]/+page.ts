import { error } from "@sveltejs/kit";
import {
  getRegionForResort,
  getResortBySlug,
  getResortRobots,
  getResortStatusCopy,
} from "$lib/catalog/resorts";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const resort = getResortBySlug(params.resort);

  if (!resort) {
    error(404, "Resort not found");
  }

  return {
    resort,
    region: getRegionForResort(resort),
    robots: getResortRobots(resort),
    status: getResortStatusCopy(resort),
  };
};
