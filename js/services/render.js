import { generateLogoUrl } from '../utils/index.js';

/**
 * Renders item's list and replaces the gotten by id list with it
 * @param {HTMLElement} list
 * @param {HTMLElement} item
 * @param {Map<string, Object>} data 
 */
export const renderList = (list, item, data) => {
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
