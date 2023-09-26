import fn from "@tailwindcss/typography";
import { Merge } from "./utils/merge";
import { Pipe } from "./utils/pipe";

export namespace Tailwind {
  export namespace Constants {
    export const DEFAULT_KEY = "DEFAULT";
    export const SIZES = ["sm", "base", "lg", "xl", "2xl"] as const;
    export const VAR_REGEX = /var\(--tw-prose-(.*?)\)/g;
    export const VAR_DEC_REGEX = /--tw-prose-(.*?)/;
    export const DEFAULT_NOT_PROSE_CLASS_NAME = "not-prose";
  }

  /**
   * Retrieves the raw Tailwind CSS typography configuration.
   *
   * @returns  The raw typography configuration.
   */
  export function getConfig(): Types.Config {
    return (fn() as any).config.theme.typography;
  }

  /**
   * Retrieves the default CSS styles for Tailwind CSS typography.
   *
   * @param options Options for customizing the CSS styles.
   * @returns The default CSS styles for typography.
   */
  export function getCssDefaults(options?: Types.GetCssOptions): Types.Css {
    return transformCss(Merge.create(getConfig()[Constants.DEFAULT_KEY].css, { deep: true }), options);
  }

  /**
   * Retrieves the CSS styles for a specific Tailwind CSS typography size.
   *
   * @param size The typography size to retrieve CSS styles for.
   * @param options Options for customizing the CSS styles.
   * @returns The CSS styles for the specified typography size.
   */
  export function getCssForSize(size: Types.Size, options?: Types.GetCssOptions): Types.Css {
    return transformCss(Merge.create(getConfig()[size].css, { deep: true }), options);
  }

  /**
   * Applies customizations to a set of CSS styles based on the provided options.
   *
   * @param css The CSS styles to customize.
   * @param options Options for customizing the CSS styles.
   * @returns The customized CSS styles.
   */
  export function transformCss(css: Types.Css, options?: Types.GetCssOptions): Types.Css {
    return Pipe.create(css, ...Pipes.get({ ...options.pipes }));
  }

  /**
   * Retrieves CSS styles for multiple Tailwind CSS typography sizes.
   *
   * @param options Options for customizing the CSS styles for multiple sizes.
   * @returns The CSS styles for multiple typography sizes.
   */
  export function getCssForSizes(options?: Types.GetCssForSizesOptions): Types.CssWithSizes {
    return Merge.map(
      options?.sizes ?? Constants.SIZES,
      (size) => ({
        [size]: getCssForSize(size, options),
      }),
      { deep: true }
    );
  }

  export namespace Pipes {
    /**
     * Adds nested tags to CSS selectors for nested elements.
     *
     * @param css The CSS styles to add nested tags to.
     * @returns The CSS styles with nested tags.
     */
    export function withNestedTags(css: Tailwind.Types.Css): Tailwind.Types.Css {
      return Merge.map(
        Object.entries(css),
        ([k, v]) => ({ [typeof v === "object" ? Utils.createNestedTag(k) : k]: v }),
        {
          deep: true,
        }
      );
    }

    /**
     * Replaces CSS variable references in styles with their corresponding values from the provided variables.
     *
     * @param css The CSS styles with variable references.
     * @param vars The variables containing the values for the references.
     * @returns The CSS styles with variable values replaced.
     */
    export function withVars(css: Tailwind.Types.Css, vars: Tailwind.Types.Vars): Tailwind.Types.Css {
      return Merge.map(
        Object.entries(css),
        ([k, v]) => ({
          [k]: typeof v === "object" ? Pipes.withVars(v, vars) : Utils.replaceVar(v, vars),
        }),
        { deep: true }
      );
    }

    /**
     * Removes all variable declarations from the CSS.
     *
     * @param css The CSS styles with variable declarations.
     * @returns The CSS styles without variable declarations.
     */
    export function withoutVarDecs(css: Tailwind.Types.Css): Tailwind.Types.Css {
      const result: Tailwind.Types.Css = {};

      Object.entries(css).forEach(([k, v]) => {
        if (Constants.VAR_DEC_REGEX.test(k)) return;
        result[k] = v;
      });

      return result;
    }

    export function withNotProseClasses(
      css: Tailwind.Types.Css,
      options?: Types.WithNotProseClassesOptions
    ): Tailwind.Types.Css {
      const className = options?.className ?? Constants.DEFAULT_NOT_PROSE_CLASS_NAME;

      return Merge.map(
        Object.entries(css),
        ([k, v]) => ({
          [typeof v === "object" ? `:where(${k}):not(:where([class~="${className}"],[class~="$className}"] *))` : k]: v,
        }),
        { deep: true }
      );
    }

    /**
     * Get the pipes with the provided options.
     *
     * @param options The optional options to customize the pipes.
     * @returns An array of all the pipes using the provided options.
     */
    export function get(options?: Types.GetOptions): Types.Fn[] {
      return [
        !options?.varDecs && withoutVarDecs,
        options?.notProse &&
          ((css) => withNotProseClasses(css, typeof options?.notProse === "object" && options?.notProse)),
        options?.nestedTags && withNestedTags,
        options?.vars && ((css) => withVars(css, options?.vars)),
      ];
    }

    export namespace Types {
      export type Fn = (css: Tailwind.Types.Css) => Tailwind.Types.Css;

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
    }
  }

  export namespace Utils {
    /**
     * Generates a nested CSS selector tag for a given tag.
     *
     * @param tag The tag to generate a nested selector for.
     * @returns The nested CSS selector tag.
     */
    export function createNestedTag(tag: string): string {
      return tag
        .split(", ")
        .map((tag) => `& ${tag}`)
        .join(", ");
    }

    /**
     * Replaces a CSS variable reference in a value with its corresponding value from the provided variables.
     *
     * @param value The CSS value containing the variable reference.
     * @param vars The variables containing the values for the references.
     * @returns The CSS value with the variable reference replaced with its value.
     */
    export function replaceVar(value: string, vars: Types.Vars): string {
      const match = Constants.VAR_REGEX.exec(value);

      if (match && vars[match[1]]) value = value.replace(Constants.VAR_REGEX, vars[match[1]]);

      return value;
    }
  }

  export namespace Types {
    /**
     * Represents a Tailwind CSS typography size.
     */
    export type Size = (typeof Constants.SIZES)[number];

    /**
     * Represents an array of Tailwind CSS typography sizes.
     */
    export type Sizes = Size[];

    /**
     * Represents a CSS style object for Tailwind CSS.
     */
    export type Css = {
      [key: string]: Css | string;
    };

    /**
     * Represents a mapping of Tailwind CSS typography sizes to their corresponding CSS styles.
     * Each key represents a typography size, and the value is the associated CSS style object.
     */
    export type CssWithSizes = {
      [K in Size]?: Css;
    };

    /**
     * Represents a value with CSS styles.
     */
    export type Value = {
      css: Css[];
    };

    /**
     * Represents the raw configuration for Tailwind CSS typography.
     */
    export type Config = {
      [K in Size]: Value;
    } & {
      [Constants.DEFAULT_KEY]: Value;
    };

    /**
     * Represents Tailwind CSS variables with their corresponding values.
     */
    export type Vars = {
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
    export type GetCssForSizesOptions = GetCssOptions & {
      sizes?: Sizes;
    };

    /**
     * Represents options for customizing the generation of CSS styles.
     */
    export type GetCssOptions = {
      pipes?: Pipes.Types.GetOptions;
    };
  }
}
