import { defineRecipe } from "@pandacss/dev";
import type { RecipeConfig } from "@pandacss/types";
import { extractTwProseCss } from "./tw/css";
import type { ProseRecipeOptions } from "./types";
import { DEFAULT_PROSE_RECIPE_CLASS_NAME } from "./constants";
import { mergeWithDefaultColors } from "./utils";

/**
 * Creates a prose recipe.
 *
 * @param options The options for the prose recipe.
 * @returns The prose recipe.
 */
export function createProseRecipe(options?: ProseRecipeOptions): RecipeConfig {
  const className = options?.name ?? DEFAULT_PROSE_RECIPE_CLASS_NAME;
  const jsx = options?.jsx ?? [];

  // Merging the colors with the default colors.
  const colors = mergeWithDefaultColors(options?.colors || {});

  const extractedTwCss = extractTwProseCss({
    varMap: {
      body: colors.body,
      lead: colors.lead,
      links: colors.link,
      bold: colors.bold,
      counters: colors.counter,
      bullets: colors.bullet,
      headings: colors.heading,
      hr: colors.hrBorder,
      quotes: colors.quote,
      "quote-borders": colors.quoteBorder,
      kbd: colors.kbd,
      "kbd-shadows": colors.kbdShadowRgb,
      code: colors.code,
      "pre-code": colors.preCode,
      "pre-bg": colors.preBackground,
      captions: colors.caption,
      "th-borders": colors.thBorder,
      "td-borders": colors.tdBorder,
    },
  });

  const { DEFAULT: base, ...size } = extractedTwCss;

  return defineRecipe({
    className,
    description: `The ${className} recipe`,
    jsx,
    defaultVariants: {
      size: "base",
    },
    base,
    variants: {
      size,
    },
  });
}

export default createProseRecipe;
