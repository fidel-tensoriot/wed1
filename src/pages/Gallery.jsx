import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal";
import { useQuery } from "@tanstack/react-query";

function Gallery() {
    const [currentModalPhoto, setCurrentModalPhoto] = useState(undefined); // photo to show within the modal
    const [submittingFiles, setSubmittingFiles] = useState(false);

    const {
        data: galleryPhotos,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["getGalleryPhotos"],
        queryFn: fetchGallery,
    });

    // Combine all photos into a single array
    const allPhotos = useMemo(() => {
        if (galleryPhotos) {
            return Object.entries(galleryPhotos).flatMap(([user, photos]) =>
                photos.map((url) => ({ user, url }))
            );
        }
        return [];
    }, [galleryPhotos]);

    const closeModal = () => setCurrentModalPhoto(undefined);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmittingFiles(true);

        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());
        console.log("value", values, typeof values);

        const files = formData.getAll("file");
        console.log("Selected Files:", files); // Array of File objects

        if (!files || files.length === 0) {
            alert("No Files Selected. Please try again");
            setSubmittingFiles(false);
            return;
        }

        // Convert each file to base64
        // const filesWithBase64 = await Promise.all(
        //     files.map((file) => {
        //         return new Promise((resolve, reject) => {
        //             const reader = new FileReader();
        //             reader.onload = () => {
        //                 resolve({
        //                     name: file.name,
        //                     size: file.size,
        //                     type: file.type,
        //                     data: reader.result.split(",")[1], // Get base64 string
        //                 });
        //             };
        //             reader.onerror = (error) => reject(error);
        //             reader.readAsDataURL(file);
        //         });
        //     })
        // );

        // // Prepare payload
        const payload = {
            name: values.name,
            description: values.desc,
            // files: files.map((file) => ({
            //     name: file.name,
            //     size: file.size,
            //     type: file.type,
            // })),
            // files: filesWithBase64, // Use files with base64 data
            files: files.map((file) => ({
                name: file.name,
                type: file.type || "application/octet-stream",
            })),
        };

        // Submit payload using Axios
        try {
            const response = await axios.post(
                "https://ucvaqlgpu4pvjacb3xx5z43ryi0ujnun.lambda-url.us-east-1.on.aws/",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            await Promise.all(
                files.map((file, index) => {
                    const url = response.data.urls[index].url;
                    return axios.put(url, file, {
                        headers: {
                            "Content-Type": file.type,
                        },
                    });
                })
            );

            console.log("Upload successful:", response.data);
            event.target.reset();
        } catch (error) {
            console.error("Error uploading:", error);
        } finally {
            setSubmittingFiles(false);
        }
    }

    async function fetchGallery() {
        const response = await axios.get(
            "https://ucvaqlgpu4pvjacb3xx5z43ryi0ujnun.lambda-url.us-east-1.on.aws/"
        );
        return response.data.photos;
    }

    return (
        <section className="mx-auto px-8">
            <h2>Gallery</h2>
            {/* Section for upload */}
            <>
                <p>
                    This page allows users to upload photos and share them with
                    everyone. You can add your name and a description and share
                    the photo publicly for everyone to view.
                </p>
                <form
                    className="grid gap-2 mt-8 lg:flex items-center justify-center"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <div className="flex flex-col gap-2 py-4">
                        <label>Enter Your Name:</label>
                        <input
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            required={true}
                        />
                        {/* <label>Enter an optional description or tag:</label>
                        <input
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="desc"
                            name="desc"
                            type="text"
                            placeholder="Boys are back in town"
                        /> */}
                    </div>
                    <label className="md:ml-12">Select Your Files:</label>
                    <input
                        accept="image/*, video/*"
                        className=" text-gray-700 bg-clip-padding rounded transition ease-in-out"
                        id="file"
                        name="file"
                        type="file"
                        placeholder="Select photos to upload"
                        required={true}
                        multiple
                    />
                    <button
                        type="submit"
                        className={`p-4 rounded ${
                            submittingFiles
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500"
                        }`}
                        disabled={submittingFiles}
                    >
                        {submittingFiles ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </>

            {/* Uploaded photos section */}
            <>
                <h2 className="mt-8">Uploaded Photos</h2>
                {isFetching && !galleryPhotos && <h3>Loading...</h3>}
                {galleryPhotos !== undefined && (
                    <div>
                        {Object.keys(galleryPhotos).map((key, index) => (
                            <div key={index} className="">
                                <h2>{key}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:p-4">
                                    {galleryPhotos[key]?.map(
                                        (url, photoIndex) => (
                                            <div
                                                key={`photo-${index}-${photoIndex}`}
                                                className="relative mt-2"
                                                onClick={() =>
                                                    setCurrentModalPhoto({
                                                        user: key,
                                                        url,
                                                    })
                                                }
                                            >
                                                {url.endsWith(".mp4") ||
                                                url.endsWith(".mov") ? (
                                                    <video
                                                        src={url}
                                                        controls
                                                        className="rounded shadow-md max-w-full h-auto"
                                                    />
                                                ) : (
                                                    <img
                                                        src={url}
                                                        alt={`Uploaded by ${key} - ${photoIndex}`}
                                                        className="rounded shadow-md max-w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>

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

export default Gallery;
