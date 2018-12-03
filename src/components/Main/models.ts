import { Actions } from 'components/Container/models';
import * as ApiModels from 'models';

export interface IMainProps {
  mainBlockVisibility: boolean;
  selectedSourceId: string;
  sourcesList: ApiModels.ISource[];
  articlesMap: ApiModels.Dictionary<ApiModels.IArticle[]>;
  addArticles: Actions.addArticles;
  selectSourceItem: Actions.selectSourceItem;
  showError: Actions.showError;
}
