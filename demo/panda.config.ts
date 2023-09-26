import { defineConfig } from "@pandacss/dev";
import typographyPreset from "../src";
import radixColors from "pandacss-preset-radix-colors";

export default defineConfig({
  preflight: true,
  include: ["app/**/*.tsx"],
  presets: [
    radixColors(),
    typographyPreset({
      recipe: {
        name: "prose",
        className: "prose",
        not: true,
      },
    }),
    "@pandacss/preset-panda",
  ],
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          prose: {
            body: {
              value: "{colors.slate.12}",
            },
            lead: {
              value: "{colors.slate.11}",
            },
          },
        },
      },
    },
  },
  outdir: "@pandacss/out",
  emitPackage: true,
});
