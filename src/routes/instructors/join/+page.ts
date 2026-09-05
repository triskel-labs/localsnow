import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";
import { getProfileIntakeContracts } from "$lib/supply/profileIntake";
import { getProviderSetupGuide } from "$lib/supply/profileSetup";

const promise = getProviderReachPromise();
const setupGuide = getProviderSetupGuide();
const intakeContracts = getProfileIntakeContracts();

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  promise,
  setupGuide,
  intakeContracts,
  signals: [
    promise.benefits[0],
    promise.benefits[2],
    promise.benefits[3],
    "resorts served",
    "sports taught",
    "private legal name kept separate from public display name",
    "starter lesson offer or inherited school pricing",
    "simple availability pattern",
  ],
});
