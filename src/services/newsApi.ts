import * as Models from 'models';
import { request } from './request';

export const getSourcesAsync = async (): Promise<Models.ISource[]> => {
  const { sources } = await request('sources');

  return sources;
};

/**
 *
 * @param {string} sources
 */
export const getArticlesAsync = async (sourceId: string): Promise<Models.IArticle[]> => {
  const { articles } = await request('top-headlines', `sources=${sourceId}`);

  return articles;
};
