import { generateLogoUrl } from '../utils/index.js';

// TODO: separate render services and try to use common approach
/**
 * Renders item's list and replaces the gotten by id list with it
 * @param {HTMLElement} list
 * @param {HTMLElement} item
 * @param {Map<string, Object>} data 
 */
export const renderSourceList = (list, item, data) => {
  const documentFragmentList = document.createDocumentFragment();

  data.forEach(element => {
    const newItem = item.cloneNode(true);
    const children = newItem.childNodes;

    children.forEach(item => {
      switch (item.id) {
        case 'source-image': 
          item.src = generateLogoUrl(element.url);
          break;
        case 'item-caption': 
          item.textContent = element.name;
          break;
      }

      item.id = item.id && `${item.id}_${element.id}`; 
    });

    newItem.id = `${item.id}_${element.id}`;
    documentFragmentList.append(newItem);
  });

  // remove sample item
  list.removeChild(item);
  // append document fragment to list
  list.appendChild(documentFragmentList);
};

/**
 * Renders item's list and replaces the gotten by id list with it
 * @param {HTMLElement} list
 * @param {HTMLElement} item
 * @param {Map<string, Object>} data 
 */
export const renderTopRatedList = (list, item, data) => {
  const documentFragmentList = document.createDocumentFragment();

  data.forEach(element => {
    const newItem = item.cloneNode(true);
    const children = newItem.childNodes;

    children.forEach(item => {
      switch (item.nodeName) {
        case 'IMG': 
          item.src = generateLogoUrl(element.url);
          break;
        case 'SPAN': 
          item.textContent = element.name;
          break;
        case 'A': 
          break;
      }

      item.id = item.id && `${item.id}_${element.id}`; 
    });

    newItem.id = `${item.id}_${element.id}`;
    documentFragmentList.append(newItem);
  });

  // remove sample item
  list.removeChild(item);
  // append document fragment to list
  list.appendChild(documentFragmentList);
};
