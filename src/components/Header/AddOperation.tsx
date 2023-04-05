import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";

export const AddOperation = () => {
    const { user, actualPeriod } = useContext(UserContext);

    return <div className="navbar-center lg:flex">
        {user && actualPeriod && <NavLink to="/add-operation">
            <button className="btn btn-sm md:btn md:bg-primary bg-primary text-primary-content">Dodaj<span
                className="hidden sm:inline-block">&nbsp;operację</span></button>
        </NavLink>}

        {!user && <NavLink to="/login">
            <button className="btn btn-sm md:btn md:bg-primary bg-primary text-primary-content">Zaloguj się</button>
        </NavLink>}
    </div>
};