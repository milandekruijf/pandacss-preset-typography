import { TW_PROSE_VAR_REGEX, TW_PROSE_RAW_VAR_REGEX } from "./constants";

/**
 * Checks if it is a TailwindCSS prose variable.
 *
 * @param value The value to check.
 * @returns Whether or not the value is a TailwindCSS variable.
 */
export function isTwProseVar(value: string) {
  return TW_PROSE_RAW_VAR_REGEX.test(value);
}

/**
 * Extract the name of a TailwindCSS prose variable.
 *
 * @param value The value to extract from.
 * @returns The name of the TailwindCSS prose variable.
 */
export function extractTwProseVarName(value: string) {
  const match = TW_PROSE_VAR_REGEX.exec(value);

  return match ? match[1] : null;
}

/**
 * Replace TailwindCSS prose variables with own value.
 *
 * @param str The string to replace in.
 * @param value The value to replace it with.
 * @returns The replaced string
 */
export function replaceTwProseVar(str: string, value: string) {
  return str.replace(TW_PROSE_VAR_REGEX, value);
}
