import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import productStore from '../../AppElements/ProductStore';
import '../../style/Order/Order.css'
import { Link } from 'react-router-dom';

const UserInput = observer(() => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [remark, setRemark] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAdressChange = (event) => {
    setAdress(event.target.value);
  }

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  }

  const printOrderData = () => {
    const orderData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      adress: adress,
      remark: remark,
      cart: productStore.cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: productStore.totalAmount.toFixed(2),
    };

    console.log(orderData);
    productStore.clearCart();
  };

  return (
    <div id='inputFields'>
      <h2>Podatci za dostavu</h2>
      <div>
        <input type="text" value={firstName} placeholder='Ime:' onChange={handleFirstNameChange} />
      </div>
      <div>
        <input type="text" value={lastName} placeholder='Prezime:' onChange={handleLastNameChange} />
      </div>
      <div>
        <input type="email" value={email} placeholder='e-mail:' onChange={handleEmailChange} />
      </div>
      <div>
        <input type="tel" value={phoneNumber} placeholder='kontakt:' onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <input type="text" value={adress} placeholder='Adresa:' onChange={handleAdressChange} />
      </div>
      <div>
        <textarea id='textArea' value={remark} placeholder="Napomena:" onChange={handleRemarkChange} />
      </div>
      <Link to={'/'}>
      <Button onClick={printOrderData}>Naruci</Button>
      </Link>
    </div>
  );

});

export default UserInput;
