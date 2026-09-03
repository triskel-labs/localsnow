import { json } from "@sveltejs/kit";

export const GET = () => {
  return json({
    status: "ok",
    service: "localsnow",
    phase: "b0-technical-foundation",
  });
};
