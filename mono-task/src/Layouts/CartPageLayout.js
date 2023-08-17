import React from "react";
import { observer } from "mobx-react";
import { Container } from "react-bootstrap";
import OrderDetails from '../Components/OrderDetails'
import ShoppingCart from "../Components/ShoppingCart";

const CartPageLayout = observer(() => {
    return (

        <div className="App">
            <Container>
                <ShoppingCart />

                <OrderDetails />
            </Container>
        </div>
    );
});

export default CartPageLayout;