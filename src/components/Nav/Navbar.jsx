import React, { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";
function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <nav className="h-auto w-full bg-pink-200 sticky top-0 z-50 backdrop-filter backdrop-blur bg-opacity-70">
            <div className="flex justify-between items-center p-8 lg:container">
                {/* Logo */}
                <p>Logo</p>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-x-10">
                    <a href="/#">Home</a>
                    <a href="/#rsvp">RSVP</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/photobooth">Photobooth</a>
                </div>

                {/* Mobile Menu */}
                <div className={mobileMenu ? "flex" : "hidden"}>
                    <ul className="">
                        <li className="active">
                            <a href="/" className="p-4">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/#rsvp" className="p-4">
                                RSVP
                            </a>
                        </li>
                        <li>
                            <a href="/gallery" className="p-4">
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a href="/photobooth" className="p-4">
                                Photobooth
                            </a>
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
