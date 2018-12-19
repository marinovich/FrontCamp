import { API_KEY, API_VERSION, BASE_URL } from 'constants/index';

/**
 * Returns NewsAPI response
 * @param endpoint
 * @param parameters
 */
export const request = async (endpoint: string, parameters = '') => {
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