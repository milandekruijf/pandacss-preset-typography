[![Downloads][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# 🐼 PandaCSS preset for typography

A [🐼 PandaCSS](https://panda-css.com/) typography preset inspired by the [TailwindCSS typography plugin](https://tailwindcss.com/docs/typography-plugin)

## Installation

```bash
npm install --save-dev pandacss-preset-typography
```

## Usage

Add the preset to your PandaCSS configuration (`panda.config.ts`)

```ts
import { defineConfig } from "@pandacss/dev";

// Import the preset. The name can be anything you want
import typographyPreset from "pandacss-preset-typography";

export default defineConfig({
  presets: [
    typographyPreset(),
    // Re-add the panda presets if you want to keep
    // the default keyframes, breakpoints, tokens
    // and textStyles provided by PandaCSS
    "@pandacss/dev/presets",
  ],
});
```

## Prose

The preset generates a `prose` recipe for you that you can use to add beautiful typographic defaults to any vanilla HTML you don’t control, like HTML rendered from Markdown, or pulled from a CMS.

### Usage

You can provide 5 different sizes: `sm`, `base`, `lg`, `xl` and `2xl`. If you provide no options, the default size is set as `base`.

```tsx
// Import it from wherever you export panda to, also make sure
// you change the name 'prose' if you've set a custom name.
import { prose } from "@/panda/recipes";

export function Page() {
  return <div className={prose({ size: "lg" })}></div>;
}
```

### Lead

Just like in TailwindCSS, there's also an extra `.lead` class you can apply to any element within the scope of `prose` to get a nice lead paragraph.

### Options

You can change the default name of the recipe (`prose`), the default class name (`prose`) and change other stuff as shown below.

```ts
...
presets: [
  typographyPreset({
    recipe: {
      // The name of the recipe. Useful if you have an other recipe
      // with the same name. It's 'prose' by default.
      name: "prose",

      // The class name that is used for the recipe base class.
      // It's 'prose' by default
      className: "prose",

      // Enable TailwindCSS's 'not-prose' support
      not: true,
      // You may provide an object to set specific options
      // not: {
      //   className: "not-prose"
      // },

      // Advanced JSX tracking: https://panda-css.com/docs/concepts/recipes#advanced-jsx-tracking
      jsx: ['Mdx']
    },
  }),
],
```

### Colors

Colors are currently being handled by CSS variables. The default colors are
as followed:

```ts
{
  semanticTokens: {
    colors: {
      prose: {
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
        hrBorder: {
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
          // Expects an RGB value
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
  },
}
```

If you have the [Radix Colors](https://www.npmjs.com/package/pandacss-preset-radix-colors) preset installed for example, you'll get dark mode support out of the box by providing the colors as shown below. These colors combinations aren't fully tested, so change according to preference.

```

```

## Attributions

- [Chakra](https://github.com/chakra-ui) team for creating [🐼 PandaCSS](https://panda-css.com/)
- [Tailwind](https://github.com/tailwindlabs) team for creating the styles

[contributors-shield]: https://img.shields.io/github/contributors/milandekruijf/pandacss-preset-typography.svg?style=for-the-badge
[contributors-url]: https://github.com/milandekruijf/pandacss-preset-typography/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/milandekruijf/pandacss-preset-typography.svg?style=for-the-badge
[forks-url]: https://github.com/milandekruijf/pandacss-preset-typography/network/members
[stars-shield]: https://img.shields.io/github/stars/milandekruijf/pandacss-preset-typography.svg?style=for-the-badge
[stars-url]: https://github.com/milandekruijf/pandacss-preset-typography/stargazers
[issues-shield]: https://img.shields.io/github/issues/milandekruijf/pandacss-preset-typography.svg?style=for-the-badge
[issues-url]: https://github.com/milandekruijf/pandacss-preset-typography/issues
[license-shield]: https://img.shields.io/github/license/milandekruijf/pandacss-preset-typography.svg?style=for-the-badge
[license-url]: https://github.com/milandekruijf/pandacss-preset-typography/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/milandekruijf
[npm-shield]: https://img.shields.io/npm/dw/pandacss-preset-typography?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/pandacss-preset-typography
