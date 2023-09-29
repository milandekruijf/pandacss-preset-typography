import { definePreset } from "@pandacss/dev";
import { PresetOptions } from "./types";
import { createRecipe } from "./recipe";
import { createDefaultSemanticTokens } from "./semantic-tokens";

/**
 * Create a new PandaCSS typography preset.
 * Use the options to customize the preset to your liking.
 *
 * @param options Options to customize the preset to your liking.
 * @returns A newly created preset with the applied options.
 */
export function createPreset(options?: PresetOptions) {
  const { defaultSemanticTokens } = options?.recipe;

  return definePreset({
    theme: {
      extend: {
        recipes: {
          ...createRecipe(options?.recipe),
        },
        // Do not include when it has been explicitly set to false
        semanticTokens: defaultSemanticTokens !== false && {
          ...createDefaultSemanticTokens({
            prefix:
              typeof defaultSemanticTokens === "object"
                ? defaultSemanticTokens.prefix ?? options?.recipe?.name
                : options?.recipe?.name,
          }),
        },
      },
    },
  });
}
