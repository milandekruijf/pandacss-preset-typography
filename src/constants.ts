import type { TwVars } from "./types";

/**
 * The default name for the Prose Recipe.
 */
export const DEFAULT_RECIPE_NAME = "prose";

/**
 * The default CSS class name for the Prose Recipe.
 */
export const DEFAULT_RECIPE_CLASS_NAME = "prose";

/**
 * Default Tailwind CSS variables with their corresponding values.
 */
export const DEFAULT_TW_VARS: Required<TwVars> = {
  body: "var(--prose-body)",
  headings: "var(--prose-headings)",
  lead: "var(--prose-lead)",
  links: "var(--prose-links)",
  bold: "var(--prose-bold)",
  counters: "var(--prose-counters)",
  bullets: "var(--prose-bullets)",
  hr: "var(--prose-hr)",
  quotes: "var(--prose-quotes)",
  "quote-borders": "var(--prose-quote-borders)",
  captions: "var(--prose-captions)",
  kbd: "var(--prose-kbd)",
  "kbd-shadows": "var(--prose-kbd-shadows)",
  code: "var(--prose-code)",
  "pre-code": "var(--prose-pre-code)",
  "pre-bg": "var(--prose-pre-bg)",
  "th-borders": "var(--prose-th-borders)",
  "td-borders": "var(--prose-td-borders)",
};

/**
 * Default Tailwind CSS configuration key for the default style.
 */
export const TW_DEFAULT = "DEFAULT";

/**
 * Available Tailwind CSS typography size options.
 */
export const TW_SIZES = ["sm", "base", "lg", "xl", "2xl"] as const;

/**
 * Regular expression to match Tailwind CSS variable references in styles.
 */
export const TW_VAR_REGEX = /var\(--tw-prose-(.*?)\)/g;
