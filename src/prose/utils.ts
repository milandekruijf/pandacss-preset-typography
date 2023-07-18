/**
 * Rounds a number to 7 decimal places, removes trailing zeros, and removes
 * trailing decimal point if the number is an integer.
 *
 * @param num The number to round.
 * @returns The rounded number.
 */
export function round(num: number) {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
}

/**
 * Converts a pixel value to a rem value.
 *
 * @param px The pixel value to convert.
 * @returns The rem value.
 */
export function rem(px: number) {
  return `${round(px / 16)}rem`;
}

/**
 * Converts a pixel value to an em value.
 *
 * @param px The pixel value to convert.
 * @param base The base pixel value.
 * @returns The em value.
 */
export function em(px: number, base: number) {
  return `${round(px / base)}em`;
}
