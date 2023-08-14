import React from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";

const Header = observer(() => {
  const productStore = useProductStore();

  const handleSortByPrice = () => {
    productStore.toggleSortByPriceAsc();
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    productStore.setSelectedCategory(selectedCategory);
  };

  return (
    <div className="header">
      <h1>Product Store</h1>
      <button onClick={handleSortByPrice}>
        Sort by Price {productStore.sortByPriceAsc ? "↑" : "↓"}
      </button>

      <label>
        Filter by Category:
        <select value={productStore.selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {productStore.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
});

export default Header;
