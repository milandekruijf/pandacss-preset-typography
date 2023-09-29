import { SemanticTokens, defineSemanticTokens } from "@pandacss/dev";
import { SemanticTokensOptions } from "./types";
import { DEFAULT_RECIPE_NAME } from "./constants";

export function createDefaultSemanticTokens(
  options?: SemanticTokensOptions
): SemanticTokens {
  const { defaults } = options;

  if (!defaults)
    throw new Error(
      "This function shouldn't be called as 'defaults' is either undefined or set to false"
    );

  const colorPalette =
    typeof defaults === "object" && (defaults.colorPalette ?? "slate");

  return defineSemanticTokens({
    colors: {
      [options?.prefix ?? DEFAULT_RECIPE_NAME]: {
        body: {
          value: `{colors.${colorPalette}.700}`,
        },
        heading: {
          value: `{colors.${colorPalette}.900}`,
        },
        lead: {
          value: `{colors.${colorPalette}.600}`,
        },
        link: {
          value: `{colors.${colorPalette}.900}`,
        },
        bold: {
          value: `{colors.${colorPalette}.900}`,
        },
        counter: {
          value: `{colors.${colorPalette}.500}`,
        },
        bullet: {
          value: `{colors.${colorPalette}.300}`,
        },
        hrBorder: {
          value: `{colors.${colorPalette}.200}`,
        },
        quote: {
          value: `{colors.${colorPalette}.900}`,
        },
        quoteBorder: {
          value: `{colors.${colorPalette}.200}`,
        },
        caption: {
          value: `{colors.${colorPalette}.500}`,
        },
        kbd: {
          value: `{colors.${colorPalette}.900}`,
        },
        kbdShadow: {
          // Expects an RGB value
          value: "0 0 0",
        },
        code: {
          value: `{colors.${colorPalette}.900}`,
        },
        preCode: {
          value: `{colors.${colorPalette}.200}`,
        },
        preBg: {
          value: `{colors.${colorPalette}.800}`,
        },
        thBorder: {
          value: `{colors.${colorPalette}.300}`,
        },
        tdBorder: {
          value: `{colors.${colorPalette}.200}`,
        },
      },
    },
  });
}
