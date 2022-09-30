import React from "react";
import img2015 from "../photos/timeline/2015.png";
import img2016 from "../photos/timeline/2016.jpg";
import img2017 from "../photos/timeline/2017.JPG";
import img2018 from "../photos/timeline/2018.jpg";
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
                        <div className="time-card">
                            <div className="info">
                                <h3 className="title">{timelineYear.title}</h3>
                                <div className="timeline-body block md:flex">
                                    <img src={timelineYear.img} alt="" />
                                    <p className="p-4 m-auto"> {timelineYear.text} </p>
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
        text: "A few months after meeting Karina. This was on my birthday",
    },
    {
        title: 2016,
        img: img2016,
        text: "A cute date and bike ride from Los Angeles to Venice ",
    },
    {
        title: 2017,
        img: img2017,
        text: "Won a little cow at the summer strawberry festival in Orange County",
    },
    {
        title: 2018,
        img: "",
        text: "Thanks for supporting me doing my rocker shit",
    },
    {
        title: 2019,
        img: img2019,
        text: "Road trip down PCH with big sur in the background",
    },
    {
        title: 2020,
        img: img2020,
        text: "Went to the neighborhood party for the unveiling of the new metro rail that will go from LAX airport down to the city. ",
    },
    {
        title: 2021,
        img: img2021,
        text: "Went on a trip to Chicago with our best friends for Riot Fest",
    },
    {
        title: 2022,
        img: img2022,
        text: "Cheers to 2022, excited to see what the future holds and I'm grateful for everything so far. ",
    },
];
