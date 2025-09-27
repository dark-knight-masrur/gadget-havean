import { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    // Initialize cart items from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    // Add item to cart
    const addToCart = (gadget) => {
        if (!gadget || !gadget.id) {
            console.error('Invalid gadget object:', gadget);
            return;
        }

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === gadget.id);

            if (existingItem) {
                // If item exists, increase quantity
                return prevItems.map(item =>
                    item.id === gadget.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If new item, add with quantity 1
                return [...prevItems, {
                    ...gadget,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (gadgetId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== gadgetId));
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Update item quantity
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

    // Calculate total items in cart
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price
    const getCartTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    // Check if item is in cart
    const isInCart = (gadgetId) => {
        return cartItems.some(item => item.id === gadgetId);
    };

    // Get item quantity in cart
    const getItemQuantity = (gadgetId) => {
        const item = cartItems.find(item => item.id === gadgetId);
        return item ? item.quantity : 0;
    };

    // Context value
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

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};

export default CartContext;