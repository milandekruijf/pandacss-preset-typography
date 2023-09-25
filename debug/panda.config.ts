import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [
    typographyPreset({
      recipes: {
        prose: [
          {
            name: "prose",
            className: "hello",
          },
        ],
      },
    }),
  ],
  outdir: "out",
});
