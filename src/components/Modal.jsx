import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export default function Modal({ closeModal, children }) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-5">
                <div className="relative w-full max-w-7xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg">
                    {/* Close Icon */}
                    <div className="flex justify-end p-4">
                        <button onClick={closeModal} className="">
                            <FaWindowClose size={28} />
                        </button>
                    </div>

                    {/* Body inherited from parent */}
                    {children}
                </div>
            </div>
        </>
    );
}
