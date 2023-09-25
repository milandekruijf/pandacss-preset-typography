import { definePreset } from "@pandacss/dev";
import type { Preset } from "@pandacss/types";
import { createProseRecipe } from "./prose/recipe";
import type { TypographyPresetOptions } from "./types";
import { DEFAULT_PROSE_RECIPE_CLASS_NAME } from "./prose/constants";

/**
 * Creates a typography preset.
 *
 * @param options The options for the typography preset.
 * @returns The typography preset.
 */
export function createTypographyPreset(options?: TypographyPresetOptions): Preset {
  const proseRecipeClassName = options?.prose?.name ?? DEFAULT_PROSE_RECIPE_CLASS_NAME;

  return definePreset({
    theme: {
      extend: {
        recipes: {
          [proseRecipeClassName]: createProseRecipe(options?.prose),
        },
      },
    },
  });
}

export default createTypographyPreset;
