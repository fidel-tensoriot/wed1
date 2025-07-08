import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Modal from "../components/Modal";

function Secret() {
    const [currentModalPhoto, setCurrentModalPhoto] = useState(undefined); // photo to show within the modal

    const { data: secretPhotos, isFetching } = useQuery({
        queryKey: ["getSecretPhotos"],
        queryFn: fetchSecretPhotos,
    });

    // Combine all photos into a single array
    const allPhotos = useMemo(() => {
        if (secretPhotos) {
            return secretPhotos;
        }

        return [];
    }, [secretPhotos]);

    const closeModal = () => setCurrentModalPhoto(undefined);

    async function fetchSecretPhotos() {
        const response = await axios.get(
            "https://r2i95qbgmk.execute-api.us-east-1.amazonaws.com/secret"
        );
        return response.data;
    }

    return (
        <>
            <section className="mx-auto px-8">
                <h2>Secret Page</h2>
                {isFetching && !secretPhotos && <h3>Loading...</h3>}
                <p>Secret page used to share photos from the photographer</p>

                {/* Photos section */}
                {secretPhotos !== undefined && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:p-4">
                        {secretPhotos?.map((photo, index) => (
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
        </>
    );
}

export default Secret;
