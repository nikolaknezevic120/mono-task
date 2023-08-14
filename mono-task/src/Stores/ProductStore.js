import { observable, action, computed, makeObservable } from "mobx";
import { db } from "../Common/firebase";
import { ref, get, push, update } from "firebase/database";

class ProductStore {
  products = [];
  editProductId = "";
  editNewPrice = "";
  editNewName = "";
  editNewDescription = "";
  editNewAvailable = "";
  editNewImg = "";
  editError = "";
  sortByPriceAsc = false;
  categories = ["kape", "majice", "ostalo"]; 
  selectedCategory = "";

  newProduct = {
    name: "",
    description: "",
    price: "",
    img: "",
    available: "",
    category: "",
  };

  constructor() {
    makeObservable(this, {
      products: observable,
      editProductId: observable,
      editNewPrice: observable,
      editNewName: observable,
      editNewDescription: observable,
      editNewAvailable: observable,
      editNewImg: observable,
      editError: observable,
      sortByPriceAsc: observable,
      newProduct: observable,
      fetchProducts: action,
      handleAddProduct: action,
      updateProduct: action,
      setEditProductId: action,
      setEditNewPrice: action,
      setEditNewName: action,
      setEditNewDescription: action,
      setEditNewAvailable: action,
      setEditNewImg: action,
      setEditError: action,
      toggleSortByPriceAsc: action,
      categories: observable,
      selectedCategory: observable,
      setSelectedCategory: action,
      filteredProducts: computed,
    });

    this.fetchProducts();
  }

  async fetchProducts() {
    const productsRef = ref(db, "products");

    try {
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        this.products = Object.entries(productsData).map(([id, product]) => ({
          id,
          ...product,
        }));
      } else {
        this.products = [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async handleAddProduct(newProduct) {
    const productsRef = ref(db, "products");

    try {
      await push(productsRef, newProduct);
      console.log("Product added successfully.");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  async updateProduct(productId, updates) {
    const productRef = ref(db, `products/${productId}`);

    try {
      await update(productRef, updates);
      console.log("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  setEditProductId(id) {
    this.editProductId = id;
  }

  setEditNewPrice(price) {
    this.editNewPrice = price;
  }

  setEditNewName(name) {
    this.editNewName = name;
  }

  setEditNewDescription(description) {
    this.editNewDescription = description;
  }

  setEditNewAvailable(available) {
    this.editNewAvailable = available;
  }

  setEditNewImg(img){
    this.editNewImg = img;
  }

  setEditError(error) {
    this.editError = error;
  }

  toggleSortByPriceAsc() {
    this.sortByPriceAsc = !this.sortByPriceAsc;
    const sortedProducts = [...this.products].sort((a, b) => {
      if (this.sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    this.products = sortedProducts;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    if (!this.selectedCategory) {
      return this.products;
    }

    return this.products.filter((product) => product.category === this.selectedCategory);
  }
}

const productStore = new ProductStore();

export const useProductStore = () => productStore;
export default productStore;
