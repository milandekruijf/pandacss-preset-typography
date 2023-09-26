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
        name: "test",
        className: "prose",
        not: false,
      },
    }),
    "@pandacss/dev/presets",
  ],
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          test: {
            body: {
              value: "{colors.slate.12}",
            },
            heading: {
              value: "{colors.slate.12}",
            },
            lead: {
              value: "{colors.slate.12}",
            },
            link: {
              value: "{colors.blue.11}",
            },
            bold: {
              value: "{colors.slate.12}",
            },
            counter: {
              value: "{colors.slate.11}",
            },
            bullet: {
              value: "{colors.slate.11}",
            },
            hrBorder: {
              value: "{colors.slate.6}",
            },
            quote: {
              value: "{colors.slate.11}",
            },
            quoteBorder: {
              value: "{colors.slate.6}",
            },
            caption: {
              value: "{colors.slate.11}",
            },
            kbd: {
              value: "{colors.slate.11}",
            },
            kbdShadow: {
              value: "0 0 0",
            },
            code: {
              value: "{colors.amber.11}",
            },
            preCode: {
              value: "{colors.slate.12}",
            },
            preBg: {
              value: "{colors.slate.2}",
            },
            thBorder: {
              value: "{colors.slate.6}",
            },
            tdBorder: {
              value: "{colors.slate.6}",
            },
          },
        },
      },
    },
  },
  outdir: "@pandacss/out",
  emitPackage: true,
});
