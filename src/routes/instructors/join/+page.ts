import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  signals: [
    "more qualified clients",
    "fair commission when LocalSnow brings work",
    "resorts served",
    "sports taught",
    "starting price",
    "simple availability pattern",
  ],
});
