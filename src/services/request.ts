import { CustomErrorType, ResponseStatus } from 'constants/index';
import * as Models from 'models';
import { generateUrlWithParams } from 'utils';
import { CustomError } from './CustomError';

/**
 * Returns NewsAPI response
 * @param url
 * @param params
 * @param requestInit
 */
export const request = async (requestObject: Models.IRequestObject, requestInit?: RequestInit) => {
  try {
    const { url, params } = requestObject;
    const generatedURL = generateUrlWithParams(url, params);

    const response = await fetch(generatedURL, requestInit);
    const { status, message, ...result } = await response.json();

    // replace with constant
    if (status === ResponseStatus.ERROR) {
      throw new CustomError(CustomErrorType.NEWS_API_ERROR, message);
    }

    return result;
  } catch (error) {
    // tslint:disable-next-line:space-in-parens
    const { errorHandler } = await import(/* webpackChunkName: 'errorHandler' */'services/errorHandler');

    errorHandler(error);
  }
};
