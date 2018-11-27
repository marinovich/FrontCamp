module.exports = function (source) {
  const parsedSource = JSON.parse(source);
  const result = {
    old: parsedSource,
    new: null,
  };

  result.new = removeNumberAttributeRecursively(parsedSource);

  return JSON.stringify(result, undefined, 2);
};

/**
 * 
 * @param object 
 */
function removeNumberAttributeRecursively(object) {
  return Object.keys(object).reduce(
    (result, key) => {
      const value = object[key];

      if (typeof value === 'number') {
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
