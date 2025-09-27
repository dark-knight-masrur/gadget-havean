import './footer.css'
const Footer = () => {
    return (
        <div className="  space-y-10 mt-60">
            <div className=" text-center space-y-3">
                <h1 className="text-4xl">Gadget Heaven</h1>
                <p className="text-xs">Leading the way in cutting-edge technology and innovation.</p>

            </div>
            <div className='text-center'>
                <footer className="w-full md:w-10/12 lg:w-8/12 mx-auto grid  grid-cols-3 md:gap-6 py-6 md: p-12">
                    <nav>
                        <h6 className="footer-title ">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav className=''>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;