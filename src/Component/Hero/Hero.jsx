import { Link } from 'react-router-dom';
import Gadget from '../Gadgets/Gadget';
import './Hero.css'
const Hero = () => {
    return (
        <div className="hero min-h-[30vh] pb-10 ">
            <div className="hero-content text-center">
                <div className="md:w-11/12 space-y-4">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mx-auto">Upgrade Your Tech Accessorize with Gadget Heaven Accessories</h1>
                    <p className="md:text-base text-xs py-6 md:w-10/12 mx-auto">
                        Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
                    </p>
                    <a href='#GadetsSection' className="btn btn-1 rounded-full  px-8 py-6 ">Shop Now</a>
                </div>
            </div>
        </div>
    );
};

export default Hero;