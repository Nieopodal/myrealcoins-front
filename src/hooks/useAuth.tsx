import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../contexts/user.context';
import {RegisterFormData} from "../views/RegisterView/RegisterView";
import {ApiResponse, PeriodEntity, UserEntity} from 'types';
import {LoginFormData} from "../views/LoginView/LoginView";
import {showToast, Toast} from "../utils/show-toast";

export default function useAuth() {
    const navigate = useNavigate();
    const {setUser, setActualPeriod} = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    //set user in context and push them home

    const setUserContext = async () => {
        try {
            const res = await fetch('http://localhost:3001/user/check-user', {
                credentials: 'include',
            });

            const responseData: ApiResponse<{
                user: UserEntity,
                actualPeriod: PeriodEntity,
            }> = await res.json();
            if (responseData.success) {
                setUser(responseData.payload.user);
                setActualPeriod(responseData.payload.actualPeriod);
                // console.log('responseData,', responseData.payload)
                navigate('/dashboard', {replace: true});
            } else if (responseData.error) {
                setError(responseData.error);
            } else {
                setError('Wystąpił błąd podczas logowania.');
            }
        } catch (e) {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        }
    };

//register user
    const registerUser = async (data: RegisterFormData) => {

        try {
            const res = await fetch('http://localhost:3001/user/signup', {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            });

            const responseData: ApiResponse<string> = await res.json();

            if (responseData.success) {
                showToast(Toast.Info, responseData.payload);
                navigate('/', {replace: true});
            } else if (responseData.error) {
                setError(responseData.error);
            } else {
                setError('Wystąpił błąd podczas logowania.');
            }
        } catch (e) {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        }
    };

    const loginUser = async (data: LoginFormData) => {
        try {
            const res = await fetch('http://localhost:3001/user/session', {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            });

            const responseData: ApiResponse<UserEntity> = await res.json();

            if (responseData.success) {
                console.log(responseData.payload)
                await setUserContext();
            } else if (responseData.error) {
                setError(responseData.error);
            } else {
                setError('Wystąpił błąd podczas logowania.');
            }
        } catch (e) {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        }
    };

    return {
        registerUser,
        loginUser,
        error,
        setError,
    }
};