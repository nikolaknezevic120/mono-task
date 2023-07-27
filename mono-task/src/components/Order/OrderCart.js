import React from 'react';
import { observer } from 'mobx-react';
import productStore from '../../AppElements/ProductStore';

const OrderCart = observer(() => {
    return (
        <>
            {productStore.cart.length === 0 ? (
                <p id='pCart'>Košarica je prazna.</p>
            ) : (
                <div xs={12} sm={12} md={4} lg={3}>
                    <ul id='productList'>
                        {productStore.cart.map((item) => (
                            <li id='cartItems' key={item.id}>
                                <p>
                                    <img id='imgCart' src={item.img} alt={item.name} /> {item.name} - {item.price.toFixed(2)}€ x {item.quantity}
                                    <br />
                                    <span id='orderSpan' onClick={() => productStore.removeFromCart(item.id)}>Ukloni iz košarice</span>
                                </p>
                            </li>

                        ))}
                        <p>Ukupno: {productStore.totalAmount.toFixed(2)}€</p>

                    </ul>

                </div>
            )}
        </>
    );
});

export default OrderCart;
