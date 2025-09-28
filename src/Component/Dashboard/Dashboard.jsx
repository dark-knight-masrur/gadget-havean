import './Dashboard.css'
import { useState } from 'react';
import Wishlist from './Wishlist/Wishlist';
import Cart from './Cart/Cart';
import { Helmet } from 'react-helmet';
const Dashboard = () => {

    const [active, setActive] = useState('')
    return (
        <div>
            <Helmet>
                <title>Gadget Havean | Dashboard</title>
            </Helmet>

            <div className="hero min-h-[30vh] pb-10 md:w-11/12 mx-auto -mt-1  bg-[#9538E2]  shadow-sm border border-x-amber-500 text-white">
                <div className="hero-content text-center ">
                    <div className="md:w-11/12 space-y-5">
                        <h1 className="text-2xl font-bold mx-auto">Dashboard</h1>
                        <p className="md:text-base text-xs py-2 md:w-10/12 mx-auto">
                            Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
                        </p>
                        {/* button section  */}
                        <div className={"space-x-3 "}>
                            <button onClick={() => setActive('cart')} className={`btn btn-1 rounded-full ${active === 'cart' ? 'active' : ''}`}>Cart</button>
                            <button onClick={() => setActive('wishlist')} className={`btn btn-1 rounded-full ${active === 'wishlist' ? 'active' : ''}`}>Wishlist</button>
                        </div>
                    </div>

                </div>

            </div>


            {/* Conditional rendering */}
            <div className='lg:w-9/12 mx-auto'>
                {active === 'wishlist' ? <Wishlist /> : <Cart />}

            </div>
        </div>
    );
};

export default Dashboard;