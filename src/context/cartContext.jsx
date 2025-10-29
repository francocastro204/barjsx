import { createContext, useState, useEffect } from 'react';

const cartContext = createContext({ cart: [] });
const CartProvider = cartContext.Provider;

// Función para obtener el carrito del localStorage
const getCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        return [];
    }
};

export function CartContextProvider({ children}) {
    const [cartItems, setCartItems] = useState(getCartFromLocalStorage);

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    function addItem (item) {
        const newCartItems = structuredClone(cartItems);
        newCartItems.push(item);
        setCartItems(newCartItems);
    }

    function removeItem (item) {
        const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(newCartItems);
    }

    function clearCart () {
        setCartItems([]);
    }

    function countItemsInCart () {
        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
        });
        return totalItems;
    }

    function getTotalPrice () {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    }

    return (
        <CartProvider value={ { cart: cartItems, addItem, removeItem, clearCart, countItemsInCart, getTotalPrice }}>
            {children}
        </CartProvider>
    );
}

export default cartContext;
