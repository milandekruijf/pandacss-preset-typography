import fn from "@tailwindcss/typography";
import { Merge } from "./utils/merge";
import { Pipe } from "./utils/pipe";

export namespace Tailwind {
  export namespace Constants {
    /**
     * The default key that is used to index the TailwindCSS configuration
     * object to get the default style properties.
     */
    export const DEFAULT_KEY = "DEFAULT";

    /**
     * A readonly array of the available sizes that are inside
     * the TailwindCSS configuration object.
     */
    export const SIZES = ["sm", "base", "lg", "xl", "2xl"] as const;

    /**
     * A regular expression that matches TailwindCSS's typography
     * css variables.
     */
    export const VAR_REGEX: RegExp = /var\(--tw-prose-(.*?)\)/g;

    /**
     * A regular expression that matches TailwindCSS's typography
     * css variable declarations.
     */
    export const VAR_DEC_REGEX: RegExp = /--tw-prose-(.*?)/;
    export const DEFAULT_NOT_PROSE_CLASS_NAME: string = "not-prose";
  }

  /**
   * Get the TailwindCSS Typography plugin configuration object.
   *
   * @returns TailwindCSS's Typography plugin configuration object.
   */
  export function getConfig(): Types.Config {
    return (fn() as any).config.theme.typography;
  }

  /**
   * Get the default TailwindCSS Typography plugin styles.
   *
   * This function also transforms the style object using the
   * provided `css` options.
   *
   * @param options The options used to transform the style object.
   * @returns A copy of the style object that was transformed.
   */
  export function getCssDefaults(options?: Types.GetCssDefaultsOptions): Types.Css {
    return transformCss(Merge.create(getConfig()[Constants.DEFAULT_KEY].css, { deep: true }), { css: options?.css });
  }

  /**
   * Gets the TailwindCSS Typography plugin style for a specific
   * size.
   *
   * This function also transforms the style object using the
   * provided `css` options.
   *
   * @param size The size you want to get the style object from.
   * @param options The options used to transform the style object.
   * @returns A copy of the style object that was transformed.
   */
  export function getCssForSize(size: Types.Size, options?: Types.GetCssForSizeOptions): Types.Css {
    return transformCss(Merge.create(getConfig()[size].css, { deep: true }), { css: options?.css });
  }

  /**
   * Get css for either all the sizes if no `sizes` option was provided.
   * Or get the selected sizes.
   *
   * This function also transforms the style object using the
   * provided `css` options.
   *
   * @param options The options used to select what sizes to get
   *  and how to transform the css.
   * @returns A copy of the style objects that were transformed keyed
   *  by the size key.
   */
  export function getCssForSizes(options?: Types.GetCssForSizesOptions): Types.CssWithSizes {
    return Merge.map(
      options?.sizes ?? Constants.SIZES,
      (size) => ({
        [size]: getCssForSize(size, { css: options.css }),
      }),
      { deep: true }
    );
  }

  /**
   * Transforms the style object using the provided `pipes` options.
   *
   * @param css The css you want to transform.
   * @param options The options used to transform the css.
   * @returns A copy of the style object that was transformed.
   */
  export function transformCss(css: Types.Css, options?: Types.TransformCssOptions): Types.Css {
    return Pipe.create(css, ...Pipes.get({ ...options?.css?.pipes }));
  }

  export namespace Pipes {
    /**
     * This pipe makes every css selector nested by appending `&`.
     *
     * @param input The input style object.
     * @returns A copy of the input style object, but with nested tags.
     */
    export function withNestedTags(input: Types.Input): Types.Input {
      return Merge.map(
        Object.entries(input),
        ([k, v]) => ({ [typeof v === "object" ? Utils.createNestedCssSelector(k) : k]: v }),
        {
          deep: true,
        }
      );
    }

    /**
     * This pipe replaces every TailwindCSS provided css variable
     * with our own values.
     *
     * @param input The input style object.
     * @param options Here we can provide a variable map using
     *  he `vars` property.
     * @returns A copy of the input style object, but with the replaced variables.
     */
    export function withCssVars(input: Types.Input, options?: Types.WithVarsOptions): Types.Input {
      return Merge.map(
        Object.entries(input),
        ([k, v]) => ({
          [k]: typeof v === "object" ? Pipes.withCssVars(v, options) : Utils.replaceCssVar(v, options?.vars),
        }),
        { deep: true }
      );
    }

    /**
     * This pipe removes the TailwindCSS provided variable declarations.
     *
     * @param input The input style object.
     * @returns A copy of the input style object, but with no more
     *  TailwindCSS variable declarations.
     */
    export function withoutVarDecs(input: Types.Input): Types.Input {
      const result: Types.Input = {};

      Object.entries(input).forEach(([k, v]) => {
        if (Constants.VAR_DEC_REGEX.test(k)) return;

        result[k] = v;
      });

      return result;
    }

