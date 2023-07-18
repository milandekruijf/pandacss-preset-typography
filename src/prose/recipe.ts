// Original source for the styles are from TailwindCSS Typography:
// https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js

import { defineRecipe } from "@pandacss/dev";
import type { RecipeConfig } from "@pandacss/types";
import { rem, round, em } from "./utils";
import type { ProseRecipeOptions } from "./types";

/**
 * The default name of the prose recipe.
 */
export const DEFAULT_PROSE_RECIPE_NAME = "prose";

/**
 * Creates a prose recipe.
 *
 * @param options The options for the prose recipe.
 * @returns The prose recipe.
 */
export function createProseRecipe(options?: ProseRecipeOptions): RecipeConfig {
  const name = options?.name ?? DEFAULT_PROSE_RECIPE_NAME;
  const jsx = options?.jsx ?? [];

  return defineRecipe({
    name,
    jsx,
    defaultVariants: {
      size: "base",
    },
    base: {
      color: "prose.body",
      maxWidth: "65ch",
      '& [class~="lead"]': {
        color: "prose.lead",
      },
      "& a": {
        color: "prose.link",
        textDecoration: "underline",
        fontWeight: "500",
      },
      "& strong": {
        color: "prose.bold",
        fontWeight: "600",
      },
      "& a strong": {
        color: "inherit",
      },
      "& blockquote strong": {
        color: "inherit",
      },
      "& thead th strong": {
        color: "inherit",
      },
      "& ol": {
        listStyleType: "decimal",
      },
      '& ol[type="A"]': {
        listStyleType: "upper-alpha",
      },
      '& ol[type="a"]': {
        listStyleType: "lower-alpha",
      },
      '& ol[type="A" s]': {
        listStyleType: "upper-alpha",
      },
      '& ol[type="a" s]': {
        listStyleType: "lower-alpha",
      },
      '& ol[type="I"]': {
        listStyleType: "upper-roman",
      },
      '& ol[type="i"]': {
        listStyleType: "lower-roman",
      },
      '& ol[type="I" s]': {
        listStyleType: "upper-roman",
      },
      '& ol[type="i" s]': {
        listStyleType: "lower-roman",
      },
      '& ol[type="1"]': {
        listStyleType: "decimal",
      },
      "& ul": {
        listStyleType: "disc",
      },
      "& ol > li::marker": {
        fontWeight: "400",
        color: "prose.counter",
      },
      "& ul > li::marker": {
        color: "prose.bullet",
      },
      "& hr": {
        borderColor: "prose.hr",
        borderTopWidth: 1,
      },
      "& blockquote": {
        fontWeight: "500",
        fontStyle: "italic",
        color: "prose.quote",
        borderLeftWidth: "0.25rem",
        borderLeftColor: "prose.quote.border",
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
      },
      "& blockquote p:first-of-type::before": {
        content: "open-quote",
      },
      "& blockquote p:last-of-type::after": {
        content: "close-quote",
      },
      "& h1": {
        color: "prose.heading",
        fontWeight: "800",
      },
      "& h1 strong": {
        fontWeight: "900",
        color: "inherit",
      },
      "& h2": {
        color: "prose.heading",
        fontWeight: "700",
      },
      "& h2 strong": {
        fontWeight: "800",
        color: "inherit",
      },
      "& h3": {
        color: "prose.heading",
        fontWeight: "600",
      },
      "& h3 strong": {
        fontWeight: "700",
        color: "inherit",
      },
      "& h4": {
        color: "prose.heading",
        fontWeight: "600",
      },
      "& h4 strong": {
        fontWeight: "700",
        color: "inherit",
      },
      "& figcaption": {
        color: "prose.caption",
      },
      "& code": {
        color: "prose.code",
        fontWeight: "600",
      },
      "& code::before": {
        content: '"`"',
      },
      "& code::after": {
        content: '"`"',
      },
      "& a code": {
        color: "inherit",
      },
      "& h1 code": {
        color: "inherit",
      },
      "& h2 code": {
        color: "inherit",
      },
      "& h3 code": {
        color: "inherit",
      },
      "& h4 code": {
        color: "inherit",
      },
      "& blockquote code": {
        color: "inherit",
      },
      "& thead th code": {
        color: "inherit",
      },
      "& pre": {
        color: "prose.pre.code",
        backgroundColor: "prose.pre.bg",
        overflowX: "auto",
        fontWeight: "400",
      },
      "& pre code": {
        backgroundColor: "transparent",
        borderWidth: "0",
        borderRadius: "0",
        padding: "0",
        fontWeight: "inherit",
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        lineHeight: "inherit",
      },
      "& pre code::before": {
        content: "none",
      },
      "& pre code::after": {
        content: "none",
      },
      "& table": {
        width: "100%",
        tableLayout: "auto",
        textAlign: "left",
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
      },
      "& thead": {
        borderBottomWidth: "1px",
        borderBottomColor: "prose.th.border",
      },
      "& thead th": {
        color: "prose.heading",
        fontWeight: "600",
        verticalAlign: "bottom",
      },
      "& tbody tr": {
        borderBottomWidth: "1px",
        borderBottomColor: "prose.td.border",
      },
      "& tbody tr:last-child": {
        borderBottomWidth: "0",
      },
      "& tbody td": {
        verticalAlign: "baseline",
      },
      "& tfoot": {
        borderTopWidth: "1px",
        borderTopColor: "prose.th.border",
      },
      "& tfoot td": {
        verticalAlign: "top",
      },
    },
    variants: {
      size: {
        sm: {
          fontSize: rem(14),
          lineHeight: round(24 / 14),
          "& p": {
            marginTop: em(16, 14),
            marginBottom: em(16, 14),
          },
          '& [class~="lead"]': {
            fontSize: em(18, 14),
            lineHeight: round(28 / 18),
            marginTop: em(16, 18),
            marginBottom: em(16, 18),
          },
          "& blockquote": {
            marginTop: em(24, 18),
            marginBottom: em(24, 18),
            paddingLeft: em(20, 18),
          },
          "& h1": {
            fontSize: em(30, 14),
            marginTop: "0",
            marginBottom: em(24, 30),
            lineHeight: round(36 / 30),
          },
          "& h2": {
            fontSize: em(20, 14),
            marginTop: em(32, 20),
            marginBottom: em(16, 20),
            lineHeight: round(28 / 20),
          },
          "& h3": {
            fontSize: em(18, 14),
            marginTop: em(28, 18),
            marginBottom: em(8, 18),
            lineHeight: round(28 / 18),
          },
          "& h4": {
            marginTop: em(20, 14),
            marginBottom: em(8, 14),
            lineHeight: round(20 / 14),
          },
          "& img": {
            marginTop: em(24, 14),
            marginBottom: em(24, 14),
          },
          "& video": {
            marginTop: em(24, 14),
            marginBottom: em(24, 14),
          },
          "& figure": {
            marginTop: em(24, 14),
            marginBottom: em(24, 14),
          },
          "& figure > *": {
            marginTop: "0",
            marginBottom: "0",
          },
          "& figcaption": {
            fontSize: em(12, 14),
            lineHeight: round(16 / 12),
            marginTop: em(8, 12),
          },
          "& code": {
            fontSize: em(12, 14),
          },
          "& h2 code": {
            fontSize: em(18, 20),
          },
          "& h3 code": {
            fontSize: em(16, 18),
          },
          "& pre": {
            fontSize: em(12, 14),
            lineHeight: round(20 / 12),
            marginTop: em(20, 12),
            marginBottom: em(20, 12),
            borderRadius: rem(4),
            paddingTop: em(8, 12),
            paddingRight: em(12, 12),
            paddingBottom: em(8, 12),
            paddingLeft: em(12, 12),
          },
          "& ol": {
            marginTop: em(16, 14),
            marginBottom: em(16, 14),
            paddingLeft: em(22, 14),
          },
          "& ul": {
            marginTop: em(16, 14),
            marginBottom: em(16, 14),
            paddingLeft: em(22, 14),
          },
          "& li": {
            marginTop: em(4, 14),
            marginBottom: em(4, 14),
          },
          "& ol > li": {
            paddingLeft: em(6, 14),
          },
          "& ul > li": {
            paddingLeft: em(6, 14),
          },
          "& > ul > li p": {
            marginTop: em(8, 14),
            marginBottom: em(8, 14),
          },
          "& > ul > li > *:first-child": {
            marginTop: em(16, 14),
          },
          "& > ul > li > *:last-child": {
            marginBottom: em(16, 14),
          },
          "& > ol > li > *:first-child": {
            marginTop: em(16, 14),
          },
          "& > ol > li > *:last-child": {
            marginBottom: em(16, 14),
          },
          "& ul ul, & ul ol, & ol ul, & ol ol": {
            marginTop: em(8, 14),
            marginBottom: em(8, 14),
          },
          "& hr": {
            marginTop: em(40, 14),
            marginBottom: em(40, 14),
          },
          "& hr + *": {
            marginTop: "0",
          },
          "& h2 + *": {
            marginTop: "0",
          },
          "& h3 + *": {
            marginTop: "0",
          },
          "& h4 + *": {
            marginTop: "0",
          },
          "& table": {
            fontSize: em(12, 14),
            lineHeight: round(18 / 12),
          },
          "& thead th": {
            paddingRight: em(12, 12),
            paddingBottom: em(8, 12),
            paddingLeft: em(12, 12),
          },
          "& thead th:first-child": {
            paddingLeft: "0",
          },
          "& thead th:last-child": {
            paddingRight: "0",
          },
          "& tbody td, & tfoot td": {
            paddingTop: em(8, 12),
            paddingRight: em(12, 12),
            paddingBottom: em(8, 12),
            paddingLeft: em(12, 12),
          },
          "& tbody td:first-child, & tfoot td:first-child": {
            paddingLeft: "0",
          },
          "& tbody td:last-child, & tfoot td:last-child": {
            paddingRight: "0",
          },
          "& > :first-child": {
            marginTop: "0",
          },
          "& > :last-child": {
            marginBottom: "0",
          },
        },
        base: {
          fontSize: rem(16),
          lineHeight: round(28 / 16),
          "& p": {
            marginTop: em(20, 16),
            marginBottom: em(20, 16),
          },
          '& [class~="lead"]': {
            fontSize: em(20, 16),
            lineHeight: round(32 / 20),
            marginTop: em(24, 20),
            marginBottom: em(24, 20),
          },
          "& blockquote": {
            marginTop: em(32, 20),
            marginBottom: em(32, 20),
            paddingLeft: em(20, 20),
          },
          "& h1": {
            fontSize: em(36, 16),
            marginTop: "0",
            marginBottom: em(32, 36),
            lineHeight: round(40 / 36),
          },
          "& h2": {
            fontSize: em(24, 16),
            marginTop: em(48, 24),
            marginBottom: em(24, 24),
            lineHeight: round(32 / 24),
          },
          "& h3": {
            fontSize: em(20, 16),
            marginTop: em(32, 20),
            marginBottom: em(12, 20),
            lineHeight: round(32 / 20),
          },
          "& h4": {
            marginTop: em(24, 16),
            marginBottom: em(8, 16),
            lineHeight: round(24 / 16),
          },
          "& img": {
            marginTop: em(32, 16),
            marginBottom: em(32, 16),
          },
          "& video": {
            marginTop: em(32, 16),
            marginBottom: em(32, 16),
          },
          "& figure": {
            marginTop: em(32, 16),
            marginBottom: em(32, 16),
          },
          "& figure > *": {
            marginTop: "0",
            marginBottom: "0",
          },
          "& figcaption": {
            fontSize: em(14, 16),
            lineHeight: round(20 / 14),
            marginTop: em(12, 14),
          },
          "& code": {
            fontSize: em(14, 16),
          },
          "& h2 code": {
            fontSize: em(21, 24),
          },
          "& h3 code": {
            fontSize: em(18, 20),
          },
          "& pre": {
            fontSize: em(14, 16),
            lineHeight: round(24 / 14),
            marginTop: em(24, 14),
            marginBottom: em(24, 14),
            borderRadius: rem(6),
            paddingTop: em(12, 14),
            paddingRight: em(16, 14),
            paddingBottom: em(12, 14),
            paddingLeft: em(16, 14),
          },
          "& ol": {
            marginTop: em(20, 16),
            marginBottom: em(20, 16),
            paddingLeft: em(26, 16),
          },
          "& ul": {
            marginTop: em(20, 16),
            marginBottom: em(20, 16),
            paddingLeft: em(26, 16),
          },
          "& li": {
            marginTop: em(8, 16),
            marginBottom: em(8, 16),
          },
          "& ol > li": {
            paddingLeft: em(6, 16),
          },
          "& ul > li": {
            paddingLeft: em(6, 16),
          },
          "& > ul > li p": {
            marginTop: em(12, 16),
            marginBottom: em(12, 16),
          },
          "& > ul > li > *:first-child": {
            marginTop: em(20, 16),
          },
          "& > ul > li > *:last-child": {
            marginBottom: em(20, 16),
          },
          "& > ol > li > *:first-child": {
            marginTop: em(20, 16),
          },
          "& > ol > li > *:last-child": {
            marginBottom: em(20, 16),
          },
          "& ul ul, & ul ol, & ol ul, & ol ol": {
            marginTop: em(12, 16),
            marginBottom: em(12, 16),
          },
          "& hr": {
            marginTop: em(48, 16),
            marginBottom: em(48, 16),
          },
          "& hr + *": {
            marginTop: "0",
          },
          "& h2 + *": {
            marginTop: "0",
          },
          "& h3 + *": {
            marginTop: "0",
          },
          "& h4 + *": {
            marginTop: "0",
          },
          "& table": {
            fontSize: em(14, 16),
            lineHeight: round(24 / 14),
          },
          "& thead th": {
            paddingRight: em(8, 14),
            paddingBottom: em(8, 14),
            paddingLeft: em(8, 14),
          },
          "& thead th:first-child": {
            paddingLeft: "0",
          },
          "& thead th:last-child": {
            paddingRight: "0",
          },
          "& tbody td, & tfoot td": {
            paddingTop: em(8, 14),
            paddingRight: em(8, 14),
            paddingBottom: em(8, 14),
            paddingLeft: em(8, 14),
          },
          "& tbody td:first-child, & tfoot td:first-child": {
            paddingLeft: "0",
          },
          "& tbody td:last-child, & tfoot td:last-child": {
            paddingRight: "0",
          },
          "& > :first-child": {
            marginTop: "0",
          },
          "& > :last-child": {
            marginBottom: "0",
          },
        },
        lg: {
          fontSize: rem(18),
          lineHeight: round(32 / 18),
          "& p": {
            marginTop: em(24, 18),
            marginBottom: em(24, 18),
          },
          '& [class~="lead"]': {
            fontSize: em(22, 18),
            lineHeight: round(32 / 22),
            marginTop: em(24, 22),
            marginBottom: em(24, 22),
          },
          "& blockquote": {
            marginTop: em(40, 24),
            marginBottom: em(40, 24),
            paddingLeft: em(24, 24),
          },
          "& h1": {
            fontSize: em(48, 18),
            marginTop: "0",
            marginBottom: em(40, 48),
            lineHeight: round(48 / 48),
          },
          "& h2": {
            fontSize: em(30, 18),
            marginTop: em(56, 30),
            marginBottom: em(32, 30),
            lineHeight: round(40 / 30),
          },
          "& h3": {
            fontSize: em(24, 18),
            marginTop: em(40, 24),
            marginBottom: em(16, 24),
            lineHeight: round(36 / 24),
          },
          "& h4": {
            marginTop: em(32, 18),
            marginBottom: em(8, 18),
            lineHeight: round(28 / 18),
          },
          "& img": {
            marginTop: em(32, 18),
            marginBottom: em(32, 18),
          },
          "& video": {
            marginTop: em(32, 18),
            marginBottom: em(32, 18),
          },
          "& figure": {
            marginTop: em(32, 18),
            marginBottom: em(32, 18),
          },
          "& figure > *": {
            marginTop: "0",
            marginBottom: "0",
          },
          "& figcaption": {
            fontSize: em(16, 18),
            lineHeight: round(24 / 16),
            marginTop: em(16, 16),
          },
          "& code": {
            fontSize: em(16, 18),
          },
          "& h2 code": {
            fontSize: em(26, 30),
          },
          "& h3 code": {
            fontSize: em(21, 24),
          },
          "& pre": {
            fontSize: em(16, 18),
            lineHeight: round(28 / 16),
            marginTop: em(32, 16),
            marginBottom: em(32, 16),
            borderRadius: rem(6),
            paddingTop: em(16, 16),
            paddingRight: em(24, 16),
            paddingBottom: em(16, 16),
            paddingLeft: em(24, 16),
          },
          "& ol": {
            marginTop: em(24, 18),
            marginBottom: em(24, 18),
            paddingLeft: em(28, 18),
          },
          "& ul": {
            marginTop: em(24, 18),
            marginBottom: em(24, 18),
            paddingLeft: em(28, 18),
          },
          "& li": {
            marginTop: em(12, 18),
            marginBottom: em(12, 18),
          },
          "& ol > li": {
            paddingLeft: em(8, 18),
          },
          "& ul > li": {
            paddingLeft: em(8, 18),
          },
          "& > ul > li p": {
            marginTop: em(16, 18),
            marginBottom: em(16, 18),
          },
          "& > ul > li > *:first-child": {
            marginTop: em(24, 18),
          },
          "& > ul > li > *:last-child": {
            marginBottom: em(24, 18),
          },
          "& > ol > li > *:first-child": {
            marginTop: em(24, 18),
          },
          "& > ol > li > *:last-child": {
            marginBottom: em(24, 18),
          },
          "& ul ul, & ul ol, & ol ul, & ol ol": {
            marginTop: em(16, 18),
            marginBottom: em(16, 18),
          },
          "& hr": {
            marginTop: em(56, 18),
            marginBottom: em(56, 18),
          },
          "& hr + *": {
            marginTop: "0",
          },
          "& h2 + *": {
            marginTop: "0",
          },
          "& h3 + *": {
            marginTop: "0",
          },
          "& h4 + *": {
            marginTop: "0",
          },
          "& table": {
            fontSize: em(16, 18),
            lineHeight: round(24 / 16),
          },
          "& thead th": {
            paddingRight: em(12, 16),
            paddingBottom: em(12, 16),
            paddingLeft: em(12, 16),
          },
          "& thead th:first-child": {
            paddingLeft: "0",
          },
          "& thead th:last-child": {
            paddingRight: "0",
          },
          "& tbody td, & tfoot td": {
            paddingTop: em(12, 16),
            paddingRight: em(12, 16),
            paddingBottom: em(12, 16),
            paddingLeft: em(12, 16),
          },
          "& tbody td:first-child, & tfoot td:first-child": {
            paddingLeft: "0",
          },
          "& tbody td:last-child, & tfoot td:last-child": {
            paddingRight: "0",
          },
          "& > :first-child": {
            marginTop: "0",
          },
          "& > :last-child": {
            marginBottom: "0",
          },
        },
        xl: {
          fontSize: rem(20),
          lineHeight: round(36 / 20),
          "& p": {
            marginTop: em(24, 20),
            marginBottom: em(24, 20),
          },
          '& [class~="lead"]': {
            fontSize: em(24, 20),
            lineHeight: round(36 / 24),
            marginTop: em(24, 24),
            marginBottom: em(24, 24),
          },
          "& blockquote": {
            marginTop: em(48, 30),
            marginBottom: em(48, 30),
            paddingLeft: em(32, 30),
          },
          "& h1": {
            fontSize: em(56, 20),
            marginTop: "0",
            marginBottom: em(48, 56),
            lineHeight: round(56 / 56),
          },
          "& h2": {
            fontSize: em(36, 20),
            marginTop: em(56, 36),
            marginBottom: em(32, 36),
            lineHeight: round(40 / 36),
          },
          "& h3": {
            fontSize: em(30, 20),
            marginTop: em(48, 30),
            marginBottom: em(20, 30),
            lineHeight: round(40 / 30),
          },
          "& h4": {
            marginTop: em(36, 20),
            marginBottom: em(12, 20),
            lineHeight: round(32 / 20),
          },
          "& img": {
            marginTop: em(40, 20),
            marginBottom: em(40, 20),
          },
          "& video": {
            marginTop: em(40, 20),
            marginBottom: em(40, 20),
          },
          "& figure": {
            marginTop: em(40, 20),
            marginBottom: em(40, 20),
          },
          "& figure > *": {
            marginTop: "0",
            marginBottom: "0",
          },
          "& figcaption": {
            fontSize: em(18, 20),
            lineHeight: round(28 / 18),
            marginTop: em(18, 18),
          },
          "& code": {
            fontSize: em(18, 20),
          },
          "& h2 code": {
            fontSize: em(31, 36),
          },
          "& h3 code": {
            fontSize: em(27, 30),
          },
          "& pre": {
            fontSize: em(18, 20),
            lineHeight: round(32 / 18),
            marginTop: em(36, 18),
            marginBottom: em(36, 18),
            borderRadius: rem(8),
            paddingTop: em(20, 18),
            paddingRight: em(24, 18),
            paddingBottom: em(20, 18),
            paddingLeft: em(24, 18),
          },
          "& ol": {
            marginTop: em(24, 20),
            marginBottom: em(24, 20),
            paddingLeft: em(32, 20),
          },
          "& ul": {
            marginTop: em(24, 20),
            marginBottom: em(24, 20),
            paddingLeft: em(32, 20),
          },
          "& li": {
            marginTop: em(12, 20),
            marginBottom: em(12, 20),
          },
          "& ol > li": {
            paddingLeft: em(8, 20),
          },
          "& ul > li": {
            paddingLeft: em(8, 20),
          },
          "& > ul > li p": {
            marginTop: em(16, 20),
            marginBottom: em(16, 20),
          },
          "& > ul > li > *:first-child": {
            marginTop: em(24, 20),
          },
          "& > ul > li > *:last-child": {
            marginBottom: em(24, 20),
          },
          "& > ol > li > *:first-child": {
            marginTop: em(24, 20),
          },
          "& > ol > li > *:last-child": {
            marginBottom: em(24, 20),
          },
          "& ul ul, & ul ol, & ol ul, & ol ol": {
            marginTop: em(16, 20),
            marginBottom: em(16, 20),
          },
          "& hr": {
            marginTop: em(56, 20),
            marginBottom: em(56, 20),
          },
          "& hr + *": {
            marginTop: "0",
          },
          "& h2 + *": {
            marginTop: "0",
          },
          "& h3 + *": {
            marginTop: "0",
          },
          "& h4 + *": {
            marginTop: "0",
          },
          "& table": {
            fontSize: em(18, 20),
            lineHeight: round(28 / 18),
          },
          "& thead th": {
            paddingRight: em(12, 18),
            paddingBottom: em(16, 18),
            paddingLeft: em(12, 18),
          },
          "& thead th:first-child": {
            paddingLeft: "0",
          },
          "& thead th:last-child": {
            paddingRight: "0",
          },
          "& tbody td, & tfoot td": {
            paddingTop: em(16, 18),
            paddingRight: em(12, 18),
            paddingBottom: em(16, 18),
            paddingLeft: em(12, 18),
          },
          "& tbody td:first-child, & tfoot td:first-child": {
            paddingLeft: "0",
          },
          "& tbody td:last-child, & tfoot td:last-child": {
            paddingRight: "0",
          },
          "& > :first-child": {
            marginTop: "0",
          },
          "& > :last-child": {
            marginBottom: "0",
          },
        },
        "2xl": {
          fontSize: rem(24),
          lineHeight: round(40 / 24),
          "& p": {
            marginTop: em(32, 24),
            marginBottom: em(32, 24),
          },
          '& [class~="lead"]': {
            fontSize: em(30, 24),
            lineHeight: round(44 / 30),
            marginTop: em(32, 30),
            marginBottom: em(32, 30),
          },
          "& blockquote": {
            marginTop: em(64, 36),
            marginBottom: em(64, 36),
            paddingLeft: em(40, 36),
          },
          "& h1": {
            fontSize: em(64, 24),
            marginTop: "0",
            marginBottom: em(56, 64),
            lineHeight: round(64 / 64),
          },
          "& h2": {
            fontSize: em(48, 24),
            marginTop: em(72, 48),
            marginBottom: em(40, 48),
            lineHeight: round(52 / 48),
          },
          "& h3": {
            fontSize: em(36, 24),
            marginTop: em(56, 36),
            marginBottom: em(24, 36),
            lineHeight: round(44 / 36),
          },
          "& h4": {
            marginTop: em(40, 24),
            marginBottom: em(16, 24),
            lineHeight: round(36 / 24),
          },
          "& img": {
            marginTop: em(48, 24),
            marginBottom: em(48, 24),
          },
          "& video": {
            marginTop: em(48, 24),
            marginBottom: em(48, 24),
          },
          "& figure": {
            marginTop: em(48, 24),
            marginBottom: em(48, 24),
          },
          "& figure > *": {
            marginTop: "0",
            marginBottom: "0",
          },
          "& figcaption": {
            fontSize: em(20, 24),
            lineHeight: round(32 / 20),
            marginTop: em(20, 20),
          },
          "& code": {
            fontSize: em(20, 24),
          },
          "& h2 code": {
            fontSize: em(42, 48),
          },
          "& h3 code": {
            fontSize: em(32, 36),
          },
          "& pre": {
            fontSize: em(20, 24),
            lineHeight: round(36 / 20),
            marginTop: em(40, 20),
            marginBottom: em(40, 20),
            borderRadius: rem(8),
            paddingTop: em(24, 20),
            paddingRight: em(32, 20),
            paddingBottom: em(24, 20),
            paddingLeft: em(32, 20),
          },
          "& ol": {
            marginTop: em(32, 24),
            marginBottom: em(32, 24),
            paddingLeft: em(38, 24),
          },
          "& ul": {
            marginTop: em(32, 24),
            marginBottom: em(32, 24),
            paddingLeft: em(38, 24),
          },
          "& li": {
            marginTop: em(12, 24),
            marginBottom: em(12, 24),
          },
          "& ol > li": {
            paddingLeft: em(10, 24),
          },
          "& ul > li": {
            paddingLeft: em(10, 24),
          },
          "& > ul > li p": {
            marginTop: em(20, 24),
            marginBottom: em(20, 24),
          },
          "& > ul > li > *:first-child": {
            marginTop: em(32, 24),
          },
          "& > ul > li > *:last-child": {
            marginBottom: em(32, 24),
          },
          "& > ol > li > *:first-child": {
            marginTop: em(32, 24),
          },
          "& > ol > li > *:last-child": {
            marginBottom: em(32, 24),
          },
          "& ul ul, & ul ol, & ol ul, & ol ol": {
            marginTop: em(16, 24),
            marginBottom: em(16, 24),
          },
          "& hr": {
            marginTop: em(72, 24),
            marginBottom: em(72, 24),
          },
          "& hr + *": {
            marginTop: "0",
          },
          "& h2 + *": {
            marginTop: "0",
          },
          "& h3 + *": {
            marginTop: "0",
          },
          "& h4 + *": {
            marginTop: "0",
          },
          "& table": {
            fontSize: em(20, 24),
            lineHeight: round(28 / 20),
          },
          "& thead th": {
            paddingRight: em(12, 20),
            paddingBottom: em(16, 20),
            paddingLeft: em(12, 20),
          },
          "& thead th:first-child": {
            paddingLeft: "0",
          },
          "& thead th:last-child": {
            paddingRight: "0",
          },
          "& tbody td, & tfoot td": {
            paddingTop: em(16, 20),
            paddingRight: em(12, 20),
            paddingBottom: em(16, 20),
            paddingLeft: em(12, 20),
          },
          "& tbody td:first-child, & tfoot td:first-child": {
            paddingLeft: "0",
          },
          "& tbody td:last-child, & tfoot td:last-child": {
            paddingRight: "0",
          },
          "& > :first-child": {
            marginTop: "0",
          },
          "& > :last-child": {
            marginBottom: "0",
          },
        },
      },
    },
  });
}

export default createProseRecipe;
