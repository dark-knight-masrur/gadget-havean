import { createContext, useContext, useState, useEffect } from 'react';

// Create Wish Context
const WishContext = createContext();

// Wish Provider Component
export const WishProvider = ({ children }) => {
    // Initialize Wish items from localStorage or empty array
    const [wishItems, setWishItems] = useState(() => {
        try {
            const savedWish = localStorage.getItem('WishItems');
            return savedWish ? JSON.parse(savedWish) : [];
        } catch (error) {
            console.error('Error loading Wish from localStorage:', error);
            return [];
        }
    });

    // Save Wish items to localStorage whenever WishItems changes
    useEffect(() => {
        try {
            localStorage.setItem('WishItems', JSON.stringify(wishItems));
        } catch (error) {
            console.error('Error saving Wish to localStorage:', error);
        }
    }, [wishItems]);

    // Add item to Wish
    const addToWish = (gadget) => {
        if (!gadget || !gadget.id) {
            console.error('Invalid gadget object:', gadget);
            return;
        }

        setWishItems(prevItems => {
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

    // Remove item from Wish
    const removeFromWish = (gadgetId) => {
        setWishItems(prevItems => prevItems.filter(item => item.id !== gadgetId));
    };

    // Clear entire Wish
    const clearWish = () => {
        setWishItems([]);
    };

    // Update item quantity
    const updateQuantity = (gadgetId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromWish(gadgetId);
            return;
        }

        setWishItems(prevItems =>
            prevItems.map(item =>
                item.id === gadgetId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Calculate total items in Wish
    const getWishTotal = () => {
        return wishItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price
    const getWishTotalPrice = () => {
        return wishItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    // Check if item is in Wish
    const isInWish = (gadgetId) => {
        return wishItems.some(item => item.id === gadgetId);
    };

    // Get item quantity in Wish
    const wishGetItemQuantity = (gadgetId) => {
        const item = wishItems.find(item => item.id === gadgetId);
        return item ? item.quantity : 0;
    };

    // Context value
    const value = {
        wishItems,
        addToWish,
        removeFromWish,
        clearWish,
        updateQuantity,
        getWishTotal,
        getWishTotalPrice,
        isInWish,
        wishGetItemQuantity
    };

    return (
        <WishContext.Provider value={value}>
            {children}
        </WishContext.Provider>
    );
};

// Custom hook to use Wish context
export const useWish = () => {
    const context = useContext(WishContext);

    if (!context) {
        throw new Error('useWish must be used within a WishProvider');
    }

    return context;
};

export default WishContext;