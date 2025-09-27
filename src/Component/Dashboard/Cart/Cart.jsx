import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../../assets/Utilites/createContext/CartContext";  // Import the hook
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="p-6 w-11/12 mx-auto ">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Shopping Cart</h2>
            <h1 className="text-xl font-bold mb-4 text-center">Total items is: {cartItems.length}</h1>


            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className=" text-xl my-8">Your cart is empty</p>
                    <Link to={'/'}>
                        <button
                            className="btn broder border-[#9538E2] animate-bounce hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                        >
                            Continue Shopping
                        </button></Link>
                </div>

            ) : (
                <div>

                    {cartItems.map(item => (

                        <div key={item.id} className="flex items-center justify-between my-10 py-4">
                            <div className="flex items-center gap-5">
                                <img src={item.image} alt={item.name} className="w-40 h-24 object-contain mr-4" />
                                <div className="space-y-4">
                                    <h3 className="font-bold text-2xl">{item.name}</h3>
                                    <p className="">${item.details} </p>
                                    <p className="text-xl font-semibold">$: {item.price} x {item.quantity}</p>
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

                    <div className="mt-4 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>

                        <Link to={'/'}>
                            <button
                                className="btn broder border-[#9538E2] animate-bounce hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full"
                            >
                                Continue Shopping
                            </button></Link>
                        <button
                            onClick={clearCart}
                            className="hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-red-600 animate-pulse border border-red-600"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;