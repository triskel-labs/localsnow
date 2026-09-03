import {
  getRegionForResort,
  getResortBySlug,
  getResortRobots,
  getResortStatusCopy,
} from "$lib/catalog/resorts";

const resort = getResortBySlug("baqueira");

export const load = () => ({
  resort,
  region: resort ? getRegionForResort(resort) : undefined,
  robots: resort ? getResortRobots(resort) : "noindex,nofollow",
  status: resort ? getResortStatusCopy(resort) : "Resort not found.",
});
