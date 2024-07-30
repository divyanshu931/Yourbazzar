import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/cartUtils';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartFromLocalStorage());

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const addToCart = (product, quantity) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.product._id === product._id);

        if (existingProductIndex > -1) {
            updatedCart[existingProductIndex].quantity += quantity;
        } else {
            updatedCart.push({ product, quantity });
        }

        setCart(updatedCart);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
