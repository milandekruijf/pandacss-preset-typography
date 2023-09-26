import * as Panda from "@pandacss/dev";
import { Tailwind } from "./tailwind";

export namespace Recipe {
  export namespace Constants {
    /**
     * The default name for the recipe that is used if
     * nothing is provided.
     */
    export const DEFAULT_NAME: string = "prose";

    /**
     * The default class name for the recipe that is used
     * if nothing is provided.
     */
    export const DEFAULT_CLASS_NAME: string = "prose";
  }

  /**
   * The create function created the PandaCSS recipe configuration.
   * You may customize the recipe using the `options` param.
   *
   * @param options The options used to customize the behavior
   *  of the recipe.
   * @returns The created PandaCSS recipe configuration.
   */
  export function create(options?: Types.Options): Panda.RecipeConfig {
    const tailwind = getTailwindOptions({ recipe: options });

    return Panda.defineRecipe({
      className: deriveClassName({ recipe: options }),
      jsx: options?.jsx,
      defaultVariants: {
        size: "base",
      },
      base: getBaseStyles({ tailwind }),
      variants: {
        size: getSizeStyles({ tailwind }),
      },
    });
  }

  /**
   * Get the base styles for the recipe.
   *
   * This uses tailwind internally to get the styles
   * dynamically instead of manually copying everything over.
   *
   * @param options The options to customize the behavior of
   *  the function.
   * @returns The base styles object.
   */
  export function getBaseStyles(options?: Types.GetBaseStylesOptions): Panda.SystemStyleObject {
    const css = Tailwind.getCssDefaults({ css: options?.tailwind?.css });

    // It's safe to cast here because the types are technically the same.
    return css as Panda.SystemStyleObject;
  }

  /**
   * Get the styles for a specific size for the recipe.
   *
   * This uses tailwind internally to get the styles
   * dynamically instead of manually copying everything over.
   *
   * @param options The options to customize the behavior of
   *  the function.
   * @returns The base styles object keyed by the size key.
   */
  export function getSizeStyles(options: Types.GetSizeStyleOptions): Record<string, Panda.SystemStyleObject> {
    const css = Tailwind.getCssForSizes({ sizes: options?.recipe?.sizes, css: options?.tailwind?.css });

    // It's safe to cast here because the types are technically the same
    return css as Record<string, Panda.SystemStyleObject>;
  }

  /**
   * Function to create the default semantic tokens that
   * are used for the preset.
   *
   * You can provide a `prefix` option to set the prefix
   * of the generated tokens. If not provided, it will instead
   * try to use the name of the recipe or the default recipe
   * name (`prose`) if that isn't provided either.
   *
   * @param options The options to customize the `prefix`,
   *  or the `recipe` that will be used to get the name from
   *  if none was provided.
   * @returns The semantic tokens that are usable in a
   *  PandaCSS theme configuration.
   */
  export function createDefaultSemanticTokens(
    options?: Types.CreateDefaultSemanticTokensOptions
  ): Panda.SemanticTokens {
    return Panda.defineSemanticTokens({
      colors: {
        [options?.prefix ?? deriveName({ recipe: options?.recipe })]: {
          body: {
            value: "{colors.slate.700}",
          },
          heading: {
            value: "{colors.slate.900}",
          },
          lead: {
            value: "{colors.slate.600}",
          },
          link: {
            value: "{colors.slate.900}",
          },
          bold: {
            value: "{colors.slate.900}",
          },
          counter: {
            value: "{colors.slate.500}",
          },
          bullet: {
            value: "{colors.slate.300}",
          },
          hr: {
            value: "{colors.slate.200}",
          },
          quote: {
            value: "{colors.slate.900}",
          },
          quoteBorder: {
            value: "{colors.slate.200}",
          },
          caption: {
            value: "{colors.slate.500}",
          },
          kbd: {
            value: "{colors.slate.900}",
          },
          kbdShadow: {
            value: "0 0 0",
          },
          code: {
            value: "{colors.slate.900}",
          },
          preCode: {
            value: "{colors.slate.200}",
          },
          preBg: {
            value: "{colors.slate.800}",
          },
          thBorder: {
            value: "{colors.slate.300}",
          },
          tdBorder: {
            value: "{colors.slate.200}",
          },
        },
      },
    });
  }

