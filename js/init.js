import { NewsData } from './data.js';
import { renderList, getSources } from './services/index.js'

export const init = () => {
  const toggleItem = element => element.classList.toggle('selected');

  const newsData = new NewsData(toggleItem);
  const sourceList = document.getElementById('sources-list');
  const sourceItem = document.getElementById('sources-item');

  // first get the source data
  getSources().then(sources => {
    newsData.sources = sources;
    renderList(sourceList, sourceItem, newsData.sources);
  });

  sourceList.addEventListener('click', (event) => {
    event.target.classList.add('selected');
  });
}
