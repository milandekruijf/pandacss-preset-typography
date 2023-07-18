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
                value: "slate.700",
              },
              lead: {
                value: "slate.600",
              },
              link: {
                value: "slate.900",
              },
              counter: {
                value: "slate.500",
              },
              bullet: {
                value: "slate.300",
              },
              hr: {
                value: "slate.200",
              },
              quote: {
                value: "slate.900",
                border: {
                  value: "slate.200",
                },
              },
              heading: {
                value: "slate.900",
              },
              caption: {
                value: "slate.500",
              },
              bold: {
                value: "slate.900",
              },
              code: {
                value: "slate.900",
              },
              pre: {
                code: {
                  value: "slate.200",
                },
                bg: {
                  value: "slate.800",
                },
              },
              th: {
                border: {
                  value: "slate.300",
                },
              },
              td: {
                border: {
                  value: "slate.200",
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
