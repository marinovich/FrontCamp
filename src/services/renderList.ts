import { generateLogoUrl, flattenChildNodes, generateUniqueId } from 'utils';
import * as defaultImage from 'images/default-news.png';

/**
 * Renders item's list and replaces the gotten by id list with it
 * @param list
 * @param item
 * @param data
 */
export const renderList = (list, item: HTMLElement, data): void => {
  try {
    const documentFragmentList = document.createDocumentFragment();

    data.forEach((element) => {
      const newItem = item.cloneNode(true) as HTMLElement;
      const children = flattenChildNodes(newItem as HTMLElement);

      // TODO: need to create a separate service(s)
      children.forEach((item: HTMLElement & HTMLImageElement & HTMLAnchorElement) => {
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
            item.src = element.urlToImage ? element.urlToImage : defaultImage;
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
          default: return;
        }

        // add id postfix only for items with id
        item.id = item.id && `${item.id}_${element.id || generateUniqueId()}`;
      });

      newItem.id = `${item.id}_${element.id || generateUniqueId()}`;
      documentFragmentList.appendChild(newItem);
    });

    // remove previous added items
    while (item !== list.lastChild) {
      list.removeChild(list.lastChild);
    }

    // append document fragment to list
    list.appendChild(documentFragmentList);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    // TODO: decide how to show on UI
  }
};
