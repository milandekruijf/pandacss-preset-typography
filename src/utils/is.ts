export namespace Is {
  /**
   * Utility function to check if the provided `item` of
   * type `any` is an object (excluding arrays).
   *
   * @param item The item to check.
   * @returns Whether or not the provided `item` of type `any`
   *  is an object (excluding arrays)
   */
  export function object(item: any): boolean {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}
