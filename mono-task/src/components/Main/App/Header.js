import React from 'react';
import { observer } from 'mobx-react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Container, Form, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import productStore from '../../../AppElements/ProductStore'

function Header() {
  const handleCategoryChange = (e) => {
    productStore.setSelectedCategory(e.target.value);
  };

  const handleSortByChange = (e) => {
    productStore.selectedSortOption = e.target.value;
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">MonoTask</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>

            <span style={{ margin: 'auto 1rem' }}>Sortiraj:</span>
            <Form.Control
              as="select"
              value={productStore.selectedSortOption}
              onChange={handleSortByChange}
              style={{ width: '200px' }}
            >
              <option value="asc">Od manje cijene</option>
              <option value="desc">Od veće cijene</option>
            </Form.Control>

            <span style={{ margin: 'auto 1rem' }}>Filtriraj:</span>
            <Form.Control
              as="select"
              value={productStore.selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Sve kategorije</option>
              <option value="tshirt">Majice</option>
              <option value="accessories">Ostalo</option>
            </Form.Control>
          </Nav>

          <Nav className="d-lg-none">
            <Nav.Link href="#cart" className="d-flex align-items-center">
              <RiShoppingCartLine size={20} />
              <span style={{ marginLeft: '5px' }}>{productStore.cartItemCount}</span>
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Pretraži proizvode"
              value={productStore.searchQuery}
              onChange={(e) => productStore.setSearchQuery(e.target.value)}
            />
          </Form>

          <Nav className="d-none d-lg-block">
            <Nav.Link href="#cart" className="d-flex align-items-center">
              <RiShoppingCartLine size={20} />
              <span style={{ marginLeft: '5px' }}>{productStore.cartItemCount}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default observer(Header);
