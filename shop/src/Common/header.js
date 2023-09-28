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
        <Navbar.Brand href="#home">Nikola Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/'>
              <strong>Početna</strong>
            </Nav.Link>
            <Nav.Link onClick={handleSortByPrice}>
              <strong>Sortiraj po cijeni: </strong>
              {productStore.sortByPriceAsc ? " od veće prema manjoj" : " od manje prema većoj"}
            </Nav.Link>
            <Nav.Link>
              <strong>Filtriraj po kategorijama:</strong>
              <select value={productStore.selectedCategory} onChange={handleCategoryChange}>
                <option value="">Sve kategorije</option>
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
