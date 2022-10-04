import React from "react";

function Gallery() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());
        console.log("yolo 1", values, typeof values);
    }

    return (
        <section className="mx-auto">
            <h2>Gallery</h2>
            <p>
                This page allows users to upload photos and share them with
                everyone. You will need to verify your email address that you
                used to RSVP, once confirmed you will hve the option to upload
                photos.{" "}
            </p>
            <form
                className="grid gap-2 mt-8 md:flex items-center"
                onSubmit={(event) => handleSubmit(event)}
            >
                <label>Enter Your Email:</label>
                <input
                    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required={true}
                />
                <label className="md:ml-12">Select Your Files:</label>
                <input
                    className=" text-gray-700 bg-clip-padding rounded transition ease-in-out"
                    id="file"
                    name="file"
                    type="file"
                    placeholder="Select photos to upload"
                    required={true}
                    multiple
                />
                <button className="p-4 bg-red-500 rounded">Submit</button>
            </form>

            <p>TODO- create a lambda that takes POST,PUT,GET. POST verifies if user is in the table, if so allows to upload files to s3. GET just gets all photos, F/E would organize photos by email.</p>
        </section>
    );
}

export default Gallery;
