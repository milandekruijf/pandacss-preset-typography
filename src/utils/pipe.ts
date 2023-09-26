export namespace Pipe {
  /**
   * Utility pine function that is used to chain multiple
   * functions and their results after one another, taking
   * in the result of the previous function to create the
   * next.
   *
   * @param val The initial value to use, which is also used
   *  to infer the type for the rest of the functions.
   * @param fns The functions to use that are executed in order.
   *  Every next function takes in the result of the previous.
   * @returns The final result from the final pipe function.
   */
  export function create<T>(val: T, ...fns: ((val: T) => T)[]): T {
    if (fns.length === 0) return val;
    const [curr, ...rest] = fns;
    return create(curr ? curr(val) : val, ...rest);
  }
}
