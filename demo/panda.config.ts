import { defineConfig } from "@pandacss/dev";
import typographyPreset from "../src";
import radixColors from "pandacss-preset-radix-colors";

export default defineConfig({
  preflight: true,
  include: ["app/**/*.tsx"],
  presets: [
    radixColors(),
    typographyPreset({
      recipes: {
        prose: {
          vars: {
            body: "slate.12",
            lead: "slate.12",
            links: "blue.11",
            counters: "slate.11",
            bullets: "slate.11",
            hr: "slate.6",
            quotes: "slate.11",
            "quote-borders": "slate.6",
            headings: "slate.12",
            captions: "slate.11",
            bold: "slate.12",
            code: "amber.11",
            "pre-code": "slate.12",
            "pre-bg": "slate.2",
            "th-borders": "slate.6",
            "td-borders": "slate.6",
            kbd: "amber.11",
            "kbd-shadows": "0 0 0",
          },
        },
      },
    }),
    "@pandacss/preset-panda",
  ],
  outdir: "@pandacss/out",
  emitPackage: true,
});
