import { defineRecipe } from "@pandacss/dev";
import type { RecipeConfig } from "@pandacss/types";

export interface RecipeOptions {}

export function createRecipe(options?: RecipeOptions): RecipeConfig {
  return defineRecipe({
    name: "typography",
    base: {},
    variants: {
      size: {
        sm: {},
        base: {},
        lg: {},
        xl: {},
        "2xl": {},
      },
    },
    defaultVariants: {
      size: "base",
    },
  });
}

export default createRecipe;
