import React from "react";
import { observer } from "mobx-react";
import AddProductForm from "../Components/AddProductForm";
import DeleteProductForm from "../Components/DeleteProductForm";
import EditProductForm from "../Components/EditProductForm";
import AdminProductList from "../Components/AdminProductList";

const AdminPageLayout = observer(() => {
    return (

        <div className="App">
            <AdminProductList />
            
            <AddProductForm />

            <DeleteProductForm />

            <EditProductForm />
        </div>
    );
});

export default AdminPageLayout;
