export namespace Pipe {
  /**
   * Applies a series of functions to a value, passing the result of one function to the next.
   *
   * @param val The initial value.
   * @param fns The functions to apply sequentially.
   * @returns The final result after applying all functions.
   */
  export function create<T>(val: T, ...fns: ((val: T) => T)[]): T {
    if (fns.length === 0) return val;
    const [curr, ...rest] = fns;
    return create(curr ? curr(val) : val, ...rest);
  }
}
