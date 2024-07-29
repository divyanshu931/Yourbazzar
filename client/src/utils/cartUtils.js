// cartUtils.js
export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  
// Update cart in local storage
export const updateCartInLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };