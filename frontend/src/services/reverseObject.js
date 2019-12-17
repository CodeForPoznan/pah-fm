/**
 * Swap keys with values of object.
 *
 * @example
 * {
 *  key1: [value1],
 *  key2: [value2, value3]
 * }
 * //will be converted to:
 * {
 *  value1: key1,
 *  value2: key2,
 *  value3: key2
 * }
 */
export const reverseObject = objectToReverse =>
  Object.entries(objectToReverse).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...value.reduce((a, v) => ({ ...a, ...{ [v]: key } }), {}),
    }),
    {},
  );
