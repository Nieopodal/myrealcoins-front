import React, {useEffect} from "react";
import {themeChange} from 'theme-change';

export const ThemeChangeSelector = () => {

    const themeValues = [
        "light", "corporate", "halloween", "forest", "luxury", "night", "coffee", "cyberpunk",
    ];

    useEffect(() => {
        themeChange(false);
    }, []);

    return <select
        className="select select-bordered select-xs md:select-sm max-w-[5rem] sm:max-w-fit text-[1.5vh] appearance-none mx-1"
        data-choose-theme="">
        {themeValues.map(value => <option
            key={value.toLowerCase()}
            value={value.toLowerCase()}
            className="text-xs sm:text-sm">{value}
        </option>)}
    </select>
};