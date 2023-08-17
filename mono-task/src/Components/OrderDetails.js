import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useCartStore } from "../Stores/CartStore";
import { useProductStore } from "../Stores/ProductStore";
import '../Style/Cart/cart.css';

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
      <form className="form-container" onSubmit={handleOrderClick}>
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

        <Link to="/">
        <Button
          type="submit"
          onClick={handleOrderClick}
          disabled={cartStore.isOrdering}
          
        >
          {cartStore.isOrdering ? "Processing..." : "Order"}
        </Button>
        </Link>
      </form>
    </div>
  );
});

export default OrderDetails;
