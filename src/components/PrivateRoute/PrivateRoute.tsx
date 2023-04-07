import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import ThreeDots from "../common/Loader";
import {UserContext} from "../../contexts/user.context";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
};

export const PrivateRoute = ({outlet}: ProtectedRouteProps) => {
    const {user, isLoading} = useContext(UserContext);

    if (isLoading) {
        return <ThreeDots/>
    }
    if (user) {
        return outlet;
    } else {
        return <Navigate to={{pathname: '/login'}}/>;
    }
};