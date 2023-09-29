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
    notProse: options?.notProse,
  });

  // Only add the sizes the user wants.
  const sizes: any = {};
  (options?.sizes ?? SIZES).forEach((size) => (sizes[size] = css[size]));

  // Make sure there's at least 1 size included.
  if (Object.keys(sizes).length === 0)
    throw new Error("Include at least one size");

  // Get the default size.
  const defaultSize =
    options?.defaultSize ?? ("base" in sizes ? "base" : Object.keys(sizes)[0]);

  // Make sure the set default size is actually included.
  if (!(defaultSize in sizes))
    throw new Error(
      "You cannot set a default size to a size that is not included"
    );

  return {
    [name]: defineRecipe({
      className,
      description:
        options?.description ?? "Generated using 🐼 pandacss-preset-typography",
      base: css.default,
      defaultVariants: {
        size: defaultSize,
      },
      variants: {
        size: sizes,
      },
      jsx: options?.jsx,
    }),
  };
}
