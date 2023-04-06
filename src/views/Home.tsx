import useFindUser from "../hooks/useFindUser";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import './Home.css';

export const Home = () => {
    const navigate = useNavigate();
    const {user} = useFindUser();

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
    }, [user]);

    return <div className="hero min-h-screen bg">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">MyRealCoins</h1>
                <p className="mb-5">Uporządkuj swój budżet. Zaplanuj przyszłość. Bogać się! Korzystaj za darmo.</p>
                <NavLink to="/register">
                    <button className="btn btn-primary">Zaczynamy</button>
                </NavLink>
            </div>
        </div>
    </div>
};

//Photo by Tyler Franta on Unsplash