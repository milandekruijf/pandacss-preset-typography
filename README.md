[![Downloads][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# Typography preset for PandaCSS

Easy typography for [PandaCSS](https://panda-css.com/) inspired by the [TailwindCSS typography plugin](https://tailwindcss.com/docs/typography-plugin)

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
    // Re-add the panda preset if you want to keep
    // the default keyframes, breakpoints, tokens
    // and textStyles provided by PandaCSS
    "@pandacss/preset-panda",
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

### Options

You can change the default name of the prose recipe (`prose`) and the default colors as shown below.

If you have the [Radix Colors](https://www.npmjs.com/package/pandacss-preset-radix-colors) preset installed for example, you'll get dark mode support out of the box by providing the colors as shown below. These colors combinations aren't fully tested, so change according to preference.

```ts
...
presets: [
  typographyPreset({
    prose: {
      name: "typography",
      colors: {
        body: "slate.10",
        lead: "slate.9",
        link: "slate.12",
        counter: "slate.8",
        bullet: "slate.6",
        hrBorder: "slate.5",
        quote: "slate.12",
        quoteBorder: "slate.5",
        heading: "slate.12",
        caption: "slate.8",
        bold: "slate.12",
        code: "slate.12",
        preCode: "slate.5",
        preBackground: "slate.11",
        thBorder: "slate.6",
        tdBorder: "slate.5",
      },
      // Advanced JSX tracking to improve performance:
      // https://panda-css.com/docs/concepts/recipes#advanced-jsx-tracking
      jsx: ['Button', 'Link', /Button$/]
    }
  }),
],
```

## Attributions

- [Chakra](https://github.com/chakra-ui) team for creating PandaCSS
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
