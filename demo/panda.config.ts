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
    "@pandacss/preset-panda",
  ],
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          test: {
            body: {
              value: "{colors.slate.700}",
            },
            heading: {
              value: "{colors.slate.900}",
            },
            lead: {
              value: "{colors.slate.600}",
            },
            link: {
              value: "{colors.slate.900}",
            },
            bold: {
              value: "{colors.slate.900}",
            },
            counter: {
              value: "{colors.slate.500}",
            },
            bullet: {
              value: "{colors.slate.300}",
            },
            hr: {
              value: "{colors.slate.200}",
            },
            quote: {
              value: "{colors.slate.900}",
            },
            quoteBorder: {
              value: "{colors.slate.200}",
            },
            caption: {
              value: "{colors.slate.500}",
            },
            kbd: {
              value: "{colors.slate.900}",
            },
            kbdShadow: {
              value: "0 0 0",
            },
            code: {
              value: "{colors.slate.900}",
            },
            preCode: {
              value: "{colors.slate.200}",
            },
            preBg: {
              value: "{colors.slate.800}",
            },
            thBorder: {
              value: "{colors.slate.300}",
            },
            tdBorder: {
              value: "{colors.slate.200}",
            },
          },
        },
      },
    },
  },
  outdir: "@pandacss/out",
  emitPackage: true,
});
