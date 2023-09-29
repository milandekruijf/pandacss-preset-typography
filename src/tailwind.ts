import { DEFAULT_RECIPE_NAME } from "./constants";
import { GetCssFromTailwindOptions } from "./types";

// TODO: Quite a mess. Maybe clean up?
export function getCssFromTailwind(options?: GetCssFromTailwindOptions) {
  const cfg = (require("@tailwindcss/typography")() as any).config.theme
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
    "--tw-prose-body": `--colors-${varPrefix}-body`,
    "--tw-prose-headings": `--colors-${varPrefix}-heading`,
    "--tw-prose-lead": `--colors-${varPrefix}-lead`,
    "--tw-prose-links": `--colors-${varPrefix}-link`,
    "--tw-prose-bold": `--colors-${varPrefix}-bold`,
    "--tw-prose-counters": `--colors-${varPrefix}-counter`,
    "--tw-prose-bullets": `--colors-${varPrefix}-bullet`,
    "--tw-prose-hr": `--colors-${varPrefix}-hr-border`,
    "--tw-prose-quotes": `--colors-${varPrefix}-quote`,
    "--tw-prose-quote-borders": `--colors-${varPrefix}-quote-border`,
    "--tw-prose-captions": `--colors-${varPrefix}-caption`,
    "--tw-prose-kbd": `--colors-${varPrefix}-kbd`,
    "--tw-prose-kbd-shadows": `--colors-${varPrefix}-kbd-shadow`,
    "--tw-prose-code": `--colors-${varPrefix}-code`,
    "--tw-prose-pre-code": `--colors-${varPrefix}-pre-code`,
    "--tw-prose-pre-bg": `--colors-${varPrefix}-pre-bg`,
    "--tw-prose-th-borders": `--colors-${varPrefix}-th-border`,
    "--tw-prose-td-borders": `--colors-${varPrefix}-td-border`,
  };
  Object.entries(css).forEach(([k0, v0]) => {
    Object.entries(v0).forEach(([k1, v1]) => {
      if (typeof v1 === "string")
        // Replace variables.
        Object.entries(vars).forEach(
          ([m, r]) => (css[k0][k1] = v1.replaceAll(m, r))
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
              ([m, r]) => (css[k0][k1][k2] = v2.replaceAll(m, r))
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
