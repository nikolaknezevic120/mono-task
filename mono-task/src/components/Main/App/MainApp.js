import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../Cart/Products';
import Cart from '../Cart/Cart';
import { observer } from 'mobx-react';
import productStore from '../../../AppElements/ProductStore';
import '../../../style/App/App.css';

const MainApp = observer(() => {
  useEffect(() => {
    productStore.fetchProductsFromApi();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={9} xl={10}>
          <Products />
        </Col>
        <Col xs={12} md={3} xl={2} className="cart">
          <Cart />
        </Col>
      </Row>
    </Container>
  );
});

export default MainApp;