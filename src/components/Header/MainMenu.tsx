import React from "react";
import {NavLink} from "react-router-dom";

export const MainMenu = () => (
    <div className="navbar-start">
        <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50 fixed">
                <li><NavLink to="/">Bieżący okres</NavLink></li>
                <li><NavLink to="/operation-list">Lista operacji</NavLink></li>
                <li><NavLink to="/map">Mapa</NavLink></li>
                <li><button>Archiwum</button></li>
                <li><button>Konfiguracja budżetu</button></li>
            </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost hidden sm:inline-flex normal-case text-sm sm:text-2xl">MyRealCoins</NavLink>
        <button className="inline-flex sm:hidden">Ikonka!</button>
        {/*@TODO add app icon*/}
    </div>
);