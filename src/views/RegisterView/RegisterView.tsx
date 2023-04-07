import React, {useContext, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import useAuth from "../../hooks/useAuth";
import {showToast, Toast} from "../../utils/show-toast";
import {Card} from "../../components/common/Card";
import {UserContext} from "../../contexts/user.context";
import {InputErrorMessage} from "../../components/Form/InputErrorMessage";

export interface RegisterFormData {
    name: string;
    email: string
    password: string;
    confirmPassword: string;
}

export const RegisterView = () => {
    const {register, handleSubmit, getValues, setError: setErrors, formState: {errors}} = useForm<RegisterFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const {user, isLoading} = useContext(UserContext);
    const navigate = useNavigate();
    const {registerUser, error, setError} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard', {replace: true});
        }
        if (error) {
            showToast(Toast.Error, error);
            setError(null);
        }
    }, [error, user]);

    return <Card additionalClasses="mt-10 mx-auto sm:w-[60%] md:max-w-md py-4 xl:px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4">Rejestracja</h3>
        <form onSubmit={handleSubmit((data: RegisterFormData) => {
            if (getValues("password") !== getValues("confirmPassword")) {
                setErrors("confirmPassword", {type: "validate", message: 'Podane hasła nie są identyczne.'});
                return;
            }
            setLoading(true);
            (async () => {
                await registerUser(data);
            })();
            setLoading(false);
        })}>


            <div className='py-10 mx-auto w-fit '>
                <input
                    maxLength={20}
                    placeholder="Login"
                    disabled={loading}
                    type='text'
                    className='input input-bordered w-full mb-4'
                    {...register('name')}
                    required

                />
                <input
                    placeholder="E-mail"
                    disabled={loading}
                    type='email'
                    className='input input-bordered w-full mb-4'
                    {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Podany email jest nieprawidłowy.',
                        }
                    })}
                    required
                />
                {errors?.email && <InputErrorMessage errorMessage={errors?.email.message}/>}
                <input
                    placeholder="Hasło"
                    disabled={loading}
                    type='password'
                    className='input input-bordered w-full mb-4'
                    {...register('password', {
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                            message: 'Hasło powinno składać się z 7-15 znaków, w tym przynajmniej z 1 cyfry oraz znaku specjalnego.',
                        }
                    })}
                    required
                />
                {errors?.password && <InputErrorMessage errorMessage={errors?.password.message}/>}

                <input
                    placeholder="Powtórz hasło"
                    disabled={loading}
                    type='password'
                    className='input input-bordered w-full mb-4'
                    {...register('confirmPassword', {
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                            message: 'Hasło powinno składać się z 7-15 znaków, w tym przynajmniej z 1 cyfry oraz znaku specjalnego.',
                        }
                    })}
                    required
                />
                {errors?.confirmPassword && <InputErrorMessage errorMessage={errors?.confirmPassword.message}/>}

                <div className="pt-1">Masz już konto? <NavLink to="/login" className="link-info">Zaloguj
                    się</NavLink></div>
            </div>
            <button type='submit' className="btn btn-primary w-full" disabled={loading || isLoading}>
                Zarejestruj się
            </button>
        </form>
    </Card>
};