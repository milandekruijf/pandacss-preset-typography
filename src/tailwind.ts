import { DEFAULT_RECIPE_NAME } from "./constants";
import { GetCssFromTailwindOptions } from "./types";
import twTypography from "@tailwindcss/typography"

// TODO: Quite a mess. Maybe clean up?
export function getCssFromTailwind(options?: GetCssFromTailwindOptions) {
  const cfg = (twTypography() as any).config.theme
    .typography;
  // Map all the necessary styles next to each other for easy processing
  const css = {
    default: Object.assign({}, cfg.DEFAULT.css[0], cfg.base.css[1]),
    sm: Object.assign({}, cfg.sm.css[0]),
    base: Object.assign({}, cfg.base.css[0]),
    lg: Object.assign({}, cfg.lg.css[0]),
    xl: Object.assign({}, cfg.xl.css[0]),
    "2xl": Object.assign({}, cfg["2xl"].css[0]),
  };
  // Transform every tw-prose variable to our own.
  const varPrefix = options?.varPrefix ?? DEFAULT_RECIPE_NAME;
  const vars = {
    "var(--tw-prose-body)": `var(--colors-${varPrefix}-body)`,
    "var(--tw-prose-headings)": `var(--colors-${varPrefix}-heading)`,
    "var(--tw-prose-lead)": `var(--colors-${varPrefix}-lead)`,
    "var(--tw-prose-links)": `var(--colors-${varPrefix}-link)`,
    "var(--tw-prose-bold)": `var(--colors-${varPrefix}-bold)`,
    "var(--tw-prose-counters)": `var(--colors-${varPrefix}-counter)`,
    "var(--tw-prose-bullets)": `var(--colors-${varPrefix}-bullet)`,
    "var(--tw-prose-hr)": `var(--colors-${varPrefix}-hr-border)`,
    "var(--tw-prose-quotes)": `var(--colors-${varPrefix}-quote)`,
    "var(--tw-prose-quote-borders)": `var(--colors-${varPrefix}-quote-border)`,
    "var(--tw-prose-captions)": `var(--colors-${varPrefix}-caption)`,
    "var(--tw-prose-kbd)": `var(--colors-${varPrefix}-kbd)`,
    "var(--tw-prose-kbd-shadows)": `var(--colors-${varPrefix}-kbd-shadow)`,
    "var(--tw-prose-code)": `var(--colors-${varPrefix}-code)`,
    "var(--tw-prose-pre-code)": `var(--colors-${varPrefix}-pre-code)`,
    "var(--tw-prose-pre-bg)": `var(--colors-${varPrefix}-pre-bg)`,
    "var(--tw-prose-th-borders)": `var(--colors-${varPrefix}-th-border)`,
    "var(--tw-prose-td-borders)": `var(--colors-${varPrefix}-td-border)`,
  };
  Object.entries(css).forEach(([k0, v0]) => {
    Object.entries(v0).forEach(([k1, v1]) => {
      if (typeof v1 === "string")
        Object.entries(vars).forEach(
          ([m, r]) => (css[k0][k1] = css[k0][k1].replaceAll(m, r))
        );
      if (typeof v1 == "object") {
        // Remove if object contains nothing.
        if (Object.entries(v1).length === 0) {
          delete css[k0][k1];
          return;
        }
        Object.entries(v1).forEach(([k2, v2]) => {
          if (typeof v2 === "string") {
            // Replace variables.
            Object.entries(vars).forEach(
              ([m, r]) => (css[k0][k1][k2] = css[k0][k1][k2].replaceAll(m, r))
            );
          }
          // Some values are set to "0". We set it to 0px
          // instead so it won't resolve to variables.
          if (v2 === "0") css[k0][k1][k2] = "0px";
        });
        // Remove the current record because we'll overwrite it.
        delete css[k0][k1];
        // Add not-prose functionality.
        if (options?.notProse) {
          const { notProse } = options;
          const className =
            typeof notProse === "object" ? notProse.className : "not-prose";
          k1 = `:where(${k1}):not(:where([class~="${className}"],[class~="${className}"] *))`;
        }
        // Make selectors nested. Which is necessary
        // for PandaCSS to function.
        k1 = k1
          .split(", ")
          .map((x) => `& ${x}`)
          .join(", ");
        css[k0][k1] = v1;
      }
    });
  });
  return css;
}
