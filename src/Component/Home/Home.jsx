import Gadgets from "../Gadgets/Gadgets";
import Featured from "../Feature/Featured";
import Hero from "../Hero/Hero";

const Home = () => {
    return (
        <div className="">
            <div className="md:w-11/12 mx-auto -mt-1  bg-[#9538E2]  shadow-sm border border-x-amber-500 text-white ">
                <Hero></Hero>
                <Featured></Featured>
            </div>
            <Gadgets></Gadgets>
        </div>
    );
};

export default Home;