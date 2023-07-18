import type { ProseRecipeColorsOption } from "./types";

/**
 * The default colors for the prose recipe.
 */
export const DEFAULT_PROSE_RECIPE_COLORS: ProseRecipeColorsOption = {
  body: "slate.700",
  lead: "slate.600",
  link: "slate.900",
  counter: "slate.500",
  bullet: "slate.300",
  hrBorder: "slate.200",
  quote: "slate.900",
  quoteBorder: "slate.200",
  heading: "slate.900",
  caption: "slate.500",
  bold: "slate.900",
  code: "slate.900",
  preCode: "slate.200",
  preBackground: "slate.800",
  thBorder: "slate.300",
  tdBorder: "slate.200",
};

/**
 * Merges the given colors with the default colors.
 *
 * @param colors The colors to merge.
 * @returns The merged colors.
 */
export function mergeWithDefaultColors(
  colors?: Partial<ProseRecipeColorsOption>
) {
  return {
    ...DEFAULT_PROSE_RECIPE_COLORS,
    ...colors,
  };
}
