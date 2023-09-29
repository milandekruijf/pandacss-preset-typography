import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [
    typographyPreset({
      recipe: {
        name: "prose",
        className: "prose",
        sizes: ["sm", "base", "lg", "xl", "2xl"],
        defaultSize: "base",
        notProse: {
          className: "test",
        },
        semanticTokens: {
          defaults: {
            colorPalette: "gray",
          },
          prefix: "prose",
        },
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
