export class Store {
  private reducer;
  private listeners;
  private state;
  private prevState;

  private static storeInstance = new Store;

  private constructor() {
    this.listeners = [];
  }

  // TODO: add errors handlers
  public static createStore = (reducer) => {
    Store.storeInstance.reducer = reducer;

    return Store;
  }

  public static subscribe = (listener) => {
    Store.storeInstance.listeners.push(listener);
  }

  // get current store state
  public static getState = () => Store.storeInstance.state;

  // get previous (before dispatching) store state
  public static getPrevState = () => Store.storeInstance.prevState;

  public static dispatch = (action) => {
    const { reducer, state, listeners } = Store.storeInstance;

    Store.storeInstance.prevState = { ...state };
    Store.storeInstance.state = reducer(state, action);
    listeners.forEach(listener => listener());
  }
}
