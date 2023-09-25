/**
 * Convert an array of objects to a single object. This
 * will also merge duplicate keys.
 *
 * @param objectList The list of objects to convert.
 * @returns The object.
 */
export function objectListToObject(objectList: any[]) {
  return Object.assign({}, ...objectList);
}

/**
 * Necessary to create nested styles in PandaCSS.
 * https://panda-css.com/docs/concepts/writing-styles#native-css-nesting
 *
 * @param tag The tag to transform into a nested tag.
 * @returns The nested tag.
 */
export function tagToNested(tag: string) {
  return tag
    .split(", ")
    .map((tag) => `& ${tag}`)
    .join(", ");
}
