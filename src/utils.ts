/**
 * Check if a value is an object (`{}`)
 *
 * @param value The value to check
 * @returns If the value is an object
 */
export function isObject(value: any) {
  return value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merge objects together. This will merge objects
 * together recursively and merge duplicate keys.
 *
 * @param target The target object
 * @param sources The source objects
 * @returns The merged object
 */
export function mergeObjects(target: any, ...sources: any[]) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeObjects(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeObjects(target, ...sources);
}
