import React from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";

const EditProductForm = observer(() => {
  const productStore = useProductStore();

  const handleEditPrice = async (e) => {
    e.preventDefault();

    if (!productStore.editProductId) {
      productStore.setEditError("Please enter product ID.");
      return;
    }

    const updates = {};
    if (productStore.editNewPrice !== "") {
      updates.price = parseFloat(productStore.editNewPrice);
    }
    if (productStore.editNewName !== "") {
      updates.name = productStore.editNewName;
    }
    if (productStore.editNewDescription !== "") {
      updates.description = productStore.editNewDescription;
    }
    if (productStore.editNewAvailable !== "") {
      updates.available = parseInt(productStore.editNewAvailable);
    }
    if (productStore.editNewImg !== "") {
      updates.img = productStore.editNewImg;
    }

    await productStore.updateProduct(productStore.editProductId, updates);

    productStore.setEditProductId("");
    productStore.setEditNewPrice("");
    productStore.setEditNewName("");
    productStore.setEditNewDescription("");
    productStore.setEditNewAvailable("");
    productStore.setEditNewImg("");
    productStore.setEditError(null);

    window.location.reload();
  };

  return (
    <div>
      <h2>Edit Product Price:</h2>
      <form onSubmit={handleEditPrice}>
        {productStore.editError && <p style={{ color: "red" }}>{productStore.editError}</p>}
        <label>
          Product ID:
          <input
            type="text"
            value={productStore.editProductId}
            onChange={(e) => productStore.setEditProductId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Price:
          <input
            type="number"
            value={productStore.editNewPrice}
            onChange={(e) => productStore.setEditNewPrice(e.target.value)}
            step="0.01"
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={productStore.editNewName}
            onChange={(e) => productStore.setEditNewName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={productStore.editNewDescription}
            onChange={(e) => productStore.setEditNewDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Available:
          <input
            type="number"
            value={productStore.editNewAvailable}
            onChange={(e) => productStore.setEditNewAvailable(e.target.value)}
          />
        </label>
        <br />
        <label>
          Img:
          <input
            type="text"
            value={productStore.editNewImg}
            onChange={(e) => productStore.setEditNewImg(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Edit Product</button>
      </form>
    </div>
  );
});

export default EditProductForm;
