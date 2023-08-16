import React from "react";
import { observer } from "mobx-react";
import OrderDetails from '../Components/OrderDetails'
import ShoppingCart from "../Components/ShoppingCart";

const CartPageLayout = observer(() => {
    return (

        <div className="App">
            <ShoppingCart />

            <OrderDetails />
        </div>
    );
});

export default CartPageLayout;