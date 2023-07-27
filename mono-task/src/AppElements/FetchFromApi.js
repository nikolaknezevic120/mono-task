import axios from 'axios';

export async function fetchProducts() {
  try {

    const response1 = axios.get('/api/resources/accessories');
    const response2 = axios.get('/api/resources/tshirt');

    const [productsFromLink1, productsFromLink2] = await Promise.all([response1, response2]);

    const productsWithCategory1 = productsFromLink1.data.item.map((product) => ({
      ...product,
      category: 'accessories',
    }));

    const productsWithCategory2 = productsFromLink2.data.item.map((product) => ({
      ...product,
      category: 'tshirt',
    }));

    const combinedProducts = [...productsWithCategory1, ...productsWithCategory2];

    return combinedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}