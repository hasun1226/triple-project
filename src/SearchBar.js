import React, {useEffect, useState, useRef} from "react";
import {useTheme} from "./context/ThemeContext";
import { GoSearch } from "react-icons/go";
import {MdOutlineCancel} from "react-icons/md";

export default function SearchBar() {
    const {data, returned, setReturned, param, error} = useTheme();
    const [input, setInput] = useState("");
    const prevInput = useRef("");
    const searchFlag = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            var search = document.getElementById("search");
            var results = document.getElementById("results");
            if (search.getBoundingClientRect().bottom > results.getBoundingClientRect().top) {
                search.classList.add('shadow');
            } else {
                search.classList.remove('shadow');
            }
        }

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!returned) {
            doSearch();
        } else {
            const delay = setTimeout(() => {
                let trimmed = input.trim();
                if (prevInput.current != trimmed || searchFlag.current) {
                    doSearch();
                }
                prevInput.current = trimmed;
            }, 500);
            return () => clearTimeout(delay);
        }
    }, [input]);

    async function doSearch() {
        param.current = input;
        var url = (input != null && input.trim() != '') ?
            `/api/attractions?query=${encodeURIComponent(input)}` :
            '/api/attractions';
        setReturned(false);
        
        await fetch(url)
        .then(res => res.json())
        .then(res => {
            data.current = res;
        }).catch(err => {
            error.current = err;
        });

        setReturned(true);
    }

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value.toLowerCase());
    }

    function handleKeyUp(e) {
        if (e.key === 'Enter' && input !== prevInput.current) {
            doSearch();
        }
        if (e.key === 'Backspace' || e.keyCode === 32) {
            searchFlag.current = input.trim() == "" ? false : true;
        }
    }

    function eraseAll() {
        setInput("");
    }

    return (
        <div id="search" role="search">
            <GoSearch id="searchIcon" />
            <input type="text" 
                value={input} 
                role="searchbox"
                onChange={handleChange} 
                onKeyUp={handleKeyUp} 
                placeholder="검색" />
            {(input.length > 0) &&
                <MdOutlineCancel id="cancelIcon" onClick={eraseAll} role="button" />}
        </div>
    );
}