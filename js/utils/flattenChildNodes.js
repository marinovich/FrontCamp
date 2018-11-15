/**
 * Return flattened child nodes of the element. Works as _.flattenDeep
 * @param {HTMLElement} element
 * @returns {HTMLCollection}
 */
export function flattenChildNodes(element) {
  const { children } = element;
  let result = [...children];

  for (const child of children) {
    result = result.concat(flattenChildNodes(child));
  }

  return result;
}
