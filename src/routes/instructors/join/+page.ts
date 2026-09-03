import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  signals: [
    "resorts served",
    "sports taught",
    "lesson types",
    "starting price",
    "availability pattern",
  ],
});
