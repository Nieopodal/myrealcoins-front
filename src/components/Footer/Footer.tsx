import React, {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {NavLink} from "react-router-dom";

export const Footer = () => {
    const {user} = useContext(UserContext);

    return <footer className={`Footer bg-neutral text-neutral-content mb-0 pt-0 ${user ? `xl:mt-10` : ''}`}>
        <div className="container mx-auto">
            <div className="footer p-10 flex justify-evenly ">
                <div className="flex">
                    © by Nieopodal 2023
                    <NavLink to="/about" className="hover:underline">About</NavLink>
                </div>
            </div>
        </div>
    </footer>
};