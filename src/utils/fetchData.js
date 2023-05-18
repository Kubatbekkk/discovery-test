export const getProductsData = async () => {
  let response = await fetch('/products/data.json');
  if (response.ok) {
    return await response.json();
  }
  throw new Error('HTTP error ' + response.status);
};

export const getProductsGroups = async () => {
  let response = await fetch('/products/names.json');
  if (response.ok) return await response.json();
  throw new Error('HTTP error ' + response.status);
};
