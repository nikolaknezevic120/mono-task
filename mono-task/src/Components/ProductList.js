import React, { useState } from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";
import { useCartStore } from "../Stores/CartStore";
import '../Style/Shop/shop.css'

const ProductList = observer(() => {
  const productStore = useProductStore();
  const cartStore = useCartStore();

  const [isAvailable, setIsAvailable] = useState({}); 

  const handleAddToCart = (productId) => {
    const product = productStore.products.find((p) => p.id === productId);
    if (product) {
      cartStore.addToCart(productId, product);
      if (product.available <= cartStore.cart[productId].quantity) {
        const updatedIsAvailable = { ...isAvailable };
        updatedIsAvailable[productId] = false;
        setIsAvailable(updatedIsAvailable);
        cartStore.cart[productId].quantity = product.available;
      }
    }
  };

  return (
    <div className="productListDiv">
      <ul className="productList">
        {productStore.filteredProducts.map((product) => (
          <li id="productListItem" key={product.id}>
            <div className="shopImgDiv">
              <img id="shopImgId" src={product.img} alt={product.name} />
            </div>
            <strong>Name:</strong> {product.name}<br />
            <strong>Description:</strong> {product.description}<br />
            <strong>Price:</strong> {product.price} €<br />
            <strong>Available:</strong>{" "}
            {isAvailable[product.id] !== false
              ? product.available
              : "Dodali ste u košaricu sve raspoložive artikle!"}
            <br />
            <strong>Category:</strong> {product.category}<br />
            <button
              id="addToCartBtnId"
              onClick={() => handleAddToCart(product.id)}
            >
              Dodaj u košaricu
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProductList;
