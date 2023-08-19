export const calculateTotalPrice = (cart) => {
    let total = 0;
    Object.keys(cart).forEach((productId) => {
      const item = cart[productId];
      total += item.quantity * item.product.price;
    });
    return total;
  };