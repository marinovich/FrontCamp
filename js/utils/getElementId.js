/**
 * Gets id from HTMLElement id. E.g. return 'key' from 'element-id_key'
 * @param {string} id 
 * @returns {string}
 */
export function getElementId(id) {
  return id.split('_')[1];
}
