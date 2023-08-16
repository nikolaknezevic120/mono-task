import React, { useState } from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";
import { useCartStore } from "../Stores/CartStore";
import '../Style/Shop/shop.css'

const ProductList = observer(() => {
  const productStore = useProductStore();
  const cartStore = useCartStore();

  const [isAvailable, setIsAvailable] = useState(true);
  
  const handleAddToCart = (productId) => {
    const product = productStore.products.find((p) => p.id === productId);
    if (product) {
      cartStore.addToCart(productId, product);
      if (product.available <= cartStore.cart[productId].quantity) {
        cartStore.cart[productId].quantity = product.available;
        setIsAvailable(false);
      }
    }
  };

  return (
    <div>
      <ul>
        {productStore.filteredProducts.map((product) => (
          <li key={product.id}>
            <strong>Name:</strong> {product.name}<br />
            <strong>Description:</strong> {product.description}<br />
            <strong>Price:</strong> {product.price} €<br />
            <strong>Available:</strong> {isAvailable ? product.available : "Dodali ste u košaricu sve raspoložive artikle!"}<br />
            <strong>Category:</strong> {product.category}<br />
            <img id="shopImgId" src={product.img} alt={product.name} />
            <button onClick={() => handleAddToCart(product.id)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProductList;
