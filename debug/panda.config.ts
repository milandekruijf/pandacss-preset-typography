import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [
    typographyPreset({
      recipe: {
        name: "prose",
        className: "prose",
        sizes: ["sm", "base", "lg", "xl", "2xl"],
        semanticTokens: {
          defaults: {
            colorPalette: "gray",
          },
          prefix: "prose",
        },
        jsx: ["Mdx"],
      },
    }),
  ],
  theme: {
    extend: {
      tokens: {
        colors: {
          prose: {
            body: {
              value: "#fff",
            },
          },
        },
      },
    },
  },
  outdir: "out",
});
