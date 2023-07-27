import React from 'react';
import { observer } from 'mobx-react'; 
import productStore from '../../../AppElements/ProductStore';
import { Row, Button } from 'react-bootstrap';

const Products = observer(() => { 
  return (
    <Row className='itemsAndCart justify-content-center'>
      {productStore.loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {productStore.filteredProducts.map((product) => (
            <li id='itemWrapper' key={product.id}>
              <h2>{product.name}</h2>
              <br />
              <img src={product.img} alt={product.name} />
              <br />
              <p>Cijena: {product.price.toFixed(2)}€</p>
              <br />
              <p id='description'>Opis: {product.description}</p>
              <br />
              {product.available === 0 ? (
                <span>Nedostupno</span>
              ) : product.available < 10 ? (
                <span>Dostupno: {product.available} komada</span>
              ) : (
                <span>Dostupno više od 10 komada</span>
              )}
              <br />
              <Button onClick={() => productStore.addToCart(product)}>Dodaj u košaricu</Button>
            </li>
          ))}
        </ul>
      )}
    </Row>
  );
});

export default Products;