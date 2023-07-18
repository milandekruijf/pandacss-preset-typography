[![Downloads][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# Radix Colors preset for PandaCSS

Easy Typography for [PandaCSS](https://panda-css.com/) inspired by [TailwindCSS Typography](https://tailwindcss.com/docs/typography-plugin)

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
