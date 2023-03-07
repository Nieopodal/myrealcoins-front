import React from "react";
import {NavLink} from "react-router-dom";

export const AddOperation = () => (
    <div className="navbar-center lg:flex">
        <NavLink to="/add-operation"><button className="btn btn-sm md:btn md:bg-primary bg-primary text-primary-content">Dodaj<span className="hidden sm:inline-block">&nbsp;operację</span></button>
</NavLink>
    </div>
);