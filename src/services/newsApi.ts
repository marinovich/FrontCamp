import { request } from '../request';

export const getSourcesAsync = async () => {
  const { sources } = await request('sources');

  return sources;
};

/**
 *
 * @param {string} sources
 */
export const getTopHeadlinesAsync = async (sourceId) => {
  const { articles } = await request('top-headlines', `sources=${sourceId}`);

  return articles;
};
