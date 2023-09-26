import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [
    typographyPreset({
      recipe: {
        name: "prose",
        className: "hello",
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
