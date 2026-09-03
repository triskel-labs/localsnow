import { getPublicPage, publicPages } from "$lib/discovery/publicPages";

export const load = () => {
  const page = getPublicPage("/");

  return {
    page,
    navigation: publicPages.filter((page) => page.state === "indexable"),
    catalogExample: getPublicPage("/world/catalog-example"),
  };
};
