import { Link } from 'react-router-dom';

import { GiBrokenHeart } from 'react-icons/gi';
const ErrorPage = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#9538E2] to-[#6B21A8] flex items-center justify-center px-4">
            <div className="text-center text-white">
                <GiBrokenHeart className="text-8xl mx-auto mb-6 opacity-80" />
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-xl mb-8 max-w-md mx-auto">
                    The gadget you're looking for seems to be out of stock in our digital inventory.
                </p>
                <Link to="/">
                    <button className="bg-white hover:bg-[#9538E2] hover:text-white border-2 hover:border-amber-50 text-[#9538E2] px-8 py-3 rounded-full font-semibold text-lg  transition-colors">
                        Return to Gadget Heaven
                    </button>
                </Link>
            </div>
        </div>
    );
};


export default ErrorPage;