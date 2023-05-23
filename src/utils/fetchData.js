
export const getProductsData = async (endPoint) => {
  let response = await fetch(`/products/${endPoint}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('HTTP error ' + response.status);
};

