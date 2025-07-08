import React, { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);

    const mobileMenuFalse = () => setMobileMenu(false);

    return (
        <nav className="h-auto w-full bg-pink-200 sticky top-0 z-50 backdrop-filter backdrop-blur bg-opacity-70">
            <div className="flex justify-between items-center p-8 lg:container">
                {/* Logo */}
                <p>Logo</p>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-x-10">
                    <Link to={"/"}>Home</Link>
                    {/* <a href="/#rsvp">RSVP</a> */}
                    <Link to={"/gallery"}>Gallery</Link>
                    <Link to={"/photobooth"}>Photobooth</Link>
                </div>

                {/* Mobile Menu */}
                <div className={mobileMenu ? "flex" : "hidden"}>
                    <ul className="">
                        <li className="active p-2">
                            <Link to="/" onClick={mobileMenuFalse}>
                                Home
                            </Link>
                        </li>
                        {/* <li>
                            <a
                                href="/#rsvp"
                                className="p-4"
                                onClick={mobileMenuFalse}
                            >
                                RSVP
                            </a>
                        </li> */}
                        <li className="p-2">
                            <Link to="/gallery" onClick={mobileMenuFalse}>
                                Gallery
                            </Link>
                        </li>
                        <li className="p-2">
                            <Link to="/photobooth" onClick={mobileMenuFalse}>
                                Photobooth
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Bars */}
                <div className="flex md:hidden">
                    <button onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? (
                            <FaWindowClose size={28} />
                        ) : (
                            <FaBars size={28} />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
