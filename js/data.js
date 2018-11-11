export class NewsData {
  constructor() {
    this.sourcesMap = new Map();
    this.topRatedBySourceId = new Map();
    this.articlesById = new Map();
  }

  /**
   * @param {Object[]} sources
   */
  set sources(sources) {
    sources.forEach(sourceItem => this.sourcesMap.set(sourceItem.id, sourceItem));
  }

  get sources() {
    return this.sourcesMap;
  }

  getSourceItem(sourceId) {
    return this.sourcesMap.get(sourceId);
  }

  setTopRated(topRatedList) {
    const { source: { id } } = topRatedList[0];

    this.topRatedBySourceId[id] = topRatedList;
  }

  getTopRated(sourceId) {return this.topRatedBySourceId[sourceId]}; 
}
