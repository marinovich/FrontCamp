interface IResponse {
  status: string;
  // if returns 'error'
  code?: string;
  message?: string;
}

export interface ISourcesResponse extends IResponse {
  sources?: ISource[];
}

export interface ITopHeadlinesResponse extends IResponse {
  articles?: IArticle[];
  totalResults?: number;
}

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface IArticle {
  source: ITopHeadlineSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

type ITopHeadlineSource = {
  id: string;
  name: string;
};

export type GetItemElementFunction = (element: HTMLElement) => HTMLElement;

export interface INewsData {

}
