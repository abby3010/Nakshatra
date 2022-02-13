import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from "../../images/logo.png";
import React from 'react';

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

const Navbar = () => {

    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-intial justify-center items-center">
                <img src={logo} className="w-48 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">

                <a href="/">
                    <NavbarItem title="Home" />
                </a>

                <a href="/alltransactions">
                    <NavbarItem title="All Transactions" />
                </a>

                <a href="https://intublock.web.app/" target="_blank">
                    <NavbarItem title="Blockchain Tool" />
                </a>

                <a href="https://codingabby.com/contact" target="_blank">
                    <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        Contact
                    </li>
                </a>
            </ul>
            <div className="flex relative">
                {
                    toggleMenu ?
                        <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} /> :
                        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                }

                {
                    toggleMenu && (
                        <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                            flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in
                        ">
                            <li className="text-xl w-full my-2">
                                <AiOutlineClose className="text-white" onClick={() => setToggleMenu(false)} />
                            </li>
                            <a href="/">
                                <NavbarItem title="Home" classProps="my-2 text-lg" />
                            </a>
                            <a href="/alltransactions">
                                <NavbarItem title="All Transactions" classProps="my-2 text-lg" />
                            </a>
                            <a href="https://intublock.web.app/" target="_blank">
                                <NavbarItem title="Tutorials" classProps="my-2 text-lg" />
                            </a>
                            <a href="https://codingabby.com/contact" target="_blank">
                                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                    Contact
                                </li>
                            </a>
                        </ul>
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar