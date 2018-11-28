/**
 * Returns URL for logo icon
 * @param url
 * @param size
 */
export const generateLogoUrl = (url: string, size = 70): string =>
  `https://icon-locator.herokuapp.com/icon?url=${url}&size=${size}`;
