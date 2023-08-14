import React from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";

const AddProductForm = observer(() => {
  const productStore = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await productStore.handleAddProduct(productStore.newProduct);

      productStore.newProduct = {
        name: "",
        description: "",
        price: "",
        img: "",
        available: "",
        category: "",
      };
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h2>Add New Product:</h2>
      <form onSubmit={handleAddProduct}>
        <label>
          Name:
          <input
            type="text"
            value={productStore.newProduct.name}
            onChange={(e) => (productStore.newProduct.name = e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={productStore.newProduct.description}
            onChange={(e) => (productStore.newProduct.description = e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Available:
          <input
            type="number"
            value={productStore.newProduct.available}
            onChange={(e) => (productStore.newProduct.available = e.target.value)}
            step="1"
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={productStore.newProduct.price}
            onChange={(e) => (productStore.newProduct.price = e.target.value)}
            step="0.01"
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            value={productStore.newProduct.category}
            onChange={(e) => (productStore.newProduct.category = e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {productStore.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Img URL:
          <input
            type="text"
            value={productStore.newProduct.img}
            onChange={(e) => (productStore.newProduct.img = e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
});

export default AddProductForm;
