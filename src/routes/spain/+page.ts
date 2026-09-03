import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/spain"),
  priorityResorts: [
    {
      name: "Baqueira",
      href: "/spain/baqueira",
      status: "Priority resort shell",
    },
    {
      name: "La Molina",
      href: "#la-molina-pending",
      status: "Priority resort queued",
    },
    {
      name: "Cerler",
      href: "#cerler-pending",
      status: "Priority resort queued",
    },
  ],
});
