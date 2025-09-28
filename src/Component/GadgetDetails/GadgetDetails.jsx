import { GiShoppingCart } from 'react-icons/gi';
import './GadgetDetails.css';
import { useLoaderData, useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../../assets/Utilites/createContext/CartContext';
import { useWish } from '../../assets/Utilites/createContext/WishContext';
import CartModal from '../../assets/Utilites/Modal/Modal';
import WishModal from '../../assets/Utilites/Modal/WishModal';
import { Helmet } from 'react-helmet';

const GadgetDetails = () => {

    //getting data from server
    const { gadgetId } = useParams();
    const data = useLoaderData();
    const id = parseInt(gadgetId);

    // adding product in cart and wish list state state 
    const [addToCart, setAddToCart] = useState(false);
    const [addToWish, setAddToWish] = useState(false);
    const { addToCart: addToCartContext, isInCart, getItemQuantity } = useCart();
    const { addToWish: addToWishContext, isInWish, wishGetItemQuantity } = useWish();

    //cart and wish modal showing state
    const [showModal, setShowModal] = useState(false);
    const [wishModal, setWishModal] = useState(false);

    //the variable for getting exact data
    const gadget = data.find(gadget => gadget.id === id);

    //if the site crash it will show no gadget
    if (!gadget) {
        return <div>Gadget not found!</div>;
    }

    //getting real time cart and wishlist's exact product 
    const itemQuantity = getItemQuantity(id);
    const wishItemQuantity = wishGetItemQuantity(id);

    // Add to cart function
    const handleCart = () => {
        setAddToCart(true);
        setTimeout(() => setAddToCart(false), 2000);
        setShowModal(true);
        //  auto-close after 5 seconds, add:
        setTimeout(() => setShowModal(false), 3000);
        addToCartContext(gadget);

    };
    // And the wishlist button logic:
    const handleWish = () => {

        setAddToWish(true);
        setTimeout(() => setAddToWish(false), 2000);
        setWishModal(true);
        // auto-close after 5 seconds, add:
        setTimeout(() => setWishModal(false), 3000);
        addToWishContext(gadget);
    };

    // closing function for cart and wishlist
    const closeModal = () => {
        setShowModal(false);
    };
    const closeWishModal = () => {
        setWishModal(false);
    };

    return (
        <div>
            <Helmet>
                <title>{`Gadget Havean |${gadget.id}`}</title>
            </Helmet>

            {/* Hero section */}
            <div className="hero md:min-h-[60vh] pb-10 md:w-11/12 mx-auto -mt-1 bg-[#9538E2] shadow-sm border border-x-amber-500 text-white">
                <div className="hero-content text-center">
                    <div className="md:w-11/12 space-y-4">
                        <h1 className="text-2xl md:text-xl lg:text-5xl font-bold mx-auto">Product Details Section</h1>
                        <p className="md:text-base text-xs py-6 md:w-10/12 mx-auto">
                            Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
                        </p>
                    </div>
                </div>
            </div>

            {/* Product details */}
            <div className="mx-auto px-4 py-20 md:py-25 ">
                <div className="w-11/12 mx-auto md:w-7/12 floating relative md:flex items-center justify-center p-6 lg:p-10 mb-96 lg:mb-52">
                    <div className="absolute -top-35 md:-top-52 bg-white">
                        <div className="hero rounded-2xl shadow-2xl w-full">
                            <div className="hero-content flex-col lg:flex-row px-10 lg:gap-15">

                                {/* //product image  */}
                                <figure className='lg:w-5/12'>
                                    <img
                                        src={gadget.image}
                                        alt={gadget.name}
                                        className="object-fit rounded-lg"
                                    />
                                </figure>

                                <div className='lg:w-7/12 space-y-3'>
                                    <h1 className="md:text-xl font-bold">{gadget.name}</h1>
                                    <p className="lg:py-6 font-bold md:text-xl">$: {gadget.price}</p>
                                    <span className='btn border border-green-400 rounded-full'>In Stock</span>
                                    <p className='font-bold max-sm:text-xs text-justify'>{gadget.details}</p>
                                    <ol className='list-decimal text-xs lg:text-base space-y-3'>
                                        {gadget.specifications.map((specification, i) => (
                                            <li key={i}>{specification}</li>
                                        ))}
                                    </ol>

                                    {/* Rating */}
                                    <p className='inline-flex items-center gap-1'>Your Rating <FaStar /> </p>
                                    <br />
                                    <div className='flex gap-3'>
                                        <div className="rating rating-lg rating-half">
                                            <input type="radio" name="rating-11" className="rating-hidden" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-400" aria-label="0.5 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-400" aria-label="1 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-400" aria-label="1.5 star" defaultChecked />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-400" aria-label="2 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-400" aria-label="2.5 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-400" aria-label="3 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-400" aria-label="3.5 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-400" aria-label="4 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-400" aria-label="4.5 star" />
                                            <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-400" aria-label="5 star" />
                                        </div>
                                        <p className='text-xl font-semibold'>{gadget.rating}</p>
                                    </div>

                                    {/* Cart product info that show how many produt added */}
                                    {isInCart(id) && (
                                        <p className="text-green-600 font-semibold">
                                            In cart: {itemQuantity} item{itemQuantity > 1 ? 's' : ''}
                                        </p>
                                    )}

                                    {/* wishlist product info that show how many produt added */}
                                    {isInWish(id) && (
                                        <p className="text-pink-600 font-semibold"> {/* Changed color for distinction */}
                                            In wishlist: {wishItemQuantity} item{wishItemQuantity > 1 ? 's' : ''}
                                        </p>
                                    )}

                                    {/* Cart buttons */}
                                    <div className='space-x-5'>
                                        <button
                                            onClick={handleCart}
                                            className="btn broder bg-[#9538E2] hover:bg-transparent hover:border-[#9538E2] hover:text-[#9538E2] text-white rounded-full"
                                        >
                                            {addToCart ? ('✓ Added to cart!') : (
                                                <>
                                                    Add to cart <GiShoppingCart className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </button>

                                        {/* wish button  */}
                                        <button
                                            onClick={handleWish}
                                            className="btn broder border-gray-500 hover:bg-[#9538E2] hover:text-white text-gray-500 rounded-full">

                                            {addToWish ? (<FaHeart className='w-5 h-5' />
                                            ) : (
                                                <>
                                                    <FaRegHeart className='w-5 h-5' />
                                                </>
                                            )}

                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating icons */}
                        <div className="absolute -top-5 -left-5 floating" style={{ animationDelay: '0.5s' }}>
                            <div className="bg-purple-600 rounded-lg p-2 shadow-lg">
                                <i className="fas fa-headphones text-white text-2xl"></i>
                            </div>
                        </div>
                        <div className="absolute -bottom-5 -right-5 floating" style={{ animationDelay: '1s' }}>
                            <div className="bg-blue-500 rounded-lg p-2 shadow-lg">
                                <i className="fas fa-microchip text-white text-2xl"></i>
                            </div>
                        </div>
                        <div className="absolute top-1/3 -right-8 floating" style={{ animationDelay: '1.5s' }}>
                            <div className="bg-green-500 rounded-lg p-2 shadow-lg">
                                <i className="fas fa-mobile-alt text-white text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fontawesome */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </div>

            {/* this is custom hook distructuring system for cart and wish list  */}
            <CartModal
                isOpen={showModal}
                onClose={closeModal}
                gadget={gadget}
                cartCount={getItemQuantity(gadget.id)}
            />
            <WishModal
                isOpen={wishModal}
                onClose={closeWishModal}
                gadget={gadget}
                wishCount={wishGetItemQuantity(gadget.id)}
            />


        </div>
    );
};

export default GadgetDetails;