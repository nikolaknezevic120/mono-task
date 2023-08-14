import React, { useState } from "react";
import { observer } from "mobx-react";
import { getDatabase, ref, remove} from "firebase/database";
import { useProductStore } from "../Stores/ProductStore";

const DeleteProductForm = observer(() => {
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const productStore = useProductStore();

  const handleDeleteProduct = async () => {
    const db = getDatabase();
    const productRef = ref(db, `products/${deleteProductId}`);

    try {
      await remove(productRef);
      setDeleteProductId("");
      setDeleteError(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteError("Error deleting product: " + error.message);
    }

    window.location.reload();
  };

  return (
    <div>
      <h2>Delete Product:</h2>
      <form onSubmit={handleDeleteProduct}>
        {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
        <label>
          Product ID:
          <input
            type="text"
            value={deleteProductId}
            onChange={(e) => setDeleteProductId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
});

export default DeleteProductForm;
