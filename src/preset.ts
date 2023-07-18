import { definePreset } from "@pandacss/dev";
import type { Preset } from "@pandacss/types";

import { createRecipe } from "./recipe";

export interface PresetOptions {}

export function createPreset(options?: PresetOptions): Preset {
  return definePreset({
    theme: {
      extend: {
        recipes: {
          typography: createRecipe(),
        },
      },
    },
  });
}

export default createPreset;
