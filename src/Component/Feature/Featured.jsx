import featuredImage from "../../assets/Images/banner.jpg"
import './Featured.css'
const Featured = () => {
    return (
        <div className="  mx-auto px-4 py-20 md:py-25">




            {/* Image Section */}
            <div className="w-full mx-auto md:w-7/12 lg:w-5/12  relative flex items-center justify-center px-6  md:px-10 ">
                <div className="absolute -top-20 ">
                    {/* Main floating image */}
                    <img
                        src={featuredImage}
                        alt="Tech accessories"
                        className="floating rounded-2xl shadow-2xl w-full"
                    />

                    {/* Floating elements */}
                    <div className="absolute -top-5 -left-5 floating" style={{ animationDelay: '0.5s' }}>
                        <div className="bg-purple-600 rounded-lg p-2 shadow-lg">
                            <i className="fas fa-headphones text-white text-2xl"></i>
                        </div>
                    </div>

                    <div className="absolute -bottom-5 -right-5 floating" style={{ animationDelay: '1s' }}>
                        <div className="bg-blue-500 rounded-lg p-2 shadow-lg">
                            <i className="fas fa-microchip text-white text-2xl"></i>
                        </div>
                    </div>

                    <div className="absolute top-1/3 -right-8 floating" style={{ animationDelay: '1.5s' }}>
                        <div className="bg-green-500 rounded-lg p-2 shadow-lg">
                            <i className="fas fa-mobile-alt text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Font Awesome for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </div>

    );
};

export default Featured;