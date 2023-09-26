import * as Panda from "@pandacss/dev";
import { Tailwind } from "./tailwind";

export namespace Recipe {
  export namespace Constants {
    /**
     * The default name that is used for the recipe.
     */
    export const DEFAULT_NAME: string = "prose";

    /**
     * The default class name that is used for the recipe.
     */
    export const DEFAULT_CLASS_NAME: string = "prose";

    /**
     * The TailwindCSS variable mappings used to replace
     * the old variables with new ones.
     */
    export const TAILWIND_VARS: Required<Tailwind.Types.Vars> = {
      body: "var(--colors-prose-body)",
      headings: "var(--colors-prose-heading)",
      lead: "var(--colors-prose-lead)",
      links: "var(--colors-prose-link)",
      bold: "var(--colors-prose-bold)",
      counters: "var(--colors-prose-counter)",
      bullets: "var(--colors-prose-bullet)",
      hr: "var(--colors-prose-hr)",
      quotes: "var(--colors-prose-quote)",
      "quote-borders": "var(--colors-prose-quote-border)",
      captions: "var(--colors-prose-caption)",
      kbd: "var(--colors-prose-kbd)",
      "kbd-shadows": "var(--colors-prose-kbd-shadow)",
      code: "var(--colors-prose-code)",
      "pre-code": "var(--colors-prose-pre-code)",
      "pre-bg": "var(--colors-prose-pre-bg)",
      "th-borders": "var(--colors-prose-th-border)",
      "td-borders": "var(--colors-prose-td-border)",
    };
  }

  /**
   * Creates a Prose Recipe configuration based on the provided options.
   * If options are provided, it customizes the recipe configuration accordingly;
   * otherwise, default values are used.
   *
   * @param options The options to customize the Prose Recipe.
   * @returns The configuration for the Prose Recipe.
   */
  export function create(options?: Types.Options): Panda.RecipeConfig {
    const tailwindCssOptions = getTailwindCssOptions(options);

    return Panda.defineRecipe({
      className: getClassName(options),
      jsx: options?.jsx,
      defaultVariants: {
        size: "base",
      },
      base: Tailwind.getCssDefaults(tailwindCssOptions) as Panda.SystemStyleObject,
      variants: {
        size: Tailwind.getCssForSizes(tailwindCssOptions) as Record<string, Panda.SystemStyleObject>,
      },
    });
  }

  /**
   * Get options to use for getting CSS from TailwindCSS using the options
   * used to customize the Prose Recipe.
   *
   * @param options The options to customize the Prose Recipe.
   * @returns The configuration for getting CSS from TailwindCSS
   */
  export function getTailwindCssOptions(options?: Types.Options): Tailwind.Types.GetCssOptions {
    return {
      pipes: {
        vars: getTailwindVars(options),
        notProse:
          options?.not && typeof options.not === "object"
            ? {
                className: options.not.className,
              }
            : options.not,
      },
    };
  }

  /**
   * Get TailwindCSS variable mappings using the Prose Recipe options,
   * so the variables correspond to the name that is set.
   *
   * @param options The options used to get the recipe name.
   * @returns The TailwindCSS variables with the proper name.
   */
  export function getTailwindVars(options?: Types.Options): Tailwind.Types.Vars {
    const name = getName(options);

    return {
      body: `var(--colors-${name}-body)`,
      headings: `var(--colors-${name}-heading)`,
      lead: `var(--colors-${name}-lead)`,
      links: `var(--colors-${name}-link)`,
      bold: `var(--colors-${name}-bold)`,
      counters: `var(--colors-${name}-counter)`,
      bullets: `var(--colors-${name}-bullet)`,
      hr: `var(--colors-${name}-hr)`,
      quotes: `var(--colors-${name}-quote)`,
      "quote-borders": `var(--colors-${name}-quote-border)`,
      captions: `var(--colors-${name}-caption)`,
      kbd: `var(--colors-${name}-kbd)`,
      "kbd-shadows": `var(--colors-${name}-kbd-shadow)`,
      code: `var(--colors-${name}-code)`,
      "pre-code": `var(--colors-${name}-pre-code)`,
      "pre-bg": `var(--colors-${name}-pre-bg)`,
      "th-borders": `var(--colors-${name}-th-border)`,
      "td-borders": `var(--colors-${name}-td-border)`,
    };
  }

  /**
   * Retrieves the CSS class name for a Prose Recipe based on the given options.
   * If the options include a custom class name, it is returned; otherwise,
   * the default class name (`"prose"`) is used.
   *
   * @param options The options for the Prose Recipe.
   * @returns The CSS class name for the Prose Recipe.
   * @default "prose"
   */
  export function getClassName(options?: Types.Options): string {
    return options?.className ?? Constants.DEFAULT_CLASS_NAME;
  }

  /**
   * Retrieves the name of a Prose Recipe based on the given options.
   * If the options include a custom name, it is returned; otherwise,
   * the default name (`"prose"`) is used.
   *
   * @param options The options for the Prose Recipe.
   * @returns The name of the Prose Recipe.
   * @default "prose"
   */
  export function getName(options?: Types.Options): string {
    return options?.name ?? Constants.DEFAULT_NAME;
  }

  /**
   * Creates a configuration record for a Prose Recipe based on the provided options.
   * If the options are an array, this function recursively processes each element and returns a record.
   * Otherwise, it creates a single record with the recipe name as the key and the corresponding recipe configuration.
   *
   * @param options The options or array of options for the Prose Recipe.
   * @return The configuration record for the Prose Recipe(s).
   */
  export function get(options: Types.Options): Record<string, Panda.RecipeConfig> {
    return {
      [getName(options)]: create(options),
    };
  }

  export namespace Types {
    /**
     * Represents options for configuring a Prose Recipe.
     */
    export type Options = {
      /**
       * The name of the recipe to use. Useful if you have an other
       * recipe with the same name.
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
      /**
       * The jsx elements to track for this recipe.
       * Can be string or RegExp.
       *
       * @see https://panda-css.com/docs/concepts/recipes#advanced-jsx-tracking
       *
       * @default undefined
       * @example ['Button', 'Link', /Button$/]
       */
      jsx?: (string | RegExp)[];
      /**
       * Enable 'not' (TailwindCSS's 'not-prose') support.
       *
       * You may provide an object to provide the class name
       * that will be used to filter out elements you don't
       * want styled.
       *
       * @example
       *
       * You can also provide a custom class name to use by
       * providing an object:
       *
       * ```ts
       * {
       *  not: {
       *    className: "not-prose" // this is the default value if set to true
       *  }
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *  not: true // will use "not-prose" as the class name
       * }
       * ```
       *
       * @default false
       */
      not?:
        | boolean
        | {
            /**
             * The class name to use.
             *
             * @default 'not-prose'
             */
            className: string;
          };
    };
  }
}
