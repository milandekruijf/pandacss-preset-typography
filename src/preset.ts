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
        // TODO: Make it configurable within the preset for type completion.
        tokens: {
          colors: {
            prose: {
              body: {
                value: "{colors.slate.700}",
              },
              lead: {
                value: "{colors.slate.600}",
              },
              link: {
                value: "{colors.slate.900}",
              },
              counter: {
                value: "{colors.slate.500}",
              },
              bullet: {
                value: "{colors.slate.300}",
              },
              hr: {
                value: "{colors.slate.200}",
              },
              quote: {
                value: "{colors.slate.900}",
                border: {
                  value: "{colors.slate.200}",
                },
              },
              heading: {
                value: "{colors.slate.900}",
              },
              caption: {
                value: "{colors.slate.500}",
              },
              bold: {
                value: "{colors.slate.900}",
              },
              code: {
                value: "{colors.slate.900}",
              },
              pre: {
                code: {
                  value: "{colors.slate.200}",
                },
                bg: {
                  value: "{colors.slate.800}",
                },
              },
              th: {
                border: {
                  value: "{colors.slate.300}",
                },
              },
              td: {
                border: {
                  value: "{colors.slate.200}",
                },
              },
            },
          },
        },
      },
    },
  });
}

export default createTypographyPreset;
