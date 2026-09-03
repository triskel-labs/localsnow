import { getPublicPage } from "$lib/discovery/publicPages";

export const load = () => ({
  page: getPublicPage("/world/catalog-example"),
});
