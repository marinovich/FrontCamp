import { CustomErrorType } from 'constants/index';

export const errorHandler = (error) => {
  // tslint:disable:no-console
  switch (error.type) {
    case CustomErrorType.NEWS_API_ERROR:
      console.error(error.message);
      throw new Error(error.message);
    default:
      console.error(error);
      throw new Error('Error occurs during request to NewsAPI.');
  }
};
