import React from "react";
import note from "../../../src/assets/note.png";
import { Link } from "react-router-dom";

function Card({$id, title, content}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="card w-80 shadow-xl flex flex-col justify-center items-center p-4 rounded-lg">
            <img src={note} alt='note-img' className="w-[20%]" />
            <h3 className="text-2xl font-bold py-7 capitalize text-center">
                {title}
            </h3>
            <p className="text-center pb-7 mx-7">
                {content}
            </p>
            <button className="py-2 px-3 w-full font-semibold bg-[#fd366e] rounded-lg text-white">
                Get -&gt;
            </button>
            </div>
        </Link>
    );
}

export default Card;