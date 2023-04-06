import React from "react";
import {ThemeChangeSelector} from "./ThemeChangeSelector";
import {useLogout} from "../../hooks/useLogout";
import {NavLink} from "react-router-dom";
import {NewUserSvg} from "./NewUserSvg";
import { UserEntity } from "types";

interface Props {
    user: UserEntity | null;
}

export const UserNavigation = ({user}: Props) => {
    const { logoutUser } = useLogout();

    return <div className="navbar-end">
        <ThemeChangeSelector/>
        {!user &&  <NavLink to="/register">
            <button className="btn btn-success btn-sm md:btn md:bg-success  text-success-content hidden md:flex">Rejestracja</button>
            <button className="btn btn-ghost rounded-box md:hidden overflow-hidden"><NewUserSvg/></button>
        </NavLink>}

        {user && <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                </svg>
            </label>
            <ul tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <NavLink to="/settings">Ustawienia</NavLink>
                </li>
                <li>
                    <button onClick={logoutUser}>Wyloguj</button>
                </li>
            </ul>
        </div>}
    </div>
};