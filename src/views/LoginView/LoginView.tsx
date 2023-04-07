import React, {useContext, useEffect, useState} from "react";
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from "react-router-dom";
import {Card} from "../../components/common/Card";
import useAuth from "../../hooks/useAuth";
import {showToast, Toast} from "../../utils/show-toast";
import {UserContext} from "../../contexts/user.context";

export interface LoginFormData {
    email: string;
    password: string;
}

export const LoginView = () => {
    const navigate = useNavigate();
    const {loginUser, error, setError} = useAuth();
    const {user, isLoading} = useContext(UserContext);

    const {register, handleSubmit} = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
        if (error) {
            showToast(Toast.Error, error);
            setError(null);
        }
    }, [error, user]);

    return <Card additionalClasses="my-10 mx-auto sm:w-[60%]  md:max-w-md py-4 xl:px-2 text-xs md:text-base">
            <h3 className="card-title mx-auto w-fit pt-4">Zaloguj się</h3>
            <form onSubmit={handleSubmit((data: LoginFormData) => {
                setLoading(true);
                (async () => {
                    await loginUser(data);
                })();
                setLoading(false);
            })}>
                <div className='py-10 mx-auto w-fit '>
                    <input
                        placeholder="E-mail"
                        disabled={loading}
                        type='email'
                        className='input input-bordered w-full mb-4'
                        {...register('email')}
                        required
                    />
                    <input
                        placeholder="Hasło"
                        disabled={loading}
                        type='password'
                        className='input input-bordered w-full mb-4t'
                        {...register('password')}
                        required
                    />
                    <div className="pt-1 flex justify-between"><span>Nie masz konta? <NavLink to="/register"
                                                                                              className="link-info">Zarejestruj
                        się</NavLink></span>
                        <NavLink to="/reset-password" className="link-info">Zresetuj hasło</NavLink>
                    </div>
                </div>
                <button type='submit' className="btn btn-primary w-full" disabled={loading || isLoading}>
                    Zaloguj
                </button>
            </form>
        </Card>
};