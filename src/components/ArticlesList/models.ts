import * as ApiModels from 'models';

export interface IArticlesListProps {
  articlesMap: ApiModels.Dictionary<ApiModels.IArticle[]>;
  selectedSourceId: string;
}
