import { Store } from 'lib/Store';
import { reducer } from 'components/Container/reducer';
import * as Models from 'models';

export const store = Store.createStore(reducer);

export const initialState: Models.IState = {
  articlesListVisibility: false,
  showButtonVisibility: true,
  mainBlockVisibility: false,
  sourcesList: [],
  articlesMap: {},
  selectedSourceId: '',
  errorMessage: '',
};
