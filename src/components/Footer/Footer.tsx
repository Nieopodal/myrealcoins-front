import React, {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
export const Footer = () => {

    const {user} = useContext(UserContext);
    console.log(user);
    // @TODO cleanup footer
    return <>
        <footer className={`bg-neutral text-neutral-content mt-auto pt-0 ${user ? `xl:mt-10` : ''}`}>
            <div className="container mx-auto">
                <div className="footer p-10 flex justify-evenly ">
                    <div>
                        © by Nieopodal 2023
                    </div>
                </div>
            </div>
        </footer>
    </>
};