import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    // Check if product already in cart
    const existingProductIndex = cart.findIndex(item => item.product._id === product._id);
    
    if (existingProductIndex > -1) {
      // If product is already in the cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If product is not in the cart, add it
      setCart([...cart, { product, quantity }]);
    }
    
    // Optionally, save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