    /**
     * This pipe adds the 'not' (TailwindCSS's 'not-prose' functionality)
     * to the classes using the `:not()` selector.
     *
     * @param input The input style object.
     * @param options Extra options you can provide to set the class name
     *  to be used. Otherwise the default is used (`not-prose`).
     * @returns A copy of the input style object, but with the :not()
     *  selector applied.
     */
    export function withNotProseClasses(
      input: Types.Input,
      options?: Types.WithNotProseClassesOptions
    ): Tailwind.Types.Css {
      const className = options?.className ?? Constants.DEFAULT_NOT_PROSE_CLASS_NAME;

      return Merge.map(
        Object.entries(input),
        ([k, v]) => ({
          [typeof v === "object" ? `:where(${k}):not(:where([class~="${className}"],[class~="$className}"] *))` : k]: v,
        }),
        { deep: true }
      );
    }

    /**
     * Utility function to quickly get an array of all the pipes
     * together, and providing options through an object.
     *
     * @param options The universal options that are used for the pipes.
     *  Not all pipes use the options, but those that need them, use them.
     * @returns An array of the pipes, customized by the provided options.
     */
    export function get(options?: Types.GetOptions): Types.Fn[] {
      return [
        !options?.varDecs && withoutVarDecs,
        options?.notProse &&
          ((css) => withNotProseClasses(css, typeof options?.notProse === "object" && options?.notProse)),
        options?.nestedTags && withNestedTags,
        options?.vars && ((css) => withCssVars(css, { vars: options.vars })),
      ];
    }

    export namespace Types {
      export type Input = Tailwind.Types.Css;

      export type Fn = (input: Input) => Input;

      export type GetOptions = {
        nestedTags?: boolean;
        vars?: Tailwind.Types.Vars;
        varDecs?: boolean;
        notProse?: GetOptionsNotProseOption;
      };

      export type GetOptionsNotProseOption = boolean | WithNotProseClassesOptions;

      export type WithNotProseClassesOptions = {
        className?: string;
      };

      export type WithVarsOptions = {
        vars?: Tailwind.Types.Vars;
      };
    }
  }

  export namespace Utils {
    /**
     * A utility function to transform a css selector into a
     * nested css selector by splitting the selector by `, `,
     * mapping every entry by appending na `&` in front. And
     * then joining all of them with `, `.
     *
     * @param cssSelector The css selector to transform.
     * @returns The transformed css selector.
     */
    export function createNestedCssSelector(cssSelector: string): string {
      return cssSelector
        .split(", ")
        .map((tag) => `& ${tag}`)
        .join(", ");
    }

    /**
     * Utility function to replace a css variable within a
     * string with our own value inside the `vars` object.
     *
     * @param value A string where you want to replace the variables in
     * @param vars The variable map that contains our values.
     *  keyed by the TailwindCSS css variable keys.
     * @returns The changed value string.
     */
    export function replaceCssVar(value: string, vars: Types.Vars): string {
      const match = Constants.VAR_REGEX.exec(value);

      if (match && vars[match[1]]) value = value.replace(Constants.VAR_REGEX, vars[match[1]]);

      return value;
    }
  }

  export namespace Types {
    export type Size = (typeof Constants.SIZES)[number];

    export type Sizes = Size[];

    export type Css = {
      [key: string]: Css | string;
    };

    export type CssWithSizes = {
      [K in Size]?: Css;
    };

    export type Value = {
      css: Css[];
    };

    export type Config = {
      [K in Size]: Value;
    } & {
      [Constants.DEFAULT_KEY]: Value;
    };

    export type Vars = {
      body: string;
      headings: string;
      lead: string;
      links: string;
      bold: string;
      counters: string;
      bullets: string;
      hr: string;
      quotes: string;
      "quote-borders": string;
      captions: string;
      kbd: string;
      "kbd-shadows": string;
      code: string;
      "pre-code": string;
      "pre-bg": string;
      "th-borders": string;
      "td-borders": string;
    };

    export type GetCssForSizesOptions = {
      css?: CssOptions;
      sizes?: Sizes;
    };

    export type GetCssForSizeOptions = {
      css?: CssOptions;
    };

    export type GetCssDefaultsOptions = {
      css?: CssOptions;
    };

    export type TransformCssOptions = {
      css?: CssOptions;
    };

    export type CssOptions = {
      pipes?: Pipes.Types.GetOptions;
    };
  }
}
