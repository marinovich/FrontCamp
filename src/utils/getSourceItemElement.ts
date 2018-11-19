import * as Models from '../models';

export const getItemElement: Models.GetItemElementFunction = (element) => {
  if (element.tagName.match(/li/i)) {
    return element;
  }

  if (element.tagName.match(/body/i)) {
    return null;
  }

  return getItemElement(element.parentElement);
};
