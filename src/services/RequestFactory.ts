import * as Models from 'models';
import { request } from './request';

export function RequestFactory( // tslint:disable-line:function-name
  apiKey: string,
  apiVersion: string,
  baseURL: string,
): Models.IRequestFactoryResult {
  const requestResult = {} as Models.IRequestFactoryResult;

  const generateRequestObject = (endpoint: string, params: Models.Dictionary): Models.IRequestObject => ({
    url: `${baseURL}/${apiVersion}/${endpoint}`,
    params: {
      apiKey,
      ...params,
    },
  });

  requestResult.sources = async (params?: Models.Dictionary): Promise<Models.ISource[]> => {
    const requestObject = generateRequestObject('sources', params);
    const { sources } = await request(requestObject);

    return sources;
  };

  requestResult.topHeadlines = async (params?: Models.Dictionary): Promise<Models.IArticle[]> => {
    const requestObject = generateRequestObject('top-headlines', params);
    const { articles } = await request(requestObject);

    return articles;
  };

  return requestResult;
}
