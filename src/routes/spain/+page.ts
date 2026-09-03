import {
  getResortRobots,
  getResortStatusCopy,
  priorityResorts,
} from "$lib/catalog/resorts";
import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/spain"),
  priorityResorts: priorityResorts.map((resort) => ({
    ...resort,
    href: `/spain/${resort.slug}`,
    robots: getResortRobots(resort),
    status: getResortStatusCopy(resort),
  })),
});
