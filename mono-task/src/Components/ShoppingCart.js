import React from "react";
import { observer } from "mobx-react";
import { useCartStore } from "../Stores/CartStore";

const ShoppingCart = observer(() => {
  const cartStore = useCartStore();

  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(cartStore.cart).forEach((productId) => {
      const item = cartStore.cart[productId];
      total += item.quantity * item.product.price;
    });
    return total;
  };

  return (
    <div>
      <h2>Košarica:</h2>
      <ul>
        {Object.keys(cartStore.cart).map((productId) => (
          <li key={productId}>
            {cartStore.cart[productId].product.name} - Quantity: {cartStore.cart[productId].quantity} <br />
            Cijena {cartStore.cart[productId].quantity} * {cartStore.cart[productId].product.price} €
          </li>
        ))}
        <li>
          Ukupna cijea: {calculateTotalPrice()} €
        </li>
      </ul>
    </div>
  );
});

export default ShoppingCart;
