import {useNavigate} from 'react-router-dom';
import {ApiResponse} from 'types';
import {showToast, Toast} from "../utils/show-toast";
import {useContext} from "react";
import {UserContext} from "../contexts/user.context";
import {fetchHandler} from "../utils/fetch/fetch-handler";

export const useLogout = () => {
    let navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const logoutUser = async () => {
        try {
            const res = await fetchHandler('http://localhost:3001/user/session', "DELETE");
            const data: ApiResponse<string> = await res.json();
            if (data.success) {
                showToast(Toast.Success, data.payload);
                setUser(null);
                navigate('/login', {replace: true});
            } else if (data.error) {
                showToast(Toast.Error, data.error);
            } else {
                showToast(Toast.Error, 'Wystąpił błąd.');
            }
        } catch {
            showToast(Toast.Error, 'Wystąpił błąd podczas wykonywania zapytania.');
        }
    };

    return {
        logoutUser,
    }
};