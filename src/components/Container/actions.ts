import { ActionType } from 'constants/index';
import { store } from 'store';
import { Actions } from './models';

export const showMainBlock: Actions.showMainBlock = payload => store.dispatch({
  type: ActionType.SHOW_MAIN,
  payload,
});

export const setSourcesList: Actions.setSourcesList = payload => store.dispatch({
  type: ActionType.SET_SOURCES_LIST,
  payload,
});

export const selectSourceItem: Actions.selectSourceItem = payload => store.dispatch({
  type: ActionType.SELECT_SOURCE_ITEM,
  payload,
});

export const addArticles: Actions.addArticles = (id, articlesList) => store.dispatch({
  type: ActionType.ADD_ARTICLES,
  payload: { id, articlesList },
});

export const showError: Actions.showError = message => store.dispatch({
  type: ActionType.SHOW_ERROR,
  payload: message,
});
