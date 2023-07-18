import { defineConfig } from "@pandacss/dev";

import typographyPreset from "../dist";

export default defineConfig({
  presets: [typographyPreset(), "@pandacss/preset-panda"],
  outdir: "debug/out",
});
