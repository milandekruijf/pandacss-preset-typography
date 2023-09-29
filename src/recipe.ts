import { defineRecipe } from "@pandacss/dev";
import type { RecipeOptions } from "./types";
import { getCssFromTailwind } from "./tailwind";
import { DEFAULT_RECIPE_NAME, SIZES } from "./constants";

export function createRecipe(options?: RecipeOptions) {
  const name = options?.name ?? DEFAULT_RECIPE_NAME;
  const className = options?.className ?? name;

  // Get the styles from TailwindCSS's typography plugin
  const { semanticTokens } = options;
  const css = getCssFromTailwind({
    varPrefix:
      semanticTokens && typeof semanticTokens === "object"
        ? semanticTokens?.prefix ?? name
        : name,
    notProse: options?.not,
  });

  // Only add the sizes the user wants.
  const variants = {};
  (options?.sizes ?? SIZES).forEach((size) => (variants[size] = css[size]));

  return {
    [name]: defineRecipe({
      className,
      base: css.default,
      variants: {
        size: variants,
      },
    }),
  };
}
