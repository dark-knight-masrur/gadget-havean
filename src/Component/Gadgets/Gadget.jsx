import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../assets/Utilites/createContext/CartContext";
import { GiShoppingCart } from "react-icons/gi";
import CartModal from "../../assets/Utilites/Modal/Modal";

const Gadget = ({ gadget }) => {
    // the tree items is for adding prodcuts in cart section and show modal 
    const [addToCart, setAddToCart] = useState(false);
    const { addToCart: addToCartContext, getItemQuantity } = useCart();
    const [showModal, setShowModal] = useState(false);

    //if site crash by  chance it will show
    if (!gadget) {
        return <div>Gadget not found!</div>;
    }

    //add cart function
    const handleCart = () => {
        setAddToCart(true);

        // auto-reform button in 2 second 
        setTimeout(() => setAddToCart(false), 2000);
        setShowModal(true);
        //  auto-close modal after 5 seconds, add:
        setTimeout(() => setShowModal(false), 3000);
        addToCartContext(gadget);

    };
    // close moal fuction:

    const closeModal = () => {
        setShowModal(false);
    };




    return (
        <div className="card   shadow-sm">

            {/* image section  */}
            <figure className="bg-[#D9D9D9] p-5 m-5 rounded-2xl h-[30vh] md:h-[20vh]">
                <img className="object-contain h-[25vh] md:h-[15vh] w-full"
                    src={gadget.image}
                    alt={gadget.model} />
            </figure>


            <div className="card-body">
                <h2 className="card-title">{gadget.name}</h2>
                <p>$: {gadget.price}</p>
                <div className="card-actions justify-between">

                    {/* button section  */}
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

            {/* destructure modal fuction for cart  */}
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