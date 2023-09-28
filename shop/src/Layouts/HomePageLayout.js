import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react";
import ProductList from "../Components/ProductList";
import ShoppingCart from "../Components/ShoppingCart";

const HomePageLayout = observer(() => {
  return (

    <div className="App">
      <Container>
        <div className="row">
          <div className="col-lg-9">
            <div className="productListMainDiv">
              <ProductList />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="shoppingCartMainDiv">
              <ShoppingCart />

              <Link to="/orderDetails">
                <Button variant="outline-info">Continue</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default HomePageLayout;
