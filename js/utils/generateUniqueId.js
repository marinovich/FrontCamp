/**
 * Generates random 11 characters id
 */
export const generateUniqueId = () => Math.random().toString(36).substr(2, 16);
