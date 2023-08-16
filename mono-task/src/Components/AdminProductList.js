import React, { useState } from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";

const AdminProductList = observer(() => {
  const productStore = useProductStore();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  return (
    <div>
      <h2>Products:</h2>
      <ul>
        {productStore.filteredProducts.map((product) => (
          <li key={product.id}>
            <button onClick={() => handleProductClick(product.id)}>
              {product.name}
            </button>
            {selectedProductId === product.id && (
              <div>
                <strong>Id:</strong> {product.id} <br />
                <strong>Description:</strong> {product.description} <br />
                <strong>Price:</strong> {product.price} € <br />
                <strong>Available:</strong> {product.available} <br />
                <strong>Category:</strong> {product.category} <br />
                <strong>Img url:</strong> {product.img} <br />
                <img src={product.img} alt={product.name} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AdminProductList;
