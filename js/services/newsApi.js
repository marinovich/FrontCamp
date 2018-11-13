import { request } from '../request.js';

/**
 *
 */
export const getSources = async () => {
  const { sources } = await request('sources');

  return sources;
};

/**
 *
 * @param {string} sources
 */
export const getTopHeadlines = async (sourceId) => {
  const { articles } = await request('top-headlines', `sources=${sourceId}`);

  return articles;
};
