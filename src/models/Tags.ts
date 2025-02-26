/**
 * Represents a tag filter with a key-value pair.
 * Example: { key: "color", value: "blue" }
 */
export interface TagFilter {
    key: string;
    value?: string; // Optional, just like Python's `Optional[str]`
  }
  
  /**
   * Logical AND operation for multiple filters.
   * Example: { "and_": [ { key: "color", value: "blue" }, { key: "size", value: "large" } ] }
   */
  export interface AndOp<T> {
    and_: BoolFilter<T>[]; // Array of filters
  }
  
  /**
   * Logical OR operation for multiple filters.
   * Example: { "or_": [ { key: "color", value: "blue" }, { key: "color", value: "yellow" } ] }
   */
  export interface OrOp<T> {
    or_: BoolFilter<T>[]; // Array of filters
  }
  
  /**
   * Logical NOT operation to negate a filter.
   * Example: { "not_": { key: "color", value: "blue" } }
   */
  export interface NotOp<T> {
    not_: BoolFilter<T>; // Single filter
  }
  
  /**
   * BoolFilter - A union type that allows:
   * - A single tag filter
   * - A combination of AND, OR, or NOT operations
   */
  export type BoolFilter<T> = T | AndOp<T> | OrOp<T> | NotOp<T>;