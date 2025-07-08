import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Modal from "../components/Modal";

function PhotoBooth() {
    const [currentModalPhoto, setCurrentModalPhoto] = useState(undefined); // photo to show within the modal

    const {
        data: photoBoothPhotos,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["getPhotoBoothPhotos"],
        queryFn: fetchPhotoBooth,
    });

    // Combine all photos into a single array
    const allPhotos = useMemo(() => {
        if (photoBoothPhotos) {
            return photoBoothPhotos;
        }

        return [];
    }, [photoBoothPhotos]);

    const closeModal = () => setCurrentModalPhoto(undefined);

    async function fetchPhotoBooth() {
        const response = await axios.get(
            // "https://kbpcwneafv5carzc3qarn75riq0sdsjt.lambda-url.us-east-1.on.aws/"
            "https://r2i95qbgmk.execute-api.us-east-1.amazonaws.com/photobooth"
        );
        return response.data.photos;
    }

    return (
        <section className="mx-auto px-8">
            <h2>PhotoBooth</h2>
            {isFetching && !photoBoothPhotos && <h3>Loading...</h3>}

            {/* Photos section */}
            {photoBoothPhotos !== undefined && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:p-4">
                    {photoBoothPhotos?.map((photo, index) => (
                        <div
                            key={`photo-${index}-${photo?.url}`}
                            className="relative mt-2"
                            onClick={() => {
                                setCurrentModalPhoto(photo);
                            }}
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
                <Modal
                    closeModal={closeModal}
                    currentPhoto={currentModalPhoto.url}
                    allPhotos={allPhotos}
                    setCurrentModalPhoto={setCurrentModalPhoto}
                />
            )}
        </section>
    );
}

export default PhotoBooth;
