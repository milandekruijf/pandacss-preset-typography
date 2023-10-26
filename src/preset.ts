import { definePreset } from "@pandacss/dev";
import { PresetOptions } from "./types";
import { createRecipe } from "./recipe";
import { createSemanticTokens } from "./semantic-tokens";
import type { Preset } from "@pandacss/types";

/**
 * Create a new PandaCSS typography preset.
 * Use the options to customize the preset to your liking.
 *
 * @param options Options to customize the preset to your liking.
 * @returns A newly created preset with the applied options.
 */
export function createPreset(options?: PresetOptions): Preset {
  const semanticTokens = options?.recipe?.semanticTokens;

  return definePreset({
    theme: {
      extend: {
        recipes: {
          ...createRecipe(options?.recipe),
        },
        // Do not include when it has been explicitly set to false
        semanticTokens:
          semanticTokens?.defaults !== false
            ? {
                ...createSemanticTokens({
                  defaults: semanticTokens?.defaults ?? true,
                  prefix: semanticTokens?.prefix ?? options?.recipe?.name,
                }),
              }
            : undefined,
      },
    },
  });
}
