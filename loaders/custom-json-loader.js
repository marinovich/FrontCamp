module.exports = function (source) {
  const result = {};
  const parsedSource = JSON.parse(source);

  // we need to save source json data to show the difference on UI
  result.old = parsedSource;
  result.new = removeNumberAttributeRecursively(parsedSource);

  return JSON.stringify(result);
};

/**
 *
 * @param object
 */
function removeNumberAttributeRecursively(object) {
  return Object.keys(object).reduce(
    (result, key) => {
      const value = object[key];

      // filter only values in object, skipping arrays
      if (typeof value === 'number' && !Array.isArray(object)) {
        return result;
      }

      result[key] = typeof value === 'object'
        ? removeNumberAttributeRecursively(value)
        : value;

      return result;
    },
    // if the object is an array, the acc in reduce also is an array
    Array.isArray(object) ? [] : {}
  );
}
