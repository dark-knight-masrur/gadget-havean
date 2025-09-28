import { FaTrashAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi"; // ✅ Added import
import { useWish } from "../../../assets/Utilites/createContext/WishContext";
import { useState } from "react";
import { useCart } from "../../../assets/Utilites/createContext/CartContext";
import CartModal from "../../../assets/Utilites/Modal/Modal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Wishlist = () => {
    const { wishItems, removeFromWish, clearWish } = useWish();
    const { addToCart: addToCartContext, isInCart, getItemQuantity } = useCart();

    const [showModal, setShowModal] = useState(false);
    const [selectedGadget, setSelectedGadget] = useState(null); // ✅ Store which gadget was added

    const totalPrice = wishItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Add to cart function
    const handleCart = (gadget) => {
        addToCartContext(gadget);
        setSelectedGadget(gadget); //  Set the gadget that was added
        setShowModal(true);

        // Auto-close after 3 seconds
        setTimeout(() => setShowModal(false), 3000);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedGadget(null);
    };

    if (wishItems.length === 0) {
        return (

            // if cart is empty 
            <div className="p-6 w-11/12 mx-auto text-center">

                <Helmet>
                    <title>Gadget Havean | Wishlist</title>
                </Helmet>

                <h2 className="text-2xl font-bold mb-4">Wishlist</h2>


                <p className=" text-xl my-8">Your cart is empty</p>
                <Link to={'/'}>
                    <button
                        className="btn broder border-[#9538E2] animate-bounce hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                    >
                        Continue Shopping
                    </button></Link>
            </div>
        );
    }

    return (
        //if anay product added 
        <div className="p-6 w-11/12 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>


            <div className="space-y-6">
                {wishItems.map(item => {
                    const itemQuantity = getItemQuantity(item.id); //  item.id instead of id to avoid confiction

                    return (
                        <div key={item.id} className="md:flex max-sm:space-y-3 items-center justify-between  pb-6">
                            {/* Product details */}
                            <div className="md:flex items-center gap-5 flex-1">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-24 object-contain rounded-lg"
                                />
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">{item.name}</h3>
                                    <p className="text-gray-600">{item.details}</p>
                                    <p className="text-lg font-semibold">${item.price} x {item.quantity}</p>

                                    {/* Cart information for this specific item */}
                                    {isInCart(item.id) && (
                                        <p className="text-green-600 font-semibold">
                                            In cart: {itemQuantity} item{itemQuantity > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => handleCart(item)} // ✅ Pass the current item
                                    className="btn broder bg-[#9538E2] hover:bg-transparent hover:border-[#9538E2] hover:text-[#9538E2] text-white rounded-full"
                                >
                                    Add to Cart <GiShoppingCart className="w-4 h-4 ml-2" />
                                </button>

                                {/* Remove from Wishlist Button */}
                                <button
                                    onClick={() => removeFromWish(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                    title="Remove from wishlist"
                                >
                                    <FaTrashAlt className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* all Total and Clear Button */}
                <div className="mt-6 md:flex justify-between items-center  pt-4 max-sm:space-x-4 max-sm:space-y-5">
                    <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>

                    <Link to={'/'}>
                        <button
                            className="btn broder border-[#9538E2] animate-bounce hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                        >
                            Continue Shopping
                        </button></Link>
                    <button
                        onClick={clearWish}
                        className="hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-red-600 animate-pulse border border-red-600"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

            {/* Modal - Only show if a gadget was selected */}
            {selectedGadget && (
                <CartModal
                    isOpen={showModal}
                    onClose={closeModal}
                    gadget={selectedGadget} // ✅ Use the selected gadget to avoid confliction
                    cartCount={getItemQuantity(selectedGadget.id)}
                />
            )}
        </div>
    );
};

export default Wishlist;