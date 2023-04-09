import React, {useContext, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from 'react-hook-form';
import useAuth from "../../hooks/useAuth";
import {showToast, Toast} from "../../utils/show-toast";
import {UserContext} from "../../contexts/user.context";
import {InputErrorMessage} from "../../components/common/form/InputErrorMessage";
import {EmailInput} from "../../components/common/form/inputs/EmailInput";
import {NameInput} from "../../components/common/form/inputs/NameInput";
import {PasswordInput} from "../../components/common/form/inputs/PasswordInput";
import {SmallCard} from "../../components/common/Card/SmallCard";

export interface RegisterFormData {
    name: string;
    email: string
    password: string;
    confirmPassword: string;
}

export const RegisterView = () => {
    const methods = useForm<RegisterFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const {handleSubmit, getValues, setError: setErrors, formState: {errors}} = methods;
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

    return <SmallCard title="Rejestracja">
        <form
            onSubmit={handleSubmit((data: RegisterFormData) => {
                if (getValues("password") !== getValues("confirmPassword")) {
                    setErrors("confirmPassword", {type: "validate", message: 'Podane hasła nie są identyczne.'});
                    return;
                }
                setLoading(true);
                (async () => {
                    await registerUser(data);
                })();
                setLoading(false);
            })}
        >

            <div className='py-10 mx-auto w-fit'>
                <FormProvider {...methods}>
                    <NameInput loading={loading}/>
                    {errors?.name && <InputErrorMessage errorMessage={errors?.name.message}/>}

                    <EmailInput loading={loading}/>
                    {errors?.email && <InputErrorMessage errorMessage={errors?.email.message}/>}

                    <PasswordInput name="password" placeholder="Hasło" loading={loading}/>
                    {errors?.password && <InputErrorMessage errorMessage={errors?.password.message}/>}

                    <PasswordInput name="confirmPassword" placeholder="Powtórz hasło" loading={loading}/>
                    {errors?.confirmPassword && <InputErrorMessage errorMessage={errors?.confirmPassword.message}/>}
                </FormProvider>
                <div className="pt-1">Masz już konto? <NavLink to="/login" className="link-info">Zaloguj
                    się</NavLink></div>
            </div>
            <button type='submit' className="btn btn-primary w-full" disabled={loading || isLoading}>
                Zarejestruj się
            </button>
        </form>
    </SmallCard>
};