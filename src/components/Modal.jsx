import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export default function Modal({
    closeModal,
    currentPhoto,
    allPhotos,
    setCurrentModalPhoto,
    children,
}) {
    function handleNextPhotoClick() {
        // const currentIndex = allPhotos.indexOf(currentModalPhoto);
        const currentIndex = allPhotos.findIndex(
            (item) => item.url === currentPhoto
        );
        const nextIndex = (currentIndex + 1) % allPhotos.length; // Wraps around
        setCurrentModalPhoto(allPhotos[nextIndex]);
    }

    function handlePrevPhotoClick() {
        // const currentIndex = allPhotos.indexOf(currentModalPhoto);
        const currentIndex = allPhotos.findIndex(
            (item) => item.url === currentPhoto
        );
        const prevIndex =
            (currentIndex - 1 + allPhotos.length) % allPhotos.length; // Wraps around
        setCurrentModalPhoto(allPhotos[prevIndex]);
    }

    const isThumbnail = currentPhoto.includes("Thb/");
    const imgToShow = isThumbnail
        ? currentPhoto?.replace("Thb/", "Color/")
        : currentPhoto;

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
                    {/* {children} */}
                    {currentPhoto?.endsWith(".mp4") ||
                    currentPhoto?.endsWith(".mov") ? (
                        <video
                            src={currentPhoto}
                            controls
                            className="w-full h-auto max-w-full max-h-[75vh] object-contain"
                        />
                    ) : (
                        <img
                            src={imgToShow}
                            alt={`img ${imgToShow}`}
                            className="w-full h-auto max-w-full max-h-[75vh] object-contain"
                        />
                    )}

                    {/* Buttons left and right on modal */}
                    <button
                        onClick={() => handlePrevPhotoClick()}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl z-10 p-2 md:p-8 bg-black opacity-60"
                    >
                        ◀
                    </button>
                    <button
                        onClick={() => handleNextPhotoClick()}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl z-10 p-2 md:p-8 bg-black opacity-60"
                    >
                        ▶
                    </button>
                </div>
            </div>
        </>
    );
}
