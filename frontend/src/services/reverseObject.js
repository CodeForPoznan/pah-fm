/**
 * Swap keys with values of object.
 *
 * @example
 * {
 *  key1: value1,
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
  Object.keys(objectToReverse).reduce(
    (acc, key) => ({
      ...acc,
      ...objectToReverse[key].reduce(
        (acc2, value) => ({ ...acc2, ...{ [value]: key } }),
        {},
      ),
    }),
    {},
  );
