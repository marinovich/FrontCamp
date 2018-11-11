import { API_KEY, API_VERSION, BASE_URL } from './constants.js';

// const parametersMap = new Map();

/**
 * Returns NewsAPI response
 * @param {string} endpoint - 
 * @param {string} [parameters] - 
 */
export const request = async (endpoint, parameters = '') => {
  // const parametersAsString = parameters.join('')
  const response = await fetch(
    `${BASE_URL}/${API_VERSION}/${endpoint}?${parameters && '&'}apiKey=${API_KEY}`
  )
  const { status, message, ...result } = await response.json();

  // replace with constant
  if (status === 'error') {
    console.error(message);

    throw new Error(message);
  }

  return result;
}