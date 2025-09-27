import { Link } from "react-router-dom";
import { useWish } from "../createContext/WishContext";


const WishModal = ({ isOpen, onClose, gadget, }) => {
    const { wishItems } = useWish();
    const WishCount = wishItems.reduce((total, item) => total + item.quantity, 0);

    wishItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    if (!isOpen) return null;

    return (
        <dialog id="Wish_modal" className="modal" open>
            <div className="modal-box">
                <h3 className="font-bold text-3xl text-center text-green-600">🎉 Added to Wish!</h3>
                <div className="py-4 text-center">
                    <img
                        src={gadget.image}
                        alt={gadget.name}
                        className="w-20 h-20 object-contain mx-auto mb-3"
                    />
                    <p className="font-semibold">{gadget.name}</p>
                    <p className="text-gray-600">${gadget.price}</p>
                </div>

                <div className="modal-action flex justify-center space-x-3">
                    <Link to={'/'}>
                        <button
                            onClick={onClose}
                            className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                        >
                            Continue Shopping
                        </button></Link>
                    <Link to="/Wishlist" onClick={onClose}>
                        <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">
                            View Wish ({WishCount})
                        </button>
                    </Link>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};



export default WishModal;