import useFindUser from "../../hooks/useFindUser";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

import './HomeView.css';
import {HomeContainer} from "../../components/common/HomeContainer";

export const HomeView = () => {
    const navigate = useNavigate();
    const {user} = useFindUser();

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
    }, [user]);

    return <HomeContainer>
        <h1 className="mb-5 text-5xl font-bold">MyRealCoins</h1>
        <p className="mb-5">Uporządkuj swój budżet. Zaplanuj przyszłość. Bogać się! Korzystaj za darmo.</p>
        <NavLink to="/register">
            <button className="btn btn-primary">Zaczynamy</button>
        </NavLink>
    </HomeContainer>
};

//Photo by Tyler Franta on Unsplash