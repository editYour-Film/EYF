export const getUrlParam = (param: string) => {
  const query = new URLSearchParams(decodeURI(location.search));
  return query.get(param);
};
