import React from "react";
import { observer } from "mobx-react";
import { useCartStore } from "../Stores/CartStore";
import { useProductStore } from "../Stores/ProductStore";

const OrderDetails = observer(() => {
  const cartStore = useCartStore();
  const productStore = useProductStore();

  const handleOrderClick = async () => {
    await cartStore.handleOrder(productStore);
    window.location.reload();
  };

  return (
    <div>
      <h2>User Information:</h2>
      <form onSubmit={handleOrderClick}>
        <label>
          First Name:
          <input
            type="text"
            value={cartStore.userInfo.firstName}
            onChange={(e) => cartStore.setFirstName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            value={cartStore.userInfo.lastName}
            onChange={(e) => cartStore.setLastName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={cartStore.userInfo.email}
            onChange={(e) => cartStore.setEmail(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          City:
          <input
            type="text"
            value={cartStore.userInfo.city}
            onChange={(e) => cartStore.setCity(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Address:
          <input
            type="text"
            value={cartStore.userInfo.address}
            onChange={(e) => cartStore.setAddress(e.target.value)}
            required
          />
        </label>
        <br />

        <button
          type="submit"
          onClick={handleOrderClick}
          disabled={cartStore.isOrdering}
        >
          {cartStore.isOrdering ? "Processing..." : "Order"}
        </button>
      </form>
    </div>
  );
});

export default OrderDetails;
