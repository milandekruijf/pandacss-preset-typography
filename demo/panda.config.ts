import { defineConfig } from "@pandacss/dev";
import typographyPreset from "../src";
import radixColors from "pandacss-preset-radix-colors";

export default defineConfig({
  preflight: true,
  include: ["app/**/*.tsx"],
  presets: [
    radixColors(),
    typographyPreset(),
    // typographyPreset({
    //   prose: {
    //     colors: {
    //       body: "slate.12",
    //       lead: "slate.12",
    //       link: "blue.11",
    //       counter: "slate.11",
    //       bullet: "slate.11",
    //       hrBorder: "slate.6",
    //       quote: "slate.11",
    //       quoteBorder: "slate.6",
    //       heading: "slate.12",
    //       caption: "slate.11",
    //       bold: "slate.12",
    //       code: "amber.11",
    //       preCode: "slate.12",
    //       preBackground: "slate.2",
    //       thBorder: "slate.6",
    //       tdBorder: "slate.6",
    //       kbd: "amber.11",
    //       kbdShadowRgb: "0 0 0",
    //     },
    //   },
    // }),
    "@pandacss/preset-panda",
  ],
  outdir: "@pandacss/out",
  emitPackage: true,
});
