import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/spain/baqueira"),
  facts: [
    "Priority Spain resort shell",
    "Requestable lesson options will come after catalog and supply slices",
    "Availability copy must not promise instant confirmation or perfect live calendars",
  ],
});
