/**
 * Stricter subset of `keyBy` from "lodash":
 * - only iterates over array (first argument)
 * - supports only `PropertyKey` as the iteratee (second argument)
 * - array elements must contain iteratee 
 * - iteratee does not have default value, so it's required
 * 
 * TODO: use `keyBy` from "lodash-es" when infrastructure supports
 */
export function keyBy<
  K extends PropertyKey,
  V extends PropertyKey,
  T extends Record<K, V>,
>(array: Array<T>, key: K) {
  return array.reduce(
    (acc, x) => ({ ...acc, [x[key]]: x }),
    {},
  );
};
