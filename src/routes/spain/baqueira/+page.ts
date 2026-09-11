import {
  getRegionForResort,
  getResortBySlug,
  getResortRobots,
  getResortStatusCopy,
} from "$lib/catalog/resorts";
import { getHelpPlacement } from "$lib/contact/helpIntents";

const resort = getResortBySlug("baqueira");

export const load = () => ({
  resort,
  region: resort ? getRegionForResort(resort) : undefined,
  robots: resort ? getResortRobots(resort) : "noindex,nofollow",
  status: resort ? getResortStatusCopy(resort) : "Resort not found.",
  assistedHelp: getHelpPlacement("resortThinSupply", "es"),
});
