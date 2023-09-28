import React from "react";
import { observer } from "mobx-react";
import { calculateTotalPrice } from "../Common/calculateTotalPrice";
import { useCartStore } from "../Stores/CartStore";

const ShoppingCart = observer(() => {
  const cartStore = useCartStore();
  const totalAmount = calculateTotalPrice(cartStore.cart);  

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
          Ukupna cijea: {totalAmount} €
        </li>
      </ul>
    </div>
  );
});

export default ShoppingCart;
