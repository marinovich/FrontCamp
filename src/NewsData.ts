export class NewsData {
  private sourcesMap: Map<string, any>; // tslint:disable-line:no-any
  public topRatedNews: Map<string, Object>;
  private currentSelectedSource: HTMLElement;
  private currentHeadlinesItem: HTMLElement;
  public toggleItemSelection: Function;
  public getItemElement: Function;
  public getTopRatedNewsListAsync: Function;

  constructor(
    toggleElement,
    getItemElement,
    getTopRatedNewsListAsync,
  ) {
    this.sourcesMap = new Map<string, Object>();
    this.topRatedNews = new Map<string, Object>();

    this.currentSelectedSource = null;
    this.currentHeadlinesItem = null;

    // toggle element selection
    this.toggleItemSelection = toggleElement;
    // checks whether selected source item is 'li' element, otherwise finds it
    this.getItemElement = getItemElement;
    // TODO: add comment
    this.getTopRatedNewsListAsync = getTopRatedNewsListAsync;
  }

  set sources(sources) {
    sources.forEach(sourceItem => this.sourcesMap.set(sourceItem.id, sourceItem));
  }

  get sources() {
    return this.sourcesMap;
  }

  setTopRatedNews(news) {
    return this.topRatedNews.set(news[0].source.id, news);
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Map<string,{}>>}
   */
  async getTopRatedNewsById(id) {
    if (this.topRatedNews.has(id)) {
      return this.topRatedNews.get(id);
    }

    const topRatedNews = await this.getTopRatedNewsListAsync(id);

    return this.setTopRatedNews(topRatedNews).get(id);
  }

  /**
   * Toggles element selection and set current source item
   * @param {EventTarget} eventTarget
   */
  toggleSourceItem(eventTarget) {
    const targetElement = this.getItemElement(eventTarget);

    targetElement && this.toggleItemSelection(targetElement);
    this.currentSelectedSource && this.toggleItemSelection(this.currentSelectedSource);
    this.currentSelectedSource = targetElement;
  }

  toggleHeadlinesItem(eventTarget) {
    const targetElement = this.getItemElement(eventTarget);

    targetElement && this.toggleItemSelection(targetElement);
    this.currentHeadlinesItem && this.toggleItemSelection(this.currentSelectedSource);
    this.currentHeadlinesItem = targetElement;
  }
}
