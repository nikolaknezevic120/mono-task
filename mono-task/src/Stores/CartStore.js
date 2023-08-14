import { observable, action, makeObservable } from "mobx";
import { ref, push } from "firebase/database";
import { db } from "../Common/firebase";
import productStore from './ProductStore';

class CartStore {
  cart = {};
  productStore; // Referenca na ProductStore

  // Dodajte ova polja za korisničke informacije
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
      userInfo: observable, // Dodajte userInfo kao observable
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

    // Iterirajte kroz trenutnu košaricu i ažurirajte količinu u bazi podataka
    for (const productId in this.cart) {
      const quantity = this.cart[productId].quantity;
      updatedCart.products[productId] = { quantity };

      // Također ažurirajte stanje available u productStore
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
      this.cart = {}; // Očistite košaricu nakon ažuriranja u bazi podataka
    } catch (error) {
      console.error("Error updating cart in the database:", error);
    }
  }

  // Akcije za postavljanje korisničkih informacija
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
