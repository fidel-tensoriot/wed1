import React, { useState } from "react";
import axios from "axios";
import img1 from "../photos/img1.jpg";
import img2 from "../photos/img2.jpg";
import img3 from "../photos/img3.jpg";
import p1 from "../photos/p1.jpg";
import p2 from "../photos/p2.jpg";
import Cards from "../components/Cards/Cards";
import Timeline from "../components/Timeline";

function Home() {
    const [loading, setLoading] = useState(false);
    let urlPhoto = process.env.REACT_APP_PHOTO_API;
    let urlForm = process.env.REACT_APP_FORM_API;

    async function handleSubmit(event, url) {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());
        console.log(values, typeof values);

        const { data } = await axios.post(url, values);
        console.log(data);
        if (data.url) {
            downloadPhotos(data.url);
        }
        if (url === urlForm) {
            form.reset();
        }
        setLoading(false);
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
                    <p className="text-3xl">
                        All along there was some string tying you to me
                    </p>
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
                        Karina and I will be getting married on Friday June
                        27th, 2025 in lovely Las Vegas, Nevada and would love it
                        if you'd come celebrate with us. We are excited to also
                        be getting married on our 10 year anniversary, please
                        join us as we go through our very own Eras tour of life
                        together. It's been a long time coming...
                        <br /> <br />
                        It is advised to book a hotel of your choice preferably
                        a day before and on the strip so that you do not miss
                        the ceremony or the reception- details down below. We
                        will be in Vegas the day before and after so bring
                        gambling money.
                        <br /> <br />
                        Although we love your little ones, our wedding will be
                        an adult-only celebration. Only immediate family will be
                        excluded from this rule.
                        <br /> <br />
                        <p>
                            Get ready for second breakfast as we begin this
                            journey in middle <s>earth</s> age to get the one
                            ring to rule them all.
                        </p>
                        <p>Please RSVP by January 6, 2025 </p>
                        <br /> <br />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                            <a
                                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Karina+and+Fidel+Las+Vegas+Wedding&dates=20250627T120000/20250627T170000&details=Join+us+for+our+wedding+ceremony+and+reception+in+Las+Vegas!+Ceremony+at+1pm+at+Chapel+of+the+Flowers,+reception+at+2pm+at+Maggiano's.+We+look+forward+to+celebrating+with+you!&location=1717+Las+Vegas+Blvd+S,+Las+Vegas,+NV+89104"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                            >
                                Add to Google Calendar
                            </a>
                        </button>
                    </p>
                    <p>
                        Wedding Ceremony: 12pm @
                        <a
                            href="https://www.google.com/maps?q=Chapel+of+the+Flowers,1717+Las+Vegas+Blvd+S,Las+Vegas,NV,89104"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Chapel of the Flowers
                        </a>
                        1717 Las Vegas Blvd S, Las Vegas, NV 89104
                        <br /> <br />
                        Wedding Reception: 2pm - 5pm @
                        <a
                            href="https://www.google.com/maps?q=Maggiano's,3200+Las+Vegas+Blvd+S+Suite+2144,Las+Vegas,NV,89109"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Maggiano's
                        </a>
                        3200 Las Vegas Blvd S Suite 2144, Las Vegas, NV 89109
                    </p>
                </div>
            </div>
            <section
                className=" min-h-screen bg-gray-50 parentScroll text-center"
                id="rsvp"
            >
                <h2 className="pt-8"> I want you here to stick to...</h2>
                <p>
                    Click on "Flip Card" button to to see more. RSVP IS ON
                    SECOND CARD
                </p>
                <div className="grid md:flex p-8 gap-8 img-showcase scroller">
                    <Cards
                        img={img2}
                        title="Our Story"
                        body={
                            <div className="py-12 space-y-12">
                                <p>
                                    On June 27th 2015, Karina and I met at one
                                    of our friends shows. We probably would have
                                    met eventually but we met at a warehouse in
                                    Santa Ana and then the following week at one
                                    of our mutually favorite places, Echo Park.
                                    We talked about how Karina has 3 brothers
                                    and me having 3 sisters, or our parents were
                                    from the same state of Mexico, or our dads
                                    being both mechanics. We realized very
                                    quickly that we were meant for each other.
                                </p>

                                <p>
                                    When I met Karina it was a fun time with
                                    friends and its felt that way for the past
                                    10 years. Hoping for many more and our
                                    continued growth into our future.
                                </p>
                            </div>
                        }
                    />
                    <Cards img={p1} title="Please RSVP by January 6, 2025">
                        <>
                            <p>
                                Although we love your little ones our wedding
                                will be an adult-only celebration. Only
                                immediate family will be excluded from this rule
                            </p>
                            <form
                                className="grid gap-2"
                                onSubmit={(event) =>
                                    handleSubmit(event, urlForm)
                                }
                            >
                                <div className="flex gap-2 p-4">
                                    <label>Name:</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        required={true}
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
                                        required={true}
                                    />
                                </div>
                                <div className="flex gap-2 p-4">
                                    <label>Notes:</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="notes"
                                        name="notes"
                                        type="text"
                                        placeholder="Hey I can't be near peanuts, allergies or im vegan etc"
                                    />
                                </div>
                                <div className="flex gap-2 p-4">
                                    <label>Address:</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="1234 W Fake St, Los Angeles CA 90001 Apt#1"
                                    />
                                </div>
                                <div className="flex gap-2 p-4">
                                    <label>
                                        Favorite Taylor Swift Era/Song:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="swiftNote"
                                        name="swiftNote"
                                        type="text"
                                        placeholder="Reputation Era"
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
                                {loading ? (
                                    <p>Sending...</p>
                                ) : (
                                    <button className="p-4 bg-red-500 rounded">
                                        Submit
                                    </button>
                                )}
                            </form>
                        </>
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
                                    required={true}
                                />
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <button className="mt-4 p-4 bg-red-500 rounded">
                                    Submit
                                </button>
                            )}
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
            <section className=" min-h-screen bg-pink-50 text-center">
                <Timeline />
            </section>
        </>
    );
}

export default Home;
