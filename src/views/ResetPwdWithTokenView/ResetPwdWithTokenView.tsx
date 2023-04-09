import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {ApiResponse} from "types";
import ThreeDots from "../../components/common/Loader";
import {ErrorMessage} from "../../components/common/ErrorMessage";
import {InputErrorMessage} from "../../components/common/form/InputErrorMessage";
import {MainHeaderBtn} from "../../components/Header/MainHeaderBtn";
import {PasswordInput} from "../../components/common/form/inputs/PasswordInput";
import {apiUrl} from "../../config/api";
import {SmallCard} from "../../components/common/Card/SmallCard";

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

    const methods = useForm<ResetPwdFormData>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const {handleSubmit, getValues, setError: setErrors, formState: {errors}} = methods

    const handleResetPwd = async (data: ResetPwdFormData) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/reset/${userId}/${code}`, {
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

    return <SmallCard title="Zmień hasło">
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
                <FormProvider {...methods}>
                    <PasswordInput name="password" placeholder="Hasło" loading={loading}/>
                    {errors?.password && <InputErrorMessage errorMessage={errors?.password.message}/>}

                    <PasswordInput name="confirmPassword" placeholder="Powtórz hasło" loading={loading}/>
                </FormProvider>

                {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
                <button type='submit' className="btn btn-primary w-full" disabled={loading}>
                    Zmień hasło
                </button>
            </form>}

        {!loading && !error && changed && <div className="pt-4 mx-auto w-fit font-semibold">Hasło zostało zmienione.
            <div className="modal-action justify-center">
                <MainHeaderBtn user={null}/>
            </div></div>}

        {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
    </SmallCard>
};