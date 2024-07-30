// cartUtils.js

// Retrieve cart items from local storage
export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Save cart items to local storage
export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Update cart items in local storage
export const updateCartInLocalStorage = (cart) => {
  saveCartToLocalStorage(cart);
};

// Get total item count in the cart
export const getCartCount = () => {
  const cartItems = getCartFromLocalStorage();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};
