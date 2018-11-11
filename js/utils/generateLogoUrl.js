/**
 * Returns URL for logo icon
 * @param {string} url 
 * @param {number} size 
 */
export const generateLogoUrl = (url, size = 70) => `https://icon-locator.herokuapp.com/icon?url=${url}&size=${size}`;
