import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Card} from "../../components/common/Card";
import ThreeDots from "../../components/common/Loader";
import {InputErrorMessage} from "../../components/common/form/InputErrorMessage";
import {ErrorMessage} from "../../components/common/ErrorMessage";
import {ResetPwdFormData} from "../ResetPwdWithTokenView/ResetPwdWithTokenView";
import {ApiResponse} from "types";
import {EmailInput} from "../../components/common/form/inputs/EmailInput";
import {apiUrl} from "../../config/api";

export const ResetPwdWithEmailView = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [finishedInfo, setFinishedInfo] = useState<null | string>(null);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<ResetPwdFormData>({
        defaultValues: {
            email: ''
        },
    });

    const {handleSubmit, getValues, setError: setErrors, formState: {errors}} = methods;

    const handleResetPwd = async (data: ResetPwdFormData) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/reset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData: ApiResponse<string> = await res.json();
            if (responseData.success) {
                setFinishedInfo(responseData.payload);
            } else {
                setError(responseData.error);
            }
        } catch {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        } finally {
            setLoading(false);
        }
    };

    return <Card additionalClasses=" mx-auto sm:w-[60%] md:max-w-md py-4 xl:px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4 pb-4">Zresetuj hasło</h3>
        {loading && <ThreeDots smallerDisplay/>}

        {!loading && !finishedInfo && !error &&
            <form onSubmit={handleSubmit(async (data: ResetPwdFormData) => {
                if (getValues("password") !== getValues("confirmPassword")) {
                    setErrors("confirmPassword", {type: "validate", message: 'Podane hasła nie są identyczne.'});
                    return;
                }
                await handleResetPwd(data)
            })}
            >
                <div className="pb-6 w-fit mx-auto">Na podany adres prześlemy link do zmiany hasła.</div>

                <FormProvider {...methods}>
                    <EmailInput loading={loading}/>
                    {errors?.email && <InputErrorMessage errorMessage={errors?.email.message}/>}
                </FormProvider>

                <button type='submit' className="btn btn-primary w-full" disabled={loading}>
                    Zmień hasło
                </button>
            </form>}
        {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
        {!loading && !error && finishedInfo &&
            <div className="py-4 px-2 mx-auto w-fit text-justify">{finishedInfo}</div>}
    </Card>
}