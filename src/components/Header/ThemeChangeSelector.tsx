import React, {useEffect} from "react";
import {themeChange} from 'theme-change';

export const ThemeChangeSelector = () => {

    const themeValues = [
        "dark", "light", "corporate", "halloween", "forest", "luxury", "night", "coffee", "cyberpunk",
    ];

    useEffect(() => {
        themeChange(false);
    }, []);

    return <select
        className="select-bordered select-xs md:select-sm max-w-[4rem] sm:max-w-fit text-[1vh] sm:text-[1.5vh] mx-1 select"
        data-choose-theme="">
        {themeValues.map(value => <option
            key={value.toLowerCase()}
            value={value.toLowerCase()}
            className="text-xs sm:text-sm mx-auto">{value}
        </option>)}
    </select>
};