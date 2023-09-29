import { SIZES } from "./constants";

export type PresetOptions = {
  /**
   * Customize the 'prose' recipe that is included
   * with this preset.
   */
  recipe?: RecipeOptions;
};

export type RecipeOptions = {
  /**
   * Choose a name to be used to export the recipe.
   * Useful to change if you have another recipe with
   * the same name.
   *
   * @default 'prose'
   */
  name?: string;
  /**
   * Choose a class name to be used by the recipe.
   *
   * If not set, the recipe's name will
   * be used.
   */
  className?: string;
  /**
   * Choose what size variants to include in the recipe.
   *
   * All of them are included by default if nothing
   * is provided. You need to choose at least one.
   */
  sizes?: (typeof SIZES)[number][];
  /**
   * If you want to enable not-prose functionality.
   *
   * You may provide an object if you want to set a
   * custom class name.
   */
  not?: boolean | NotOptions;
  /**
   * Set whether or not you want to include the default
   * semantic tokens.
   *
   * You may provide an object if you want to set
   * a custom prefix.
   *
   * @default true
   */
  defaultSemanticTokens?: boolean | DefaultSemanticTokensOptions;
  /**
   * Advanced JSX tracking
   *
   * @see https://panda-css.com/docs/concepts/recipes#advanced-jsx-tracking
   */
  jsx?: (string | RegExp)[];
};

export type DefaultSemanticTokensOptions = {
  /**
   * Set the semantic token prefix to be used.
   *
   * If not set, the recipe's name will
   * be used.
   */
  prefix?: string;
  /**
   * Set the color palette to use.
   *
   * It only works with colors that have a numeric scale (11x)
   * from 50 to 950. (50, 100, 200, ..., 800, 900, 950).
   *
   * @default 'slate'
   */
  colorPalette?: string;
};

export type NotOptions = {
  /**
   * Choose a class name to be used
   * instead of the default value.
   *
   * @default 'not-prose'
   */
  className: string;
};

export type GetCssFromTailwindOptions = {
  varPrefix?: string;
  notProse?:
    | boolean
    | {
        className: string;
      };
};
