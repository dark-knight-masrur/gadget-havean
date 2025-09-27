import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../assets/Utilites/createContext/CartContext";
import { GiShoppingCart } from "react-icons/gi";
import CartModal from "../../assets/Utilites/Modal/Modal";

const Gadget = ({ gadget }) => {

    const [addToCart, setAddToCart] = useState(false);
    const { addToCart: addToCartContext, getItemQuantity } = useCart();


    const [showModal, setShowModal] = useState(false);

    if (!gadget) {
        return <div>Gadget not found!</div>;
    }


    const handleCart = () => {
        setAddToCart(true);
        setTimeout(() => setAddToCart(false), 2000);
        setShowModal(true);
        //  auto-close after 5 seconds, add:
        setTimeout(() => setShowModal(false), 3000);
        addToCartContext(gadget);

    };
    // And the wishlist button logic:

    const closeModal = () => {
        setShowModal(false);
    };




    return (
        <div className="card  w-96 shadow-sm">
            <figure className="bg-[#D9D9D9] p-5 m-5 rounded-2xl h-[30vh] md:h-[20vh]">
                <img className="object-contain h-[25vh] md:h-[15vh] w-full"
                    src={gadget.image}
                    alt={gadget.model} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{gadget.name}</h2>
                <p>$: {gadget.price}</p>
                <div className="card-actions justify-between">
                    <Link to={`/gadgetdetails/${gadget.id}`} >
                        <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">View Details</button>
                    </Link>

                    <button
                        onClick={handleCart}

                        className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                    >
                        {addToCart ? ('✓ Added to cart!') : (
                            <>
                                Add to cart <GiShoppingCart className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>

                </div>
            </div>


            <CartModal
                isOpen={showModal}
                onClose={closeModal}
                gadget={gadget}
                cartCount={getItemQuantity(gadget.id)}
            />


        </div >
    );
};

export default Gadget;