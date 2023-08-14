import { observable, action, makeObservable } from "mobx";
import { ref, push } from "firebase/database";
import { db } from "../Common/firebase";
import productStore from './ProductStore';

class CartStore {
  cart = {};
  productStore; 

  userInfo = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    address: ""
  };

  constructor(productStore) {
    this.productStore = productStore;

    makeObservable(this, {
      cart: observable,
      userInfo: observable, 
      addToCart: action,
      handleOrder: action,
      setFirstName: action,
      setLastName: action,
      setEmail: action,
      setCity: action,
      setAddress: action
    });
  }

  addToCart(productId, product) {
    if (this.cart[productId]) {
      this.cart[productId].quantity += 1;
    } else {
      this.cart[productId] = {
        product: product,
        quantity: 1,
      };
    }
  }

  async handleOrder() {
    const updatedCart = {
      userInfo: { ...this.userInfo },
      products: {}
    };

    for (const productId in this.cart) {
      const quantity = this.cart[productId].quantity;
      updatedCart.products[productId] = { quantity };

      const product = this.productStore.products.find((p) => p.id === productId);
      if (product) {
        const newAvailable = product.available - quantity;
        this.productStore.updateProduct(productId, { available: newAvailable });
      }
    }

    const cartRef = ref(db, "orders");

    try {
      await push(cartRef, updatedCart);
      console.log("Order handled and cart updated in the database.");
      this.cart = {}; 
    } catch (error) {
      console.error("Error updating cart in the database:", error);
    }
  }

  setFirstName(firstName) {
    this.userInfo.firstName = firstName;
  }

  setLastName(lastName) {
    this.userInfo.lastName = lastName;
  }

  setEmail(email) {
    this.userInfo.email = email;
  }

  setCity(city) {
    this.userInfo.city = city;
  }

  setAddress(address) {
    this.userInfo.address = address;
  }
}

const cartStore = new CartStore(productStore);

export const useCartStore = () => cartStore;

export default cartStore;
