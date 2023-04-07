import React, {useContext, useEffect, useState} from "react";
import {FormProvider, useForm} from 'react-hook-form';
import {NavLink, useNavigate} from "react-router-dom";
import {Card} from "../../components/common/Card";
import useAuth from "../../hooks/useAuth";
import {showToast, Toast} from "../../utils/show-toast";
import {UserContext} from "../../contexts/user.context";
import {EmailInput} from "../../components/common/form/inputs/EmailInput";
import {PasswordInput} from "../../components/common/form/inputs/PasswordInput";

export interface LoginFormData {
    email: string;
    password: string;
}

export const LoginView = () => {
    const navigate = useNavigate();
    const {loginUser, error, setError} = useAuth();
    const {user, isLoading} = useContext(UserContext);

    const methods = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {handleSubmit} = methods;

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
        if (error) {
            showToast(Toast.Error, error);
            setError(null);
        }
    }, [error, user]);

    return <Card additionalClasses="my-10 mx-auto sm:w-[60%]  md:max-w-md py-4 px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4">Zaloguj się</h3>
        <form onSubmit={handleSubmit((data: LoginFormData) => {
            setLoading(true);
            (async () => {
                await loginUser(data);
            })();
            setLoading(false);
        })}><FormProvider {...methods}>
            <div className='py-10 mx-auto w-full '>
                <EmailInput loading={loading}/>
                <PasswordInput name="password" placeholder="Hasło" loading={loading} noPattern/>

                <div className="pt-1 flex justify-between"><span>Nie masz konta? <NavLink to="/register"
                                                                                          className="link-info">Zarejestruj
                        się</NavLink></span>
                    <NavLink to="/reset-password" className="link-info">Zresetuj hasło</NavLink>
                </div>

            </div>
        </FormProvider>
            <button type='submit' className="btn btn-primary w-full" disabled={loading || isLoading}>
                Zaloguj
            </button>
        </form>
    </Card>
};