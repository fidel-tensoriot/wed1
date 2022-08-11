import React, { useState } from "react";
import img1 from "../photos/img1.jpg";
import img2 from "../photos/img2.jpg";
import img3 from "../photos/img3.jpg";
import p1 from "../photos/p1.jpg";
import p2 from "../photos/p2.jpg";
import Cards from "../components/Cards/Cards";
import axios from "axios";

function Home() {
    let urlPhoto = process.env.REACT_APP_PHOTO_API;
    let urlForm = process.env.REACT_APP_FORM_API;

    async function handleSubmit(event, url) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());
        console.log(values, typeof values);

        const { data } = await axios.post(url, values);
        console.log(data);
        if (data.url) {
            downloadPhotos(data.url);
        }
    }

    function downloadPhotos(downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `test.jpg`);
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
            <div className="max-h-screen overflow-hidden relative parentScroll">
                {/* Image for Mobile */}
                <h1 className="absolute md:hidden text-3xl left-20 bottom-0 bg-pink-50 opacity-80">
                    Fidelmar & Karina
                </h1>
                <img className="max-w-full md:hidden " src={img1} alt="" />

                {/* Image for Desktop */}
                <div className="absolute hidden: md:block md:top-80 2xl:left-80 text-center bg-pink-50 opacity-80">
                    <h1 className="text-3xl lg:text-7xl">Fidelmar & Karina</h1>
                    <p className="text-3xl">We the best</p>
                </div>
                <img
                    className="max-w-screen hidden md:block scroller"
                    src={img3}
                    alt=""
                />
            </div>
            <div className="text-center parentScroll">
                <div className="container flex flex-col min-h-screen justify-around gap-20">
                    <h2 className="py-8 scroller">Welcome, You're Invited</h2>
                    <p>
                        Hello friends and family! If you're looking for
                        information about the event, look no further!
                        Party/Details Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dicta laudantium eligendi itaque enim,
                        ex quo vel, deserunt sapiente quaerat assumenda tempora?
                        Laboriosam expedita, sed quaerat minus ipsa nemo
                        doloremque nobis.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus sint eos, eum sit temporibus, soluta libero, fuga
                        voluptatibus cum odio delectus. Necessitatibus, et
                        repellat inventore eveniet recusandae repudiandae
                        deserunt molestiae!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus sint eos, eum sit temporibus, soluta libero, fuga
                        voluptatibus cum odio delectus. Necessitatibus, et
                        repellat inventore eveniet recusandae repudiandae
                        deserunt molestiae!
                    </p>
                </div>
            </div>
            <section className=" min-h-screen bg-gray-50 parentScroll text-center">
                <h2 className="pt-8"> I want you here to stick to...</h2>
                <p>Click on button to to see more</p>
                <div className="grid md:flex p-8 gap-8 img-showcase scroller">
                    <Cards
                        img={img2}
                        title="Our Story"
                        body="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus sint eos, eum sit temporibus, soluta libero, fuga
                        voluptatibus cum odio delectus. Necessitatibus, et
                        repellat inventore eveniet recusandae repudiandae
                        deserunt molestiae!"
                    />
                    <Cards img={p1} title="RSVP">
                        <form
                            className="grid gap-2"
                            onSubmit={(event) => handleSubmit(event, urlForm)}
                        >
                            <div className="flex gap-2 p-4">
                                <label>Name:</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="flex gap-2 p-4">
                                <label>Email:</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Full Email"
                                />
                            </div>
                            <div className="flex gap-2 p-4">
                                <label>Notes:</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="notes"
                                    name="notes"
                                    type="text"
                                    placeholder="Hey I can't be anywhere near a peanut, allergies"
                                />
                            </div>
                            {/* <div className="flex gap-2 p-4">
                                <label>Guests:</label>
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7+ msg first</option>
                                </select>
                            </div> */}
                            <button className="p-4 bg-red-500 rounded">
                                Submit
                            </button>
                        </form>
                    </Cards>
                    <Cards
                        img={p2}
                        title="Share on Social"
                        body="Generate a Post for Instagram"
                    >
                        <form
                            onSubmit={(event) => handleSubmit(event, urlPhoto)}
                        >
                            <div className="flex gap-4">
                                <label>Name:</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Ron and Claire"
                                />
                            </div>
                            <button className="mt-4 p-4 bg-red-500 rounded">
                                Submit
                            </button>
                        </form>
                        <button
                            className=" mt-4 p-4 bg-red-500 rounded md:hidden"
                            onClick={() =>
                                window.open("instagram://story-camera")
                            }
                        >
                            Share to IG
                        </button>
                    </Cards>
                </div>
            </section>
        </>
    );
}

export default Home;
