import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {UserEntity} from "types";
import {UserContext} from "../../contexts/user.context";
import {HomeSvg} from "../common/Svg/HomeSvg";
import {MenuSvg} from "../common/Svg/MenuSvg";

interface Props {
    user: UserEntity | null;
}

export const MainMenu = ({user}: Props) => {
    const {actualPeriod} = useContext(UserContext);

    return <div className="navbar-start">
        {user && actualPeriod && <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost rounded-box">
                <MenuSvg/>
            </label>
            <ul tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50 fixed">
                <li><NavLink to="/dashboard">Bieżący okres</NavLink></li>
                <li><NavLink to="/operation-list">Lista operacji</NavLink></li>
                <li><NavLink to="/map">Mapa</NavLink></li>
                <li><NavLink to="/past-periods">Minione okresy</NavLink></li>
            </ul>
        </div>}

        <NavLink to={user ? '/dashboard' : '/'}
                 className={`btn btn-ghost ${user ? 'hidden' : ''} btn-sm sm:btn-md sm:inline-flex normal-case text-sm sm:text-2xl`}>
            MyRealCoins
        </NavLink>

        {user &&
            <NavLink to={user ? '/dashboard' : '/'}
                     className="inline-flex sm:hidden btn btn-ghost rounded-box">
                <HomeSvg/>
            </NavLink>
        }
    </div>
};