/**
 * Returns parent 'li' element if it exists, otherwise returns null
 * @param {HTMLElement} element
 */
export const getItemElement = (element) => {
  if (element.tagName.match(/li/i)) {
    return element;
  }

  if (element.tagName.match(/body/i)) {
    return null;
  }

  return getItemElement(element.parentElement);
};
