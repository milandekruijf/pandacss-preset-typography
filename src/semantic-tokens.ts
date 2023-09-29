import { SemanticTokens, defineSemanticTokens } from "@pandacss/dev";
import { DefaultSemanticTokensOptions } from "./types";
import { DEFAULT_RECIPE_NAME } from "./constants";

export function createDefaultSemanticTokens(
  options?: DefaultSemanticTokensOptions
): SemanticTokens {
  const palette = options?.palette ?? "slate";

  return defineSemanticTokens({
    colors: {
      [options?.prefix ?? DEFAULT_RECIPE_NAME]: {
        body: {
          value: `{colors.${palette}.700}`,
        },
        heading: {
          value: `{colors.${palette}.900}`,
        },
        lead: {
          value: `{colors.${palette}.600}`,
        },
        link: {
          value: `{colors.${palette}.900}`,
        },
        bold: {
          value: `{colors.${palette}.900}`,
        },
        counter: {
          value: `{colors.${palette}.500}`,
        },
        bullet: {
          value: `{colors.${palette}.300}`,
        },
        hrBorder: {
          value: `{colors.${palette}.200}`,
        },
        quote: {
          value: `{colors.${palette}.900}`,
        },
        quoteBorder: {
          value: `{colors.${palette}.200}`,
        },
        caption: {
          value: `{colors.${palette}.500}`,
        },
        kbd: {
          value: `{colors.${palette}.900}`,
        },
        kbdShadow: {
          // Expects an RGB value
          value: "0 0 0",
        },
        code: {
          value: `{colors.${palette}.900}`,
        },
        preCode: {
          value: `{colors.${palette}.200}`,
        },
        preBg: {
          value: `{colors.${palette}.800}`,
        },
        thBorder: {
          value: `{colors.${palette}.300}`,
        },
        tdBorder: {
          value: `{colors.${palette}.200}`,
        },
      },
    },
  });
}
