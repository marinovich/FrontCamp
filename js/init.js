import { NewsData } from './data.js';
import { getSources } from './services/newsApi.js';
import { renderList } from './services/render.js'

export const init = () => {
  const newsData = new NewsData();

  // first get the source data
  getSources().then(sources => {
    newsData.sources = sources;
    renderList('sources-list', 'sources-item', newsData.sources);
  });

}

// const topRatedList = document.getElementById('top-rated-list');
// const article = document.getElementById('article');

document.getElementById('sources-list').addEventListener('click', (event) => {
  // debugger;
  event.target
})
