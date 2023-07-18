import { definePreset } from "@pandacss/dev";
import type { Preset } from "@pandacss/types";
import { DEFAULT_PROSE_RECIPE_NAME, createProseRecipe } from "./prose";
import type { TypographyPresetOptions } from "./types";

/**
 * Creates a typography preset.
 *
 * @param options The options for the typography preset.
 * @returns The typography preset.
 */
export function createTypographyPreset(
  options?: TypographyPresetOptions
): Preset {
  const proseRecipeName = options?.prose?.name ?? DEFAULT_PROSE_RECIPE_NAME;

  return definePreset({
    theme: {
      extend: {
        recipes: {
          [proseRecipeName]: createProseRecipe(options?.prose),
        },
      },
    },
  });
}

export default createTypographyPreset;
