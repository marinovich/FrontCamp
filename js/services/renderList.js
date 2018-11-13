import { generateLogoUrl, flattenChildNodes } from '../utils/index.js';

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

      // TODO: add comment
      item.id = item.id && `${item.id}_${element.id}`; 
    });

    newItem.id = `${item.id}_${element.id}`;
    documentFragmentList.append(newItem);
  });

  // remove previous added items
  while (item !== list.lastChild) {
    list.removeChild(list.lastChild);
  }

  // append document fragment to list
  list.appendChild(documentFragmentList);
};
   