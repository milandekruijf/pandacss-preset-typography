import type { ProseRecipeColorsOption } from "./types";
import { DEFAULT_PROSE_RECIPE_COLORS } from "./constants";

/**
 * Merges the given colors with the default colors.
 *
 * @param colors The colors to merge.
 * @returns The merged colors.
 */
export function mergeWithDefaultColors(colors?: Partial<ProseRecipeColorsOption>) {
  return {
    ...DEFAULT_PROSE_RECIPE_COLORS,
    ...colors,
  };
}
