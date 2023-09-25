import { defineRecipe } from "@pandacss/dev";
import type { RecipeConfig, SystemStyleObject } from "@pandacss/types";
import type { ProseRecipeOptions } from "./types";
import { getCssDefaults, getCssForSizes } from "./extract";
import { DEFAULT_RECIPE_CLASS_NAME, DEFAULT_RECIPE_NAME, DEFAULT_TW_VARS } from "./constants";
import { joinMap } from "./utils";

/**
 * Creates a Prose Recipe configuration based on the provided options.
 * If options are provided, it customizes the recipe configuration accordingly;
 * otherwise, default values are used.
 *
 * @param options The options to customize the Prose Recipe.
 * @returns The configuration for the Prose Recipe.
 */
export function createProseRecipe(options?: ProseRecipeOptions): RecipeConfig {
  const vars = getProseRecipeTwVars(options);

  return defineRecipe({
    className: getProseRecipeClassName(options),
    jsx: options?.jsx,
    defaultVariants: {
      size: "base",
    },
    base: getCssDefaults({ vars }) as any,
    variants: {
      size: getCssForSizes({ vars }) as any,
    },
  });
}

/**
 * Retrieves the CSS class name for a Prose Recipe based on the given options.
 * If the options include a custom class name, it is returned; otherwise, the default class name is used.
 *
 * @param options The options for the Prose Recipe.
 * @returns The CSS class name for the Prose Recipe.
 */
export function getProseRecipeClassName(options?: ProseRecipeOptions): string {
  return options?.className ?? DEFAULT_RECIPE_CLASS_NAME;
}

/**
 * Retrieves the name of a Prose Recipe based on the given options.
 * If the options include a custom name, it is returned; otherwise, the default name is used.
 *
 * @param options The options for the Prose Recipe.
 * @returns The name of the Prose Recipe.
 */
export function getProseRecipeName(options?: ProseRecipeOptions): string {
  return options?.name ?? DEFAULT_RECIPE_NAME;
}

/**
 * Creates a configuration record for a Prose Recipe based on the provided options.
 * If the options are an array, this function recursively processes each element and returns a record.
 * Otherwise, it creates a single record with the recipe name as the key and the corresponding recipe configuration.
 *
 * @param options - The options or array of options for the Prose Recipe.
 * @return The configuration record for the Prose Recipe(s).
 */
export function getProseRecipeConfigRecord(
  options: ProseRecipeOptions | ProseRecipeOptions[]
): Record<string, RecipeConfig> {
  if (Array.isArray(options)) return joinMap(options, getProseRecipeConfigRecord);

  return {
    [getProseRecipeName(options)]: createProseRecipe(options),
  };
}

export function getProseRecipeTwVars(options: ProseRecipeOptions) {
  return options?.vars ?? DEFAULT_TW_VARS;
}
