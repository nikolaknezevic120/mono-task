import React from "react";
import { observer } from "mobx-react";
import { useCartStore } from "../Stores/CartStore";
import { useProductStore } from "../Stores/ProductStore"; 

const ShoppingCart = observer(() => {
  const cartStore = useCartStore();

  return (
    <div>
      <h2>Shopping Cart:</h2>
      <ul>
        {Object.keys(cartStore.cart).map((productId) => (
          <li key={productId}>
            {cartStore.cart[productId].product.name} - Quantity: {cartStore.cart[productId].quantity}
          </li>
        ))}
      </ul>
      
    </div>
  );
});

export default ShoppingCart;
