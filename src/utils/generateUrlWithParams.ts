export const generateUrlWithParams = (url: string, params: {}): string => {
  const newURL = new URL(url);

  Object.keys(params).forEach((key) => {
    const value = params[key];

    newURL.searchParams.append(key, value);
  });

  return newURL.href;
};
