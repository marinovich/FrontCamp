/**
 * 
 * @param {*} element 
 */
export const getSourceItemElement = (element) => {
  if (element.tagName.match(/li/i)) {
    return element;
  } else if (element.tagName.match(/body/i)) {
    return null;
  }

  return getSourceItemElement(element.parentElement);
}
