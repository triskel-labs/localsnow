import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";
import { getProviderSetupGuide } from "$lib/supply/profileSetup";

const promise = getProviderReachPromise();
const setupGuide = getProviderSetupGuide();

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  promise,
  setupGuide,
  signals: [
    promise.benefits[0],
    promise.benefits[2],
    promise.benefits[3],
    "resorts served",
    "sports taught",
    "starting price or inherited school pricing",
    "simple availability pattern",
  ],
});
