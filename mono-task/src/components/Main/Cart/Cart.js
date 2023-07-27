import React from 'react';
import { observer } from 'mobx-react'; 
import productStore from '../../../AppElements/ProductStore';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = observer(() => {

  const handleOrderClick = () => {
    productStore.cart.forEach((item) => {
      const product = productStore.products.find((p) => p.id === item.id);
      if (product) {
        product.available -= item.quantity;
      }
    });
    productStore.clearCart();
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className='cart'>
      <h1>Košarica</h1>
      {productStore.cart.length === 0 ? (
        <p id='pCart'>Košarica je prazna.</p>
      ) : (
        <div xs={12} sm={12} md={4} lg={3}>
          <ul id='productList'>
            {productStore.cart.map((item) => (
              <li id='cartItems' key={item.id}>
                <p>
                  <img id='imgCart' src={item.img} alt={item.name} /> {item.name} - {item.price.toFixed(2)}€ x {item.quantity}
                </p>
                <br />
                <Button onClick={() => productStore.removeFromCart(item.id)}>Ukloni iz košarice</Button>
              </li>
            ))}
          </ul>
          <p>Ukupno: {productStore.totalAmount.toFixed(2)}€</p>

          <Link to="/order">
            <Button >Nastavi</Button>
          </Link>
        </div>
      )}
    </Col>
  );
});

export default Cart;
