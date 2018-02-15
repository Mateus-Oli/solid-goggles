export const fill = (sparse = []) => (data = []) => {
  sparse = [].concat(sparse);
  data = data.filter(d => d !== undefined);

  for (let index = 0; index < sparse.length; index++) if (sparse[index] === undefined)  {
    sparse[index] = data.shift();
  }
  return sparse.concat(data);
};
