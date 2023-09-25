/**
 * The colors for the prose recipe.
 */
export interface ProseRecipeColorsOption {
  body: string;
  lead: string;
  link: string;
  counter: string;
  bullet: string;
  hrBorder: string;
  quote: string;
  quoteBorder: string;
  heading: string;
  caption: string;
  bold: string;
  code: string;
  preCode: string;
  preBackground: string;
  thBorder: string;
  tdBorder: string;
  kbd: string;
  /**
   * This expects an RGB value
   * @default "0 0 0"
   */
  kbdShadowRgb: string;
}

/**
 * Options for the prose recipe.
 */
export interface ProseRecipeOptions {
  /**
   * The name of the recipe to use.
   *
   * @default 'prose'
   */
  name?: string;
  /**
   * Change the default colors for the prose
   * recipe. You don't have to provide all the
   * colors, just the ones you want to change.
   * The colors are merged with the default.
   *
   * @default DEFAULT_PROSE_RECIPE_COLORS
   */
  colors?: Partial<ProseRecipeColorsOption>;
  /**
   * The jsx elements to track for this recipe.
   * Can be string or RegExp.
   *
   * @default []
   * @example ['Button', 'Link', /Button$/]
   */
  jsx?: (string | RegExp)[];
}
