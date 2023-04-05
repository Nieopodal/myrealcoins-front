import useFindUser from "../hooks/useFindUser";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Home = () => {
    const navigate = useNavigate();
    const {user} = useFindUser();

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
    },[user]);
    return <div>Hello! strona główna</div>
};