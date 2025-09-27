import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt2, HiOutlineShoppingCart } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import { useCart } from "../../assets/Utilites/createContext/CartContext";
import { useWish } from "../../assets/Utilites/createContext/WishContext";

const Navbar = () => {

    const navLinks =
        <>
            <NavLink to={'/'}><li >Home</li></NavLink>
            <NavLink to={'/statistics'}><li>Statistics</li></NavLink>
            <NavLink to={'/dashboard'}><li>Dashboard</li></NavLink>
        </>


    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    //add items length in wish section
    const { wishItems } = useWish();

    const wishTotalPrice = wishItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const wishCount = wishItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="navbar px-15 py-10 ">
            <div className=" navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <HiMenuAlt2 className="h-5 w-5" />
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link>
                    <li className="btn-2 text-white uppercase text-2xl italic font-bold">Gadget Heaven</li>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu gap-9 menu-horizontal px-1 btn-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-5">

                {/* shopping cart start  */}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <HiOutlineShoppingCart className="h-5 w-5" />

                            <span className="badge badge-sm indicator-item">{cartCount}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg text-[#9835E2] font-bold">{cartCount} Items</span>
                            <span className="text-info">Subtotal: $ {totalPrice}</span>
                            <div className="card-actions">
                                <Link to={'/cart'}><button className="btn btn-1 rounded-full ">View cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* shopping cart end  */}


                {/* wishlist start  */}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <FaRegHeart className="h-5 w-5" />

                            <span className="badge badge-sm indicator-item">{wishCount}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg text-[#9538E2] font-bold">{wishCount} Items</span>
                            <span className="text-info">Subtotal: $ {wishTotalPrice}</span>
                            <div className="card-actions">
                                <Link to={'/wishlist'}><button className="btn btn-1 rounded-full">Wishlist</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* wishlist end  */}
            </div>




        </div >
    );
};

export default Navbar;