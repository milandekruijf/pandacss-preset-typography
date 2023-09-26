export namespace Is {
  /**
   * Returns true or false whether or not the provided item
   * is an object (excluding arrays).
   *
   * @param item Item to check whether is an object.
   * @returns Returns true or false whether or not the provided item is an object
   */
  export function object(item: any): boolean {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}
