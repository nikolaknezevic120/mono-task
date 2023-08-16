import React from 'react';
import { observer } from "mobx-react";
import { useProductStore } from "../Stores/ProductStore";
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const Header = observer(() => {
  const productStore = useProductStore();

  const handleSortByPrice = () => {
    productStore.toggleSortByPriceAsc();
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    productStore.setSelectedCategory(selectedCategory);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Mono Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/'>
              Home
            </Nav.Link>
            <Nav.Link onClick={handleSortByPrice}>
              Sort by Price {productStore.sortByPriceAsc ? "↑" : "↓"}
            </Nav.Link>
            <Nav.Link>
              <select value={productStore.selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {productStore.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
