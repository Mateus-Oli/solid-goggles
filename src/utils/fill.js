export const fill = (sparse = []) => (data = []) => {
  sparse = [].concat(sparse);
  data = [].concat(data);

  for (const index in sparse) if (sparse[index] === undefined) {
    sparse[index] = data.shift();
  }
  return sparse.concat(data);
};
