import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ApiResponse} from "types";
import ThreeDots from "../../components/common/Loader";
import {Card} from "../../components/common/Card";
import {ErrorMessage} from "../../components/common/ErrorMessage";
import {InputErrorMessage} from "../../components/Form/InputErrorMessage";
import {MainHeaderBtn} from "../../components/Header/MainHeaderBtn";

export interface ResetPwdFormData {
    name: string;
    email: string
    password: string;
    confirmPassword: string;
}

export const ResetPwdWithTokenView = () => {
    const {userId, code} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {register, handleSubmit, getValues, setError: setErrors, formState: {errors}} = useForm<ResetPwdFormData>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const handleResetPwd = async (data: ResetPwdFormData) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/user/reset/${userId}/${code}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData: ApiResponse<string> = await res.json();
            if (responseData.success) {
                setChanged(true);
            } else {
                setError(responseData.error);
            }
        } catch {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         navigate("/dashboard", {replace: true});
    //     }
    // }, []);

    return <Card additionalClasses=" mx-auto sm:w-[60%] md:max-w-md py-4 xl:px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4">Zmień hasło</h3>
        {loading && <ThreeDots smallerDisplay/>}

        {!loading && !changed && !error &&
            <form className="pt-10" onSubmit={handleSubmit(async (data: ResetPwdFormData) => {
                if (getValues("password") !== getValues("confirmPassword")) {
                    setErrors("confirmPassword", {type: "validate", message: 'Podane hasła nie są identyczne.'});
                    return;
                }
                await handleResetPwd(data)
            })}
            >
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
                {errors?.password && <InputErrorMessage errorMessage={errors?.password.message}/>}

                {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
                <button type='submit' className="btn btn-primary w-full" disabled={loading}>
                    Zmień hasło
                </button>
            </form>}

        {!loading && !error && changed && <div className="pt-4 mx-auto w-fit font-semibold">Hasło zostało zmienione..
            <div className="modal-action justify-center">
                <MainHeaderBtn user={null}/>
            </div></div>}

        {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
    </Card>
};