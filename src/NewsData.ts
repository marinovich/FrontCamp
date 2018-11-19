import * as _ from 'lodash';

import * as Models from 'models';

export class NewsData {
  public getItemElement: Function;
  public getTopArticlesListAsync: Function;
  public toggleItemSelection: Function;
  private currentSelectedSource: HTMLElement;
  private sourcesMap: Map<string, Models.ISource>;
  private topArticles: Map<string, Models.IArticle[]>;

  constructor(
    toggleElement,
    getItemElement,
    getTopArticlesListAsync,
  ) {
    this.sourcesMap = new Map<string, Models.ISource>();
    this.topArticles = new Map<string, Models.IArticle[]>();

    this.currentSelectedSource = null;
    // toggle element selection
    this.toggleItemSelection = toggleElement;
    // checks whether selected source item is 'li' element, otherwise finds it
    this.getItemElement = getItemElement;
    // TODO: add comment
    this.getTopArticlesListAsync = getTopArticlesListAsync;
  }

  public setSources = (sources: Models.ISource[]): void => {
    sources.forEach(sourceItem => this.sourcesMap.set(sourceItem.id, sourceItem));
  }

  public getSources = (): Map<string, Models.ISource> => _.cloneDeep(this.sourcesMap);

  public getTopRatedNewsById = async (id: string): Promise<Models.IArticle[]> => {
    if (this.topArticles.has(id)) {
      return this.topArticles.get(id);
    }

    const topArticles = await this.getTopArticlesListAsync(id);

    return this.setTopArticles(topArticles).get(id);
  }

  public toggleSourceItem(eventTarget: HTMLElement): void {
    const targetElement = this.getItemElement(eventTarget);

    targetElement && this.toggleItemSelection(targetElement);
    this.currentSelectedSource && this.toggleItemSelection(this.currentSelectedSource);
    this.currentSelectedSource = targetElement;
  }

  private setTopArticles = (news: Models.IArticle[]) => this.topArticles.set(news[0].source.id, news);
}
