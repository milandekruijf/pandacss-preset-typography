import { Is } from "./is";

export namespace Merge {
  /**
   * Merges a list of objects into a single object by merging their properties.
   *
   * @param list The list of objects to be merged.
   * @param options Options for customizing the merge operation.
   * @throws Throws an error if the input is not a list of objects.
   * @returns The merged object.
   */
  export function create<T>(list: T[], options?: Types.Options): T {
    if (Array.isArray(list) && list.every(Is.object)) return options?.deep ? deep({}, ...list) : shallow({}, ...list);
    throw new Error("Unsupported merge");
  }

  /**
   * Maps a function over a list or readonly list and then merges the results into a single object.
   *
   * @param list The list to map over and merge.
   * @param fn The mapping function to apply to each element.
   * @returns The merged object.
   */
  export function map<T>(list: T[] | readonly T[], fn: (v: T) => any, options?: Types.Options) {
    return create(list.map(fn), options);
  }

  /**
   * Recursively merges objects deeply.
   *
   * @param target The target object to merge into.
   * @param sources The source objects to merge from.
   * @returns The merged object.
   */
  export function deep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;

    const source = sources.shift();

    if (Is.object(target) && Is.object(source)) {
      for (const key in source) {
        if (Is.object(source[key])) {
          if (!target[key]) shallow(target, { [key]: {} });
          deep(target[key], source[key]);
        } else {
          shallow(target, { [key]: source[key] });
        }
      }
    }

    return deep(target, ...sources);
  }

  /**
   * Merges multiple source objects into a target object by shallowly copying their properties.
   *
   * @param target The target object to merge into.
   * @param sources The source objects to merge from.
   */
  export function shallow(target: any, ...sources: any[]) {
    Object.assign(target, ...sources);
  }

  export namespace Types {
    export type Options = {
      deep?: boolean;
    };
  }
}
