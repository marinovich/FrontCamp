import { generateLogoUrl, flattenChildNodes, generateUniqueId } from '../utils/index.js';

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
    const children = flattenChildNodes(newItem);

    // TODO: need to create a separate service(s)
    children.forEach(item => {
      switch (item.id) {
        
        // for source items
        case 'source-image': 
          item.src = generateLogoUrl(element.url);
          break;
        case 'source-caption': 
          item.textContent = element.name;
          break;

        // for article items
        case 'top-rated-image':
          item.src = element.urlToImage ? element.urlToImage : item.src;
          break;
        case 'article-caption':
          item.textContent = element.title;
          break;
        case 'article-description':
          item.textContent = element.description;
          break;
        case 'article-link':
          item.href = element.url;
          break;
      }

      // add id postfix only for items with id
      item.id = item.id && `${item.id}_${element.id || generateUniqueId()}`; 
    });

    newItem.id = `${item.id}_${element.id || generateUniqueId()}`;
    documentFragmentList.append(newItem);
  });

  // remove previous added items
  while (item !== list.lastChild) {
    list.removeChild(list.lastChild);
  }

  // append document fragment to list
  list.appendChild(documentFragmentList);
};
   