import { TW_DEFAULT, TW_SIZES } from "./constants";

/**
 * Represents a Tailwind CSS typography size.
 */
export type TwSize = (typeof TW_SIZES)[number];

/**
 * Represents an array of Tailwind CSS typography sizes.
 */
export type TwSizes = TwSize[];

/**
 * Represents a CSS style object for Tailwind CSS.
 */
export type TwCss = {
  [key: string]: TwCss | string;
};

/**
 * Represents a mapping of Tailwind CSS typography sizes to their corresponding CSS styles.
 * Each key represents a typography size, and the value is the associated CSS style object.
 */
export type TwCssWithSizes = {
  [K in TwSize]: TwCss;
};

/**
 * Represents a value with CSS styles.
 */
export type TwValue = {
  css: TwCss[];
};

/**
 * Represents the raw configuration for Tailwind CSS typography.
 */
export type TwRawConfig = {
  [K in TwSize]: TwValue;
} & {
  [TW_DEFAULT]: TwValue;
};

/**
 * Represents Tailwind CSS variables with their corresponding values.
 */
export type TwVars = {
  body?: string;
  headings?: string;
  lead?: string;
  links?: string;
  bold?: string;
  counters?: string;
  bullets?: string;
  hr?: string;
  quotes?: string;
  "quote-borders"?: string;
  captions?: string;
  kbd?: string;
  "kbd-shadows"?: string;
  code?: string;
  "pre-code"?: string;
  "pre-bg"?: string;
  "th-borders"?: string;
  "td-borders"?: string;
};

/**
 * Represents options for generating CSS styles for multiple Tailwind CSS typography sizes.
 */
export type TwGetCssForSizesOptions = TwGetCssOptions & {
  sizes?: TwSizes;
};

/**
 * Represents options for customizing the generation of CSS styles.
 */
export type TwGetCssOptions = {
  vars?: TwVars;
};

/**
 * Represents options for configuring a Prose Recipe.
 */
export type ProseRecipeOptions = {
  /**
   * The name of the recipe to use
   *
   * @default 'prose'
   */
  name?: string;
  /**
   * The class name of the recipe to use.
   *
   * @default 'prose'
   */
  className?: string;
  vars?: TwVars;
  /**
   * The jsx elements to track for this recipe.
   * Can be string or RegExp.
   *
   * @default undefined
   * @example ['Button', 'Link', /Button$/]
   */
  jsx?: (string | RegExp)[];
};

/**
 * Represents options for configuring a Typography Preset.
 */
export interface TypographyPresetOptions {
  recipes?: {
    /**
     * Options for the prose recipe.
     */
    prose?: ProseRecipeOptions | ProseRecipeOptions[];
  };
}

/**
 * Represents options for customizing the behavior of the join operation.
 */
export type JoinOptions = {
  merge?: {
    deep?: boolean;
  };
};
