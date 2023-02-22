import React from "react";
import {MainMenu} from "./MainMenu";
import {AddOperation} from "./AddOperation";
import {UserNavigation} from "./UserNavigation";

export const Header = () => {
    return <>
        <nav className="navbar bg-base-100 border-b-[1px] border-base-200 w-screen md:w-full">
            <MainMenu/>
            <AddOperation/>
            <UserNavigation/>
        </nav>
    </>
};