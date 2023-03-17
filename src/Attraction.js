import React, {useState} from "react";
import {useTheme} from "./context/ThemeContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Attraction({attr, index}) {
    const {data, param} = useTheme();
    const [liked, setLiked] = useState(attr.like.isLiked);

    function getHighlightedText(text) {
        var ind = text.indexOf(param.current);
        var len = param.current.length;
        const chunk = [text.slice(0, ind), 
                    text.slice(ind, ind+len), 
                    text.slice(ind+len)];
        var blue = {color: "#0065D0"};
        var components = [];
        chunk.map((ch, i) => {
            let keyName =  index + "_" + i;
            if (i == 1) {
                components.push(<strong key={keyName} style={blue}>{ ch }</strong>);
            } else if (ch.length > 0) {
                components.push(<span key={keyName}>{ ch }</span>);
            }
        })
        return components;
    }

    function reviewStars(props) {
        const stars = [];
        var id = props.id;
        var num = props.reviews.averageRating;
        var ratings = Math.ceil(num*2)/2;
        var fill = Math.floor(ratings);
    
        for (let i = 0; i < fill; i++) {
            stars.push(<BsStarFill key={id + "_" + i} className="star yellow" role="img" src="fill-star.svg" />);
        }
        if (ratings - fill != 0) {
            stars.push(<BsStarHalf key={id + "_half"} className="star yellow" role="img" src="half-fill-star.svg" />);
            fill++;
        }
        for (let i = fill; i < 5; i++) {
            stars.push(<BsStar key={id + "_" + i} className="star gray" role="img" src="line-star.svg" />);
        }
        return stars;
    }
    
    function reviewCount(num) {
        return (num > 99) ? "99+" : num;
    }
    
    function likeCount(num) {
        return (num > 999) ? "999+" : num;
    }

    function doLike(e) {
        fetch("/api/attractions/" + attr.id + "/like", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isLiked: true })
        }).then((res) => {
            if (res.status == 204 || res.ok) {
                data.current[index].like.isLiked = true;
                data.current = [...data.current];
                setLiked(!liked);
            }
        }, (error) => {
            console.error("error!");
        });
    }
    
    function doUnlike(e) {
        fetch("/api/attractions/" + attr.id + "/like", { 
            method: 'DELETE' 
        }).then((res) => {
            if (res.status == 204 || res.ok) {
                data.current[index].like.isLiked = false;
                data.current = [...data.current];
                setLiked(!liked);
            }
        }, (error) => {
            console.error("error!");
        });
    }

    function handleClick(e) {
        return liked ? doUnlike(e) : doLike(e);
    }

    return (
        <div className="item">
            <img src={attr.coverImageUrl} className="pic" alt={`${attr.name} 썸네일`} />
            <div className="info">
                <p className="name">{getHighlightedText(attr.name)}</p>
                <p className="desc">{attr.description}</p>
                <div className="ratings gray" title={`평균 ${attr.reviews.averageRating}점, ${attr.reviews.count}개의 리뷰`}>
                    {reviewStars(attr)}
                    ({reviewCount(attr.reviews.count)})
                </div>
                <div className="like gray" role="button" title={`${attr.like.count}개의 좋아요`} onClick={handleClick}>
                    {likeCount(attr.like.count)}
                    {liked ? <FaHeart className="heart red" size={25} role="img" src="fill-heart.svg" /> : 
                            <FaRegHeart className="heart gray" size={25} role="img" src="line-heart.svg" />}
                </div>
            </div>
        </div>
    )
}