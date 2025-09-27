import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (gadget) => {
        if (!gadget || !gadget.id) {
            console.error('Invalid gadget object:', gadget);
            return;
        }

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === gadget.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === gadget.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            rating: gadget.rating
                        }
                        : item
                );
            } else {
                return [...prevItems, {
                    ...gadget,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                }];
            }
        });
    };

    const removeFromCart = (gadgetId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== gadgetId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateQuantity = (gadgetId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(gadgetId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === gadgetId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    const isInCart = (gadgetId) => {
        return cartItems.some(item => item.id === gadgetId);
    };

    const getItemQuantity = (gadgetId) => {
        const item = cartItems.find(item => item.id === gadgetId);
        return item ? item.quantity : 0;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotal,
        getCartTotalPrice,
        isInCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;