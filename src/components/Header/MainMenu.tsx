import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";
import {HomeSvg} from "./HomeSvg";

export const MainMenu = () => {
    const {user, actualPeriod} = useContext(UserContext);

    return <div className="navbar-start">
        {user && actualPeriod &&  <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost rounded-box">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
            </label>
            <ul tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50 fixed">
                <li><NavLink to="/dashboard">Bieżący okres</NavLink></li>
                <li><NavLink to="/operation-list">Lista operacji</NavLink></li>
                <li><NavLink to="/map">Mapa</NavLink></li>
                <li><NavLink to="/past-periods">Minione okresy</NavLink></li>
                <li>
                    <button>Konfiguracja budżetu</button>
                </li>
            </ul>
        </div>}
        <NavLink to={user ? '/dashboard' : '/'}
                 className={`btn btn-ghost ${user ? 'hidden' : ''} sm:inline-flex normal-case text-sm sm:text-2xl`}>MyRealCoins</NavLink>
        {user && <button className="inline-flex sm:hidden btn btn-ghost rounded-box"><HomeSvg/></button>}
    </div>
};