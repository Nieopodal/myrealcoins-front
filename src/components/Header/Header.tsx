import React, {useContext} from "react";
import {MainMenu} from "./MainMenu";
import {MainHeaderBtn} from "./MainHeaderBtn";
import {UserNavigation} from "./UserNavigation";
import {UserContext} from "../../contexts/user.context";

export const Header = () => {

    const {user, isLoading} = useContext(UserContext);

    return <>
        <nav className="navbar bg-base-100 border-b-[1px] w-screen md:w-full">
            {!isLoading && <>
            <MainMenu user={user}/>
            <MainHeaderBtn user={user}/>
            <UserNavigation user={user}/>
            </>}
        </nav>
    </>
};