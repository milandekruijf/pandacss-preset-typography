import { definePreset } from "@pandacss/dev";
import type { Preset } from "@pandacss/types";
import type { TypographyPresetOptions } from "./types";
import { getProseRecipeConfigRecord } from "./recipe";

/**
 * Creates a typography preset configuration based on the provided options.
 * If options are provided, it customizes the typography preset configuration accordingly;
 * otherwise, default values are used.
 *
 * @param options The options to customize the typography preset.
 * @returns The configuration for the typography preset.
 */
export function createTypographyPreset(options?: TypographyPresetOptions): Preset {
  return definePreset({
    theme: {
      extend: {
        recipes: getProseRecipeConfigRecord(options?.recipes?.prose),
      },
    },
  });
}
