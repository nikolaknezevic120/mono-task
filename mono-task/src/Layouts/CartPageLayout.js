import React from "react";
import { observer } from "mobx-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import OrderDetails from '../Components/OrderDetails'
import ShoppingCart from "../Components/ShoppingCart";
import { calculateTotalPrice } from "../Common/calculateTotalPrice";
import { useCartStore } from "../Stores/CartStore";

const CartPageLayout = observer(() => {

    const cartStore = useCartStore();
    const navigate = useNavigate();
    const totalAmount = calculateTotalPrice(cartStore.cart);

    if (totalAmount === 0) {
        navigate("/");
    } 

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