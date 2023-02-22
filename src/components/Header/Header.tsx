import React from "react";

export const Header = () => {
    return <>
        <nav className="navbar bg-base-100 border-b-[1px] border-base-200 w-screen md:w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button>Bieżący okres</button></li>
                        <li><button>Archiwum</button></li>
                        <li><button>Mapa</button></li>
                        <li><button>Konfiguracja budżetu</button></li>
                    </ul>
                </div>
                <button className="btn btn-ghost hidden sm:inline-flex normal-case text-sm sm:text-2xl">MyRealCoins</button>
                <button className="inline-flex sm:hidden">Ikonka!</button>
            </div>

            <div className="navbar-center lg:flex">

                <button className="btn btn-xs md:btn md:bg-primary bg-primary text-primary-content">Dodaj operację</button>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>



                    </label>
                    <ul tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button>Ustawienia profilu</button></li>
                        <li><button>Wyloguj</button></li>
                    </ul>
                </div>

            </div>
        </nav>
    </>
};