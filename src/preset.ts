import * as Panda from "@pandacss/dev";
import { Recipe } from "./recipe";

export namespace Preset {
  /**
   * Create a new preset using the provided `options`.
   *
   * @param options The options used to customize the behavior
   *  of the preset.
   * @returns The newly created preset that can be used in the
   *  `presets` array inside your `panda.config.ts`
   */
  export function create(options?: Types.Options): Panda.Preset {
    return Panda.definePreset({
      theme: {
        extend: {
          recipes: Recipe.getRecord(options?.recipe),
          semanticTokens: Recipe.createDefaultSemanticTokens({ recipe: options?.recipe }),
        },
      },
    });
  }

  export namespace Types {
    export interface Options {
      recipe?: Recipe.Types.Options;
    }
  }
}
