import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {UserEntity} from "types";
import {UserContext} from "../../contexts/user.context";

interface Props {
    user: UserEntity | null;
}

export const MainHeaderBtn = ({user}: Props) => {
    const {actualPeriod} = useContext(UserContext);

    return <div className="navbar-center lg:flex">
        {user && actualPeriod && <NavLink to="/add-operation">
            <button className="btn btn-primary btn-sm md:btn-md md:flex">Dodaj<span
                className="hidden sm:inline-block">&nbsp;operację</span></button>
        </NavLink>}

        {!user && <NavLink to="/login">
            <button className="btn btn-primary btn-sm md:btn-md hidden md:flex">Zaloguj się</button>
        </NavLink>}
    </div>
};