import type { JoinOptions } from "./types";

/**
 * Joins a list of objects into a single object by merging their properties.
 *
 * @param list The list of objects to be joined.
 * @param options Options for customizing the join operation.
 * @throws Throws an error if the input is not a list of objects.
 * @returns The joined object.
 */
export function join<T>(list: T[], options?: JoinOptions): T {
  if (Array.isArray(list) && list.every(isObject))
    return options?.merge?.deep ?? true ? deepMerge({}, ...list) : shallowMerge({}, ...list);

  throw new Error("Unsupported join");
}

/**
 * Maps a function over a list or readonly list and then joins the results into a single object.
 *
 * @param list The list to map over and join.
 * @param fn The mapping function to apply to each element.
 * @returns The joined object.
 */
export function joinMap<T>(list: T[] | readonly T[], fn: (v: T) => any) {
  return join(list.map(fn));
}

/**
 * Applies a series of functions to a value, passing the result of one function to the next.
 *
 * @param val The initial value.
 * @param fns The functions to apply sequentially.
 * @returns The final result after applying all functions.
 */
export function pipe<T>(val: T, ...fns: ((val: T) => T)[]): T {
  if (fns.length === 0) return val;
  const [curr, ...rest] = fns;
  return pipe(curr ? curr(val) : val, ...rest);
}

/**
 * Checks if a given item is an object (excluding arrays).
 *
 * @param The item to be checked.
 * @returns Returns true if the item is an object (excluding arrays), otherwise returns false.
 */
export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Recursively merges objects deeply.
 *
 * @param target The target object to merge into.
 * @param sources The source objects to merge from.
 * @returns The merged object.
 */
export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) shallowMerge(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        shallowMerge(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Merges multiple source objects into a target object by shallowly copying their properties.
 *
 * @param target The target object to merge into.
 * @param sources The source objects to merge from.
 */
export function shallowMerge(target: any, ...sources: any[]) {
  Object.assign(target, ...sources);
}
