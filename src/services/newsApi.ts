import { API_KEY, API_VERSION, BASE_URL } from 'constants/index';
import * as Models from 'models';
import { RequestFactory } from './RequestFactory';
import { traceNewsApiToLog } from './traceNewsApiToLog';

const newsAPI = RequestFactory(API_KEY, API_VERSION, BASE_URL);
// create proxy object to log all requests and responses
const proxiedNewsAPI = traceNewsApiToLog(newsAPI);

export const getSourcesAsync = async (): Promise<Models.ISource[]> => {
  const sources = await proxiedNewsAPI.sources();

  return sources;
};

export const getArticlesAsync = async (sourceId: string): Promise<Models.IArticle[]> => {
  const articles = await proxiedNewsAPI.topHeadlines({ sources: sourceId });

  return articles;
};
