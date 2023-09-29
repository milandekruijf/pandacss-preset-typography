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
  const sizes: any = {};
  (options?.sizes ?? SIZES).forEach((size) => (sizes[size] = css[size]));

  return {
    [name]: defineRecipe({
      className,
      description:
        options?.description ?? "Generated using 🐼 pandacss-preset-typography",
      base: css.default,
      defaultVariants: {
        size: "base" in sizes ? "base" : Object.keys(sizes)[0],
      },
      variants: {
        size: sizes,
      },
      jsx: options?.jsx,
    }),
  };
}
