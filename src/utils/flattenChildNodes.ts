/**
 *
 * @param {HTMLElement} element
 */
export const flattenChildNodes = (element: HTMLElement): Element[] => {
  const children = Array.from(element.children);
  let result = [...children];

  for (const child of children) {
    result = result.concat(flattenChildNodes(child as HTMLElement));
  }

  return result;
};
