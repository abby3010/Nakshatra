import logo from "../../images/logo.png";

const Footer = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src={logo} alt="logo" className="w-32" />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <a href="/" target="_blank"><p className="text-white text-base text-center mx-2 cursor-pointer">Home</p></a>
                    <a href="https://intublock.web.app/" target="_blank"><p className="text-white text-base text-center mx-2 cursor-pointer">All Transactions</p></a>
                    <a href="https://intublock.web.app/" target="_blank"><p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p></a>

                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Contact me on</p>
                <p className="text-white text-sm text-center"><a href="mailto:codingabby@gmail.com" target="_blank" rel="noopener noreferrer">codingabby@gmail.com</a></p>
            </div>
            <div className="sm:w[90%] w-full h-[0.25px] bg-gray-400 mt-5"></div>
            <div className="sm:w[90%] w-full flex justify-evenly items-center mt-3">
                <p className="text-white text-sm text-center">@LinkCrypt 2022</p>
                <p className="text-white text-sm text-center">All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;