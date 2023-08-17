import React from "react";
import { observer } from "mobx-react";
import { Container } from "react-bootstrap";
import AddProductForm from "../Components/AddProductForm";
import DeleteProductForm from "../Components/DeleteProductForm";
import EditProductForm from "../Components/EditProductForm";
import AdminProductList from "../Components/AdminProductList";

const AdminPageLayout = observer(() => {
    return (

        <div className="App">
            <Container>
                <AdminProductList />

                <AddProductForm />

                <DeleteProductForm />

                <EditProductForm />
            </Container>
        </div>
    );
});

export default AdminPageLayout;
