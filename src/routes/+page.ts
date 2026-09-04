import { getPublicPage, navigationPages } from "$lib/discovery/publicPages";

export const load = () => {
  const page = getPublicPage("/");

  return {
    page,
    navigation: navigationPages.filter((page) => page.state === "indexable"),
    catalogExample: getPublicPage("/world/catalog-example"),
  };
};
