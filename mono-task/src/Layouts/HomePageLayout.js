import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react";
import ProductList from "../Components/ProductList";
import ShoppingCart from "../Components/ShoppingCart";

const HomePageLayout = observer(() => {
  return (

    <div className="App">
      <ProductList />

      <ShoppingCart />

      <Link to="/orderDetails">
        <Button variant="outline-info">Continue</Button>
      </Link>
    </div>
  );
});

export default HomePageLayout;
