import { useEffect, useState } from "react";
import Gadget from "./Gadget";

const Gadgets = () => {
    const buttons =
        <>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">All product</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">Laptop</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">phone</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">Accesories</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">Smart Watch</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">MAC Book</button>
            <button className="btn broder border-[#9538E2] hover:bg-[#9538E2]  text-[#9538E2] hover:text-white rounded-full">Iphone</button>
        </>


    const [gadgets, setGadgets] = useState([])
    useEffect(() => {
        fetch('gadgets.json')
            .then(res => res.json())
            .then(data => {
                setGadgets(data),
                    console.log(data)
            }
            )

    }, [])
    return (
        <div className="mt-96" id="GadetsSection">
            <h1 className="font-bold text-3xl text-center py-20">Explore Cutting-Edge Gadgets</h1>
            <div className="mx-auto md:w-10/12 md:flex  gap-10 ">

                <div className="card  w-56 shadow-sm h-[50vh] p-10 space-y-5">
                    {buttons}

                </div>
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 ">
                    {gadgets.map((gadget, index) => <Gadget index={index} key={gadget.id} gadget={gadget}></Gadget>)}

                </div>
            </div>
        </div>
    );
};

export default Gadgets;