import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

function PhotoBooth() {
    const [loading, setLoading] = useState(false); // Loading state
    const [gallery, setGallery] = useState(undefined); // State to hold image URLs should be undefined when empty
    const [currentModalPhoto, setCurrentModalPhoto] = useState(undefined); // photo to show within the modal

    // Combine all photos into a single array
    const allPhotos = useMemo(() => {
        if (gallery) {
            return gallery;
        }

        return [];
    }, [gallery]);

    const closeModal = () => setCurrentModalPhoto(undefined);

    function handleNextPhotoClick() {
        // const currentIndex = allPhotos.indexOf(currentModalPhoto);
        const currentIndex = allPhotos.findIndex(
            (item) => item.url === currentModalPhoto.url
        );
        const nextIndex = (currentIndex + 1) % allPhotos.length; // Wraps around
        setCurrentModalPhoto(allPhotos[nextIndex]);
    }

    function handlePrevPhotoClick() {
        // const currentIndex = allPhotos.indexOf(currentModalPhoto);
        const currentIndex = allPhotos.findIndex(
            (item) => item.url === currentModalPhoto.url
        );
        const prevIndex =
            (currentIndex - 1 + allPhotos.length) % allPhotos.length; // Wraps around
        setCurrentModalPhoto(allPhotos[prevIndex]);
    }

    async function fetchPhotoBooth() {
        setLoading(true);

        try {
            const response = await axios.get(
                "https://kbpcwneafv5carzc3qarn75riq0sdsjt.lambda-url.us-east-1.on.aws/"
            );
            setGallery(response.data.photos); // Update gallery state with fetched photos

            console.log("fetched gallery:", response.data);
        } catch (error) {
            console.error("Error fetching gallery:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPhotoBooth();
    }, []);

    return (
        <section className="mx-auto px-8">
            <h2>PhotoBooth</h2>
            {loading && <h3>Loading...</h3>}
            {gallery !== undefined && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:p-4">
                    {gallery?.map((photo, index) => (
                        <div
                            key={`photo-${index}-${photo?.url}`}
                            className="relative mt-2"
                            onClick={() => setCurrentModalPhoto(photo)}
                        >
                            <img
                                src={photo?.url}
                                alt={`${photo?.url} - ${index}`}
                                className="rounded shadow-md max-w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Section */}
            {currentModalPhoto && (
                <Modal closeModal={closeModal}>
                    <img
                        src={currentModalPhoto.url}
                        className="w-full h-auto max-w-full max-h-[75vh] object-contain"
                        alt={`img  ${currentModalPhoto.url}`}
                    />
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
                </Modal>
            )}
        </section>
    );
}

export default PhotoBooth;