  /**
   * A function to get the TailwindCSS options used to get the styles
   * from TailwindCSS dynamically instead of manually copying it over.
   *
   * @param options The options to use to get the correct TailwindCSS options.
   * @returns The TailwindCSS options used to get styles from TailwindCSS.
   */
  export function getTailwindOptions(options?: Types.GetTailwindOptionsOptions): Types.TailwindOptions {
    const notProse = options?.recipe?.not ?? options?.tailwind?.css?.pipes?.notProse;

    return {
      sizes: options?.recipe?.sizes,
      css: {
        pipes: {
          vars: getTailwindVars({ recipe: options?.recipe }),
          notProse:
            typeof notProse === "object"
              ? {
                  className: notProse?.className,
                }
              : notProse,
        },
      },
    };
  }

  /**
   * Used to get the TailwindCSS variable map using the provided options.
   *
   * You may provide a `prefix` to be used for every variable.
   * If none are provided, it will use the recipe name, or the default
   * recipe name (`prose`) if none were provided.
   *
   * @param options The options used to customize the behavior of the function.
   * @returns The TailwindCSS variable map.
   */
  export function getTailwindVars(options?: Types.GetTailwindVarsOptions): Tailwind.Types.Vars {
    const prefix = options?.prefix ?? deriveName({ recipe: options?.recipe });

    return {
      body: `var(--colors-${prefix}-body)`,
      headings: `var(--colors-${prefix}-heading)`,
      lead: `var(--colors-${prefix}-lead)`,
      links: `var(--colors-${prefix}-link)`,
      bold: `var(--colors-${prefix}-bold)`,
      counters: `var(--colors-${prefix}-counter)`,
      bullets: `var(--colors-${prefix}-bullet)`,
      hr: `var(--colors-${prefix}-hr-border)`,
      quotes: `var(--colors-${prefix}-quote)`,
      "quote-borders": `var(--colors-${prefix}-quote-border)`,
      captions: `var(--colors-${prefix}-caption)`,
      kbd: `var(--colors-${prefix}-kbd)`,
      "kbd-shadows": `var(--colors-${prefix}-kbd-shadow)`,
      code: `var(--colors-${prefix}-code)`,
      "pre-code": `var(--colors-${prefix}-pre-code)`,
      "pre-bg": `var(--colors-${prefix}-pre-bg)`,
      "th-borders": `var(--colors-${prefix}-th-border)`,
      "td-borders": `var(--colors-${prefix}-td-border)`,
    };
  }

  /**
   * Function used to derive the recipe class name to use. It will either use
   * the recipe class name, or the `default` option, or the default
   * name if none are provided (`prose`).
   *
   * @param options The options used to derive the correct recipe class name.
   * @returns The derived recipe class name.
   */
  export function deriveClassName(options?: Types.DeriveClassNameOptions): string {
    return options?.recipe?.className ?? options?.default ?? Constants.DEFAULT_CLASS_NAME;
  }

  /**
   * Function used to derive the recipe name to use. It will either use
   * the recipe class name, or the `default` options, or the default
   * name if none are provided (`prose`).
   *
   * @param options The options used to derive the correct name.
   * @returns The derived recipe name.
   */
  export function deriveName(options?: Types.DeriveNameOptions): string {
    return options?.recipe?.name ?? options?.default ?? Constants.DEFAULT_NAME;
  }

  /**
   * Function to get the record for the recipe configuration to be used
   * in a preset.
   *
   * @param options The recipe options used to create the recipe.
   * @returns The recipe configuration record that can be used in presets.
   */
  export function getRecord(options: Types.Options): Record<string, Panda.RecipeConfig> {
    return {
      [deriveName({ default: options.className })]: create(options),
    };
  }

  export namespace Types {
    export type Options = {
      name?: string;
      className?: string;
      jsx?: (string | RegExp)[];
      not?: Not;
      sizes?: Sizes;
    };

    export type Sizes = Tailwind.Types.Sizes;

    export type TailwindOptions = {
      css?: Tailwind.Types.CssOptions;
      sizes?: Tailwind.Types.Sizes;
    };

    export type GetSizeStyleOptions = {
      recipe?: Options;
      tailwind?: TailwindOptions;
    };

    export type GetBaseStylesOptions = {
      tailwind?: TailwindOptions;
    };

    export type CreateDefaultSemanticTokensOptions = {
      recipe?: Options;
      prefix?: string;
    };

    export type Not =
      | boolean
      | {
          className?: string;
        };

    export type GetTailwindOptionsOptions = {
      recipe?: Options;
      tailwind?: TailwindOptions;
    };

    export type GetTailwindVarsOptions = {
      recipe?: Options;
      prefix?: string;
    };

    export type DeriveClassNameOptions = {
      recipe?: Options;
      default?: string;
    };

    export type DeriveNameOptions = {
      recipe?: Options;
      default?: string;
    };
  }
}
