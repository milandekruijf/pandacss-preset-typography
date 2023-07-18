export interface ProseRecipeOptions {
  /**
   * The name of the recipe to use.
   *
   * @default 'prose'
   */
  name?: string;
  /**
   * The jsx elements to track for this recipe.
   * Can be string or RegExp.
   *
   * @default []
   * @example ['Button', 'Link', /Button$/]
   */
  jsx?: (string | RegExp)[];
}
