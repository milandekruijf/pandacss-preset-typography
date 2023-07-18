import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [
    typographyPreset({
      prose: {
        name: "helloworld",
      },
    }),
  ],
  outdir: "out",
});
