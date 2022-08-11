import React, { useState, useRef } from "react";

function Cards({ img, title, body, children }) {
    const [flip, setFlip] = useState(false);

    const frontElement = useRef();
    const backElement = useRef();

    // if flip is true return the backside of the card, else returrn the front of the card
    function flipCard() {
        if (flip) {
            return (
                <div className="back" ref={backElement}>
                    <h3 className="card-title">{title}</h3>
                    <p>{body}</p>
                    {children}
                </div>
            );
        } else {
            return (
                <div className="front" ref={frontElement}>
                    <h3 className="card-title">{title}</h3>
                    <img className="" src={img} alt="" />
                </div>
            );
        }
    }

    return (
        <>
            <div className={`md:w-1/3 card ${flip ? "flip" : ""}`}>
                <button className="bg-pink-400 w-full rounded py-4" onClick={() => setFlip(!flip)}>Flip Card</button>
                {flipCard()}
            </div>
        </>
    );
}

export default Cards;
