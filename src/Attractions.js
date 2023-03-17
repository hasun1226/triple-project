import React, {useState, useCallback} from "react";
import {useTheme} from "./context/ThemeContext";
import Attraction from "./Attraction";
import NoResult from "./NoResult";
import Loading from "./Loading";
import Error from "./Error";

export default function Attractions() {
    const {data, returned, error} = useTheme();

    var components = [];
    if (returned) {
        if (data.current && !error.current) {
            if (data.current.length == 0) {
                components.push(<NoResult key="nope" />);
            } else {
                data.current.map((d, ind) => {
                    components.push(
                        <li key={d.id} id={ind}>
                            <Attraction attr={d} index={ind} />
                        </li>
                    )
                });
            }
        } else {
            components.push(<Error key="nope" />);
        }
    } else {
        components.push(<Loading key="load" />);
    }

    return (
        <div id="results">
            <ul>{components}</ul>
        </div>
    )
}