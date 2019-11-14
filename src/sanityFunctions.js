// eslint-disable-next-line import/prefer-default-export
export const getData = async query => {
  const tempArray = [];
  const response = await fetch(
    `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`
      }
    }
  );
  const json = await response.json();
  const result = await json.result;
  result.forEach(contributor => {
    tempArray.push(contributor);
  });
  return tempArray;
};
