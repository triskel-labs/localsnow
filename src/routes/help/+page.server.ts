import { helpActions, loadHelpRoute } from "$lib/contact/helpRoute.server";

export const load = loadHelpRoute("en");
export const actions = helpActions("en");
