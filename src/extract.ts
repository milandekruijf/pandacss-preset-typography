import fn from "@tailwindcss/typography";

import { TW_DEFAULT, TW_SIZES, TW_VAR_REGEX } from "./constants";
import type {
  TwRawConfig,
  TwCss,
  TwSize,
  TwVars,
  TwGetCssOptions,
  TwGetCssForSizesOptions,
  TwCssWithSizes,
} from "./types";
import { join, joinMap, pipe } from "./utils";

/**
 * Retrieves the raw Tailwind CSS typography configuration.
 *
 * @returns  The raw typography configuration.
 */
export function getRawConfig(): TwRawConfig {
  return (fn() as any).config.theme.typography;
}

/**
 * Retrieves the default CSS styles for Tailwind CSS typography.
 *
 * @param options Options for customizing the CSS styles.
 * @returns The default CSS styles for typography.
 */
export function getCssDefaults(options?: TwGetCssOptions): TwCss {
  return getCss(join(getRawConfig()[TW_DEFAULT].css), options);
}

/**
 * Retrieves the CSS styles for a specific Tailwind CSS typography size.
 *
 * @param size The typography size to retrieve CSS styles for.
 * @param options Options for customizing the CSS styles.
 * @returns The CSS styles for the specified typography size.
 */
export function getCssForSize(size: TwSize, options?: TwGetCssOptions): TwCss {
  return getCss(join(getRawConfig()[size].css), options);
}

/**
 * Applies customizations to a set of CSS styles based on the provided options.
 *
 * @param css The CSS styles to customize.
 * @param options Options for customizing the CSS styles.
 * @returns The customized CSS styles.
 */
export function getCss(css: TwCss, options?: TwGetCssOptions): TwCss {
  return pipe(css, getCssWithNestedTags, options?.vars && ((css) => getCssWithVars(css, options?.vars)));
}

/**
 * Retrieves CSS styles for multiple Tailwind CSS typography sizes.
 *
 * @param options Options for customizing the CSS styles for multiple sizes.
 * @returns The CSS styles for multiple typography sizes.
 */
export function getCssForSizes(options?: TwGetCssForSizesOptions): TwCssWithSizes {
  return joinMap(options?.sizes ?? TW_SIZES, (size) => ({
    [size]: getCssForSize(size, options),
  }));
}

/**
 * Adds nested tags to CSS selectors for nested elements.
 *
 * @param css The CSS styles to add nested tags to.
 * @returns The CSS styles with nested tags.
 */
export function getCssWithNestedTags(css: TwCss): TwCss {
  return joinMap(Object.entries(css), ([k, v]) => ({ [typeof v === "object" ? getNestedTag(k) : k]: v }));
}

/**
 * Replaces CSS variable references in styles with their corresponding values from the provided variables.
 *
 * @param css The CSS styles with variable references.
 * @param vars The variables containing the values for the references.
 * @returns The CSS styles with variable values replaced.
 */
export function getCssWithVars(css: TwCss, vars: TwVars): TwCss {
  return joinMap(Object.entries(css), ([k, v]) => ({
    [k]: typeof v === "object" ? getCssWithVars(v, vars) : getValueWithVar(v, vars),
  }));
}

/**
 * Generates a nested CSS selector tag for a given tag.
 *
 * @param tag The tag to generate a nested selector for.
 * @returns The nested CSS selector tag.
 */
export function getNestedTag(tag: string) {
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
export function getValueWithVar(value: string, vars: TwVars) {
  const match = TW_VAR_REGEX.exec(value);

  if (match && vars[match[1]]) value = value.replace(TW_VAR_REGEX, vars[match[1]]);

  return value;
}
