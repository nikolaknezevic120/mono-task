import React from "react";
import { observer } from "mobx-react";
import ProductList from "../Components/ProductList";
import AddProductForm from "../Components/AddProductForm";
import DeleteProductForm from "../Components/DeleteProductForm";
import EditProductForm from "../Components/EditProductForm";
import ShoppingCart from "../Components/ShoppingCart";
import OrderDetails from "../Components/OrderDetails.js";
import Header from "../Common/header";

const AppLayout = observer(() => {
  return (

    <div>
      <Header />

      <ProductList />

      <AddProductForm />

      <DeleteProductForm />

      <EditProductForm />

      <ShoppingCart />

      <OrderDetails />
    </div>
  );
});

export default AppLayout;
