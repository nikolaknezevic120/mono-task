import React, { useState } from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";
import '../Style/AdminProductList/adminProductList.css';

const AdminProductList = observer(() => {
  const productStore = useProductStore();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  return (
    <div>
      <h2>Lista proizvoda:</h2>
      <ul className="adminProductListDiv">
        {productStore.filteredProducts.map((product) => (
          <li key={product.id}>
            <img id="adminListImg" src={product.img} />
            <button id="adminBtn" onClick={() => handleProductClick(product.id)}>
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
                {/* <img src={product.img} alt={product.name} /> */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AdminProductList;
