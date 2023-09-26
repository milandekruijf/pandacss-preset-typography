import { Is } from "./is";

export namespace Merge {
  /**
   * Utility function to create a merge operation.
   *
   * @param list The list of objects to merge.
   * @param options Options used to customize the behavior of
   *  the function. (ex: Use a deep merge instead of shallow).
   * @throws An error if the merge operation isn't supported.
   * @returns The merged object.
   */
  export function create<T>(list: T[], options?: Types.Options): T {
    if (Array.isArray(list) && list.every(Is.object)) return options?.deep ? deep({}, ...list) : shallow({}, ...list);
    throw new Error("Unsupported merge");
  }

  /**
   * Utility function to create a merge operation on a map.
   *
   * All options you would provide to the `create` function can
   * also be specified here.
   *
   * @param list The list of objects to map over and merge.
   * @param fn The map function.
   * @param options Options used to customize the behavior of
   *  the function. (ex: Use a deep merge instead of shallow).
   * @returns The merged and mapped object.
   */
  export function map<T>(list: T[] | readonly T[], fn: (v: T) => any, options?: Types.Options) {
    return create(list.map(fn), options);
  }

  /**
   * Utility function to create a deep merge on the `target` object.
   *
   * @param target The target object to merge to.
   * @param sources The sources to merge into the target object.
   * @returns The deep-merged object.
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
   * Utility function to create a shallow merge on the `target` object.
   *
   * @param target The target object to merge to.
   * @param sources The sources to merge into the target object.
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
