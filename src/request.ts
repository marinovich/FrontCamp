import { API_KEY, API_VERSION, BASE_URL } from './constants';

/**
 * Returns NewsAPI response
 * @param {string} endpoint -
 * @param {string} [parameters] -
 */
export const request = async (endpoint, parameters = '') => {
  // const parametersAsString = parameters.join('')
  const response = await fetch(
    `${BASE_URL}/${API_VERSION}/${endpoint}?${parameters && `${parameters}&`}apiKey=${API_KEY}`,
  );
  const { status, message, ...result } = await response.json();

  // replace with constant
  if (status === 'error') {
    // tslint:disable-next-line:no-console
    console.error(message);

    throw new Error(message);
  }

  return result;
};
