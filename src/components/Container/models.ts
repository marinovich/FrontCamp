import { ActionType } from 'constants/index';
import * as ApiModels from 'models';

export namespace Actions {
  export type showMainBlock = (payload: boolean) => void;
  export type setSourcesList = (payload: ApiModels.ISource[]) => void;
  export type selectSourceItem = (payload: string) => void;
  export type addArticles = (id: string, articlesList: ApiModels.IArticle[]) => void;
  export type showError = (message: string) => void;
}

export interface Action<T = any> { // tslint:disable-line:no-any
  type: ActionType;
  payload: T;
}
