import { NewsData } from 'NewsData';
import { renderList, getSourcesAsync, getArticlesAsync, renderDiffSection } from 'services';
import { getItemElement, getElementId } from 'utils';

export const init = async (): Promise<void> => {
  const sourceList = document.getElementById('sources-list');
  const sourceItem = document.getElementById('sources-item');
  const topRatedSection = document.getElementById('top-rated');
  const topRatedList = document.getElementById('top-rated-list');
  const topRatedItem = document.getElementById('top-rated-item');

  const showTopRatedArticlesBlock = (): void => topRatedSection.classList.remove('hidden');
  const toggleItem = (element: HTMLElement): boolean => element.classList.toggle('selected');

  const newsData = new NewsData(
    toggleItem,
    getItemElement,
    getArticlesAsync,
  );

  // first getting the source data
  const sources = await getSourcesAsync();
  newsData.setSources(sources);
  renderList(sourceList, sourceItem, newsData.getSources());

  sourceList.addEventListener('click', showTopRatedArticlesBlock, { once: true });
  sourceList.addEventListener('click', async (event) => {
    const item = event.target as HTMLElement;
    newsData.toggleSourceItem(item);

    const articles = await newsData.getTopRatedNewsById(getElementId(item.id));
    renderList(topRatedList, topRatedItem, articles);
  });

  // render JSON diff section for webpack task
  renderDiffSection();
};
