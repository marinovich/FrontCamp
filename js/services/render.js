import { generateLogoUrl } from '../utils/index.js';

/**
 * Renders item's list and replaces the gotten by id list with it
 * @param {string} listId
 * @param {string} templateId 
 * @param {Map<string, Object>} data 
 */
export const renderList = (listId, itemId, data) => {
  const documentFragmentList = document.createDocumentFragment();
  const list = document.getElementById(listId);
  const item = document.getElementById(itemId);

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
  list.appendChild(documentFragmentList);
};
