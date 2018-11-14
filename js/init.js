import { NewsData } from './NewsData.js';
import { renderList, getSourcesAsync, getTopHeadlinesAsync } from './services/index.js'
import { getItemElement, getElementId } from './utils/index.js';

export const init = () => {
  const sourceList = document.getElementById('sources-list');
  const sourceItem = document.getElementById('sources-item');
  const topRatedSection = document.getElementById('top-rated');
  const topRatedList = document.getElementById('top-rated-list');
  const topRatedItem = document.getElementById('top-rated-item');

  const showTopRatedArticlesBlock = () => topRatedSection.classList.remove('hidden');
  const toggleItem = element => element.classList.toggle('selected');

  const newsData = new NewsData(
    toggleItem, 
    getItemElement,
    getTopHeadlinesAsync,
  );

  // first get the source data
  getSourcesAsync().then((sources) => {
    newsData.sources = sources;
    renderList(sourceList, sourceItem, newsData.sources);
  });

  sourceList.addEventListener('click', showTopRatedArticlesBlock, { once: true });

  // add event listener to top rated articles item.
  sourceList.addEventListener('click', ({ target: item }) => {
    newsData.toggleSourceItem(item);

    newsData.getTopRatedNewsById(getElementId(item.id))
      .then(articles => renderList(topRatedList, topRatedItem, articles));
  });
};
