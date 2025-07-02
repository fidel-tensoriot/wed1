import React from "react";
import img2015 from "../photos/timeline/2015.png";
import img2016 from "../photos/timeline/2016.jpg";
import img2017 from "../photos/timeline/2017.JPG";
import img2018 from "../photos/timeline/2018.jpg";
import mov2018 from "../photos/timeline/MOV_2018.mp4";
import img2019 from "../photos/timeline/2019.jpg";
import img2020 from "../photos/timeline/2020.jpg";
import img2021 from "../photos/timeline/2021.jpg";
import img2022 from "../photos/timeline/2022.jpg";

function Timeline() {
    return (
        <div className="timeline">
            <div className="outer">
                {timelineData.map((timelineYear) => {
                    return (
                        <div key={timelineYear.title} className="time-card">
                            <div className="info">
                                <h3 className="title">{timelineYear.title}</h3>
                                <div className="timeline-body block md:flex">
                                    {timelineYear.img ? (
                                        <>
                                            <img
                                                src={timelineYear.img}
                                                alt=""
                                                loading="lazy"
                                            />
                                            <p className="p-4 m-auto">
                                                {timelineYear.text}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <video
                                                src={timelineYear.vid}
                                                controls
                                            ></video>
                                            <p className="p-4 m-auto">
                                                {timelineYear.text}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Timeline;

let timelineData = [
    {
        title: 2015,
        img: img2015,
        text: "A few months after meeting Karina. This photo was taken on my birthday. It was a year that we had a lot of our firsts, firsts holidays together etc.",
    },
    {
        title: 2016,
        img: img2016,
        text: "A cute date and bike ride from Los Angeles to Venice, we finally became facebook official (this was before people stopped using facebook). A lot of cool stuff this year like Disneyland for our anniversaary, your new car, moving in, and Pokemon GO ",
    },
    {
        title: 2017,
        img: img2017,
        text: "Won a little cow at the summer strawberry festival in Orange County. It was a close call between this photo or one from our Halloween Outfits, Portland Trip, or Thanksgiving in 2017",
    },
    {
        title: 2018,
        vid: mov2018,
        text: "Thanks for supporting me doing my rocker shit and countless other things",
    },
    {
        title: 2019,
        img: img2019,
        text: "Road trip down PCH with big sur in the background, we drove down to catch Duster at the SF American Music Hall. That year we had our anniversary at Knott's, Birthday in Vegas, Visited the Grand Canyon, Universal Halloween Haunt, and lots of family time(Thanksgiving in Maryland). It was really hard to pick 1 thing for this year. Also the year everyone was dissapointed with Game of Thrones",
    },
    {
        title: 2020,
        img: img2020,
        text: "Went to the neighborhood party for the unveiling of the new metro rail that will go from LAX airport down to the city. We spent a lot of time inside this year and got to focus on remodeling the house and our hobbies. This year we finally go to Yosemite after wanting to go for several years.",
    },
    {
        title: 2021,
        img: img2021,
        text: "Went on a trip to Chicago with our best friends for Riot Fest. Fun year especially Karinas 31st birthday and the Joshua Tree trip for my birthday.",
    },
    {
        title: 2022,
        img: img2022,
        text: "This year was tough with the loss of our little chihuahua but also had a lot of upsides. Cheers to 2022, excited to see what the future holds and I'm grateful for everything so far. ",
    },
    {
        title: 2025,
        vid: "https://wed-bucket-photobooth-fidel.s3.us-east-1.amazonaws.com/wedVid/weddingVideo.mp4",
        text: "Here is our wedding ceremony from July 27,2025",
    },
];
