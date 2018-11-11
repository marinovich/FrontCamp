import { NewsData } from './NewsData.js';
import { renderSourceList, getSources } from './services/index.js'
import { getSourceItemElement } from './utils/index.js';

export const init = () => {
  const sourceList = document.getElementById('sources-list');
  const sourceItem = document.getElementById('sources-item');
  const topRatedSection = document.getElementById('top-rated');
  const topRatedList = document.getElementById('top-rated-list');

  const showTopRatedBlock = () => topRatedSection.classList.remove('hidden');
  const toggleItem = element => element.classList.toggle('selected');

  const newsData = new NewsData(toggleItem, getSourceItemElement);

  // first get the source data
  getSources().then(sources => {
    newsData.sources = sources;
    renderSourceList(sourceList, sourceItem, newsData.sources);
  });

  sourceList.addEventListener('click', (event) => {
    newsData.toggleSourceItem(event.target);
    showTopRatedBlock();
  });

  topRatedList.addEventListener('click', (event) => {
    newsData.toggleSourceItem(event.target);
  });
}
