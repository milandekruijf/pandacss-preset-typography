import * as Panda from "@pandacss/dev";
import { Recipe } from "./recipe";

export namespace Preset {
  /**
   * Creates a typography preset configuration based on the provided options.
   * If options are provided, it customizes the typography preset configuration accordingly;
   * otherwise, default values are used.
   *
   * @param options The options to customize the typography preset.
   * @returns The configuration for the typography preset.
   */
  export function create(options?: Types.Options): Panda.Preset {
    return Panda.definePreset({
      theme: {
        extend: {
          recipes: Recipe.get(options?.recipe),
        },
      },
    });
  }

  export namespace Types {
    /**
     * Represents options for configuring a Typography Preset.
     */
    export interface Options {
      recipe?: Recipe.Types.Options;
    }
  }
}
