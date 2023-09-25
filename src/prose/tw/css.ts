import { objectListToObject, tagToNested } from "../../utils";
import type { ExtractTwCssOptions } from "./types";
import { isTwProseVar, extractTwProseVarName, replaceTwProseVar } from "./utils";

// We extract the css from here
import * as styles from "@tailwindcss/typography/src/styles.js";

export function extractTwProseCss(options?: ExtractTwCssOptions) {
  const keys = ["DEFAULT", "sm", "base", "lg", "xl", "2xl"];

  return objectListToObject(
    keys.map((key, i) => {
      // TODO: This works, but it adds some shared css to multiple sizes.
      const css = key === "DEFAULT" ? styles[key].css[0] : objectListToObject(styles[key].css);

      const result = {};
      Object.entries(css).forEach(([tag, props]) => {
        // Some variables get added to the DEFAULT css.
        // We do not want to include those.
        if (isTwProseVar(tag)) return;

        // Only do this if it's a style object.
        if (typeof props === "object") {
          // Necessary to create nested styles in PandaCSS.
          // https://panda-css.com/docs/concepts/writing-styles#native-css-nesting
          tag = tagToNested(tag);
        }

        // Map variables to set colors using the varMap option.
        if (options?.varMap) {
          if (typeof props === "object") {
            Object.entries(props).forEach(([key, value]) => {
              const extractedTwProseVarName = extractTwProseVarName(value);

              if (extractedTwProseVarName)
                props[key] = replaceTwProseVar(props[key], options.varMap[extractedTwProseVarName]);
            });
          } else if (typeof props === "string") {
            const extractedTwProseVarName = extractTwProseVarName(props);

            if (extractedTwProseVarName) props = replaceTwProseVar(props, options.varMap[extractedTwProseVarName]);
          }
        }

        result[tag] = props;
      });

      return { [key]: result };
    })
  );
}
