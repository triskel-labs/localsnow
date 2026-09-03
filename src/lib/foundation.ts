export type FoundationSlice = {
  id: string;
  title: string;
  purpose: string;
  notIncluded: string[];
};

export const b0Foundation: FoundationSlice = {
  id: "B0",
  title: "Technical foundation scaffold",
  purpose:
    "Create the minimal SvelteKit foundation that later LocalSnow slices can build on safely.",
  notIncluded: [
    "product database schema",
    "payments",
    "email delivery",
    "availability engine",
    "final public copy",
  ],
};

export const getFoundationSummary = () =>
  `${b0Foundation.id}: ${b0Foundation.title} — ${b0Foundation.purpose}`;
