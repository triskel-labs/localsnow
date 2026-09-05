import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";

const promise = getProviderReachPromise();

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  signals: [
    promise.benefits[0],
    promise.benefits[2],
    promise.benefits[3],
    "resorts served",
    "sports taught",
    "starting price",
    "simple availability pattern",
  ],
});
