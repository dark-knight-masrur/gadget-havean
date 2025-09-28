import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../../assets/Utilites/createContext/CartContext";
import { Link } from "react-router-dom";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState, useEffect } from "react";

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const [sort, setSort] = useState('');
    const [sortedItems, setSortedItems] = useState([]);

    // Get enriched items with ratings - safe version
    const getEnrichedItems = () => {
        // If cartItems is empty or undefined, return empty array
        if (!cartItems || cartItems.length === 0) {
            return [];
        }

        return cartItems.map(cartItem => {
            // Just use the rating from cartItem itself (it should be preserved in context)
            return {
                ...cartItem,
                rating: cartItem.rating || 0 // Use the rating that's already in cart item
            };
        });
    };

    // Update sorted items when cart or sort changes
    useEffect(() => {
        const enrichedItems = getEnrichedItems();

        if (sort === 'Price') {
            setSortedItems([...enrichedItems].sort((a, b) => a.price - b.price));
        } else if (sort === 'Rating') {
            setSortedItems([...enrichedItems].sort((a, b) => b.rating - a.rating));
        } else {
            setSortedItems(enrichedItems);
        }
    }, [cartItems, sort]);

    const handleSort = (sortType) => {
        setSort(sortType);
    };

    const displayItems = sortedItems.length > 0 ? sortedItems : getEnrichedItems();
    const totalPrice = displayItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="p-6 md:w-11/12 mx-auto ">


            {cartItems && cartItems.length > 0 && (
                <div className="justify-between md:flex gap-5 mb-6 items-center">
                    <h2 className="text-xl font-bold">Cart</h2>
                    <div className="flex gap-4  items-center">
                        <h3 className="md:text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn broder bg-[#9538E2] hover:bg-transparent hover:border-[#9538E2] hover:text-[#9538E2] text-white rounded-full">
                                {sort ? `sort by ${sort}` : 'sort'}
                                <GiSettingsKnobs className=" w-5 h-5" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li onClick={() => handleSort('Price')}><a>Price</a></li>
                                <li onClick={() => handleSort('Rating')}><a>Rating</a></li>
                                <li onClick={() => handleSort('')}><a>Clear Sort</a></li>
                            </ul>
                        </div>

                        <button className="btn broder bg-[#9538E2] hover:bg-transparent hover:border-[#9538E2] hover:text-[#9538E2] text-white rounded-full">Purchase</button>
                    </div>
                </div>
            )}

            {displayItems.length === 0 ? (
                <div className="text-center">
                    <p className=" text-xl my-8">Your cart is empty</p>
                    <Link to={'/'}>
                        <button className="btn broder border-[#9538E2] animate-bounce hover:bg-[#9538E2] text-[#9538E2] hover:text-white rounded-full">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            ) : (
                <div>
                    {displayItems.map(item => (
                        <div key={item.id} className="md:flex max-sm:space-y-4 items-center justify-between my-10 py-4">
                            <div className="md:flex items-center gap-5">
                                <img src={item.image} alt={item.name} className="w-40 h-24 object-contain mr-4" />
                                <div className="space-y-4">
                                    <h3 className="font-bold text-2xl">{item.name}</h3>
                                    <p className="">{item.details} </p>
                                    <p className="text-xl font-semibold">$: {item.price} x {item.quantity}</p>
                                    <div className="inline-flex items-center gap-1">
                                        Your Rating: {item.rating || 'No rating'}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrashAlt className="w-5 h-7" />
                            </button>
                        </div>
                    ))}


                </div>
            )}
        </div>

    );
};

export default Cart;