export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // if (categoryId) {
  //   const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}=${query}`);
  //   const data = await response.json();
  //   return data;
  // }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

// export async function getProductsFromCategoryAndQuery2(query) {
//   const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
//   const data = await response.json();
//   return data;
// }

export async function getProductById(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await response.json();
  return data;
}
