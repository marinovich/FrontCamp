/**
 *
 * @param {HTMLElement} element
 * @returns {HTMLCollection}
 */
export function flattenChildNodes(element: HTMLElement) {
  const children = Array.from(element.children);
  let result = [...children];

  for (const child of children) {
    result = result.concat(flattenChildNodes(child as HTMLElement));
  }

  return result;
}
