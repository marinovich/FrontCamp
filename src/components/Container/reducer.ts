import { ActionType } from 'constants/index';
import { initialState } from 'store';
import { Action } from './models';

export const reducer = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case ActionType.SHOW_MAIN:
      return { ...state, ...{ mainBlockVisibility: payload, showButtonVisibility: !payload } };
    case ActionType.SET_SOURCES_LIST:
      return { ...state, ...{ sourcesList: payload } };
    case ActionType.SELECT_SOURCE_ITEM:
      return { ...state, ...{ selectedSourceId: payload } };
    case ActionType.ADD_ARTICLES:
      const newArticlesMap = { ...state.articlesMap, [payload.id]: payload.articlesList };

      return { ...state, ...{ articlesMap: newArticlesMap } };
    case ActionType.SHOW_ERROR:
      return { ...state, ...{ errorMessage: payload } };
    default:
      return state;
  }
};
