import * as Panda from "@pandacss/dev";
import { Tailwind } from "./tailwind";

export namespace Recipe {
  export namespace Constants {
    export const DEFAULT_NAME: string = "prose";
    export const DEFAULT_CLASS_NAME: string = "prose";

    export const TAILWIND_VARS: Required<Tailwind.Types.Vars> = {
      body: "var(--colors-prose-body)",
      headings: "var(--colors-prose-headings)",
      lead: "var(--colors-prose-lead)",
      links: "var(--colors-prose-links)",
      bold: "var(--colors-prose-bold)",
      counters: "var(--colors-prose-counters)",
      bullets: "var(--colors-prose-bullets)",
      hr: "var(--colors-prose-hr)",
      quotes: "var(--colors-prose-quotes)",
      "quote-borders": "var(--colors-prose-quote-borders)",
      captions: "var(--colors-prose-captions)",
      kbd: "var(--colors-prose-kbd)",
      "kbd-shadows": "var(--colors-prose-kbd-shadows)",
      code: "var(--colors-prose-code)",
      "pre-code": "var(--colors-prose-pre-code)",
      "pre-bg": "var(--colors-prose-pre-bg)",
      "th-borders": "var(--colors-prose-th-borders)",
      "td-borders": "var(--colors-prose-td-borders)",
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

  export function getTailwindCssOptions(options?: Types.Options): Tailwind.Types.GetCssOptions {
    return {
      pipes: {
        vars: Constants.TAILWIND_VARS,
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
   * Retrieves the CSS class name for a Prose Recipe based on the given options.
   * If the options include a custom class name, it is returned; otherwise, the default class name is used.
   *
   * @param options The options for the Prose Recipe.
   * @returns The CSS class name for the Prose Recipe.
   */
  export function getClassName(options?: Types.Options): string {
    return options?.className ?? Constants.DEFAULT_CLASS_NAME;
  }

  /**
   * Retrieves the name of a Prose Recipe based on the given options.
   * If the options include a custom name, it is returned; otherwise, the default name is used.
   *
   * @param options The options for the Prose Recipe.
   * @returns The name of the Prose Recipe.
   */
  export function getName(options?: Types.Options): string {
    return options?.name ?? Constants.DEFAULT_NAME;
  }

  /**
   * Creates a configuration record for a Prose Recipe based on the provided options.
   * If the options are an array, this function recursively processes each element and returns a record.
   * Otherwise, it creates a single record with the recipe name as the key and the corresponding recipe configuration.
   *
   * @param options - The options or array of options for the Prose Recipe.
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
      /**
       * The jsx elements to track for this recipe.
       * Can be string or RegExp.
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
            className: string;
          };
    };
  }
}
