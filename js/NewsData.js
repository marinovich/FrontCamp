export class NewsData {
  /**
   * 
   * @param {Function} toggleSourceItem 
   * @param {Function} checkSourceItemElement 
   */
  constructor(toggleSourceItem, checkSourceItemElement) {
    this.sourcesMap = new Map();
    this.topRatedBySourceId = new Map();
    this.articlesById = new Map();
    this.currentHeadline = null;
    this.currentSelectedSource = null;
    // toggle element selection
    this.toggleSourceItemSelection = toggleSourceItem;
    // checks whether selected source item is 'li' element, otherwise finds it
    this.checkSourceItemElement = checkSourceItemElement;
  }

  /**
   * @param {{}[]} sources
   */
  set sources(sources) {
    sources.forEach(sourceItem => this.sourcesMap.set(sourceItem.id, sourceItem));
  }

  get sources() {
    return this.sourcesMap;
  }

  /**
   * Toggles element selection and set current source item
   * @param {EventTarget} eventTarget 
   */
  toggleSourceItem(eventTarget) {
    const targetElement = this.checkSourceItemElement(eventTarget);

    targetElement && this.toggleSourceItemSelection(targetElement);
    this.currentSelectedSource && this.toggleSourceItemSelection(this.currentSelectedSource);
    this.currentSelectedSource = targetElement;
  }
}
