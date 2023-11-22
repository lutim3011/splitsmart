import { capitalize } from "radash";

export const getDynamicFilter = label => {
  if (!label) return undefined;
  return capitalize(label.replace(":", ""));
};
