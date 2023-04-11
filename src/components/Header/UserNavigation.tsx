import React from "react";
import {ThemeChangeSelector} from "./ThemeChangeSelector";
import {useLogout} from "../../hooks/useLogout";
import {NavLink} from "react-router-dom";
import {NewUserSvg} from "../common/Svg/NewUserSvg";
import {UserEntity} from "types";
import {UserSvg} from "../common/Svg/UserSvg";

interface Props {
    user: UserEntity | null;
}

export const UserNavigation = ({user}: Props) => {
    const {logoutUser} = useLogout();

    return <div className="navbar-end">
        <ThemeChangeSelector/>
        {!user &&
            <NavLink to="/register">
                <button className="btn btn-accent btn-sm md:btn-md hidden md:flex ml-1">Rejestracja</button>
                <button className="btn btn-ghost rounded-box md:hidden overflow-hidden"><NewUserSvg/></button>
            </NavLink>
        }

        {
            user && <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-box">
                    <UserSvg/>
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
            </div>
        }
    </div>
};