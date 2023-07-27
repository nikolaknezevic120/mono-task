import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserInput from './UserInput';
import OrderCart from './OrderCart';
import '../../style/Order/Order.css';

const Order = () => {
  return (
    <Col xs={12} sm={12} md={12} lg={12} className='cart'>
      <h1 id='orderTitle'>Košarica</h1>

      <Row>
        <Link to="/">
          <Button id='btnBack'>Odustani</Button>
        </Link>
        <Col xs={12} sm={6} md={6} lg={6}>
          <OrderCart />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <UserInput />
        </Col>
      </Row>
    </Col>
  );
};

export default Order;