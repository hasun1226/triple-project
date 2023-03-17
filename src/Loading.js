import React from "react";
import { BsStar } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

export default function Loading() {
    function reviewStars(n) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<BsStar key={n + i} className="star gray" />);
        }
        return stars;
    }

    return (
        <ul>
            <li>
                <div className="item">
                    <div className="pic" />
                    <div className="info">
                        <div className="name empty shorter" />
                        <div className="desc empty long" />
                        <div className="desc empty longer" />
                        <div className="ratings gray">
                            {reviewStars(1)}
                        </div>
                        <div className="like gray">
                            <FaRegHeart className="heart gray" size={25} />
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="pic" />
                    <div className="info">
                    <div className="name empty shorter" />
                        <div className="desc empty long" />
                        <div className="desc empty longer" />
                        <div className="ratings gray">
                            {reviewStars(2)}
                        </div>
                        <div className="like gray">
                            <FaRegHeart className="heart gray" size={25} />
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}