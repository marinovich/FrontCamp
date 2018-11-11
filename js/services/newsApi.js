import { request } from '../request.js';

/**
 * 
 */
export const getSources = async () => {
  const { sources } = await request('sources');

  return sources;
}

/**
 * 
 * @param {} sources 
 */
export const getTopHeadlines = async (sources) => {

}
