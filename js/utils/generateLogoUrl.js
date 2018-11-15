/**
 * Returns URL for logo icon
 * @param {string} url - url to image
 * @param {number} size 
 * @returns {string}
 */
export const generateLogoUrl = (url, size = 70) => 
  `https://icon-locator.herokuapp.com/icon?url=${url}&size=${size}`;
