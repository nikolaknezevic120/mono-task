import { makeObservable, observable, action, computed } from 'mobx';
import { fetchProducts } from './FetchFromApi';

class ProductStore {
  products = [];
  loading = false;
  cart = [];
  searchQuery = '';
  sortOptions = ['asc', 'desc']; 
  selectedSortOption = 'asc'; 
  selectedCategory = ''; 

  constructor() {
    makeObservable(this, {
      products: observable,
      loading: observable,
      cart: observable,
      searchQuery: observable,
      sortOptions: observable, 
      selectedSortOption: observable, 
      selectedCategory: observable,
      addToCart: action,
      removeFromCart: action,
      clearCart: action,
      setSearchQuery: action,
      setSelectedCategory: action,
      totalAmount: computed,
      filteredProducts: computed,
      cartItemCount: computed
    });
  }

  addToCart(product) {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  clearCart() {
    this.cart = [];
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  async fetchProductsFromApi() {
    this.loading = true;
    try {
      this.products = await fetchProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.loading = false;
    }
  }

  get totalAmount() {
    return Number(this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
  }

  get cartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get filteredProducts() {
    const filteredByCategory = this.selectedCategory
      ? this.products.filter((product) => product.category === this.selectedCategory)
      : this.products;

    const sorted = filteredByCategory.slice().sort((a, b) => {
      if (this.selectedSortOption === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sorted.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

const productStore = new ProductStore();
export default productStore;