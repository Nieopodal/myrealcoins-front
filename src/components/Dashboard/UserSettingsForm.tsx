import {CheckboxInput} from "../Form/CheckboxInput";
import React, {useContext, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ApiResponse, PeriodEntity, UserEntity} from "types";
import {showToast, Toast} from "../../utils/show-toast";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";
import {InputErrorMessage} from "../Form/InputErrorMessage";

interface SettingsFormData {
    defaultBudgetAmount: number;
    financialCushion: number;
    addLocalizationByDefault: boolean;
}

interface Props {
    user: UserEntity;
    actualPeriod: PeriodEntity | null;
}

export const UserSettingsForm = ({user, actualPeriod}: Props) => {

    const navigate = useNavigate();
    const {setActualPeriod, setUser} = useContext(UserContext);

    const methods = useForm<SettingsFormData>({
        defaultValues: {
            defaultBudgetAmount: user.defaultBudgetAmount,
            financialCushion: user.financialCushion,
            addLocalizationByDefault: user.addLocalizationByDefault,
        },
    });

    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = methods;

    return <form onSubmit={handleSubmit((data: SettingsFormData) => {
        console.log(user, {actualPeriod});
        setLoading(true);
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/user', {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const responseData: ApiResponse<UserEntity> = await res.json();
                if (responseData.success) {
                    setUser(responseData.payload);
                    if (!actualPeriod) {

                        try {
                            const res = await fetch('http://localhost:3001/period', {
                                method: 'POST',
                                credentials: 'include',
                            });

                            const data: ApiResponse<PeriodEntity> = await res.json();

                            if (data.success) {
                                setActualPeriod(data.payload);
                            } else {
                                showToast(Toast.Error, data.error);
                            }
                        } catch {
                            showToast(Toast.Error, 'Wystąpił problem podczas próby wykonania zapytania. Spróbuj później');
                        }
                    }
                    showToast(Toast.Success, 'Zmiany zostały zapisane.');
                    navigate('/dashboard', {replace: true});
                } else {
                    showToast(Toast.Error, responseData.error);
                }

            } catch {
                showToast(Toast.Error, 'Podczas próby wykonania zapytania wystąpił błąd.')
            } finally {
                setLoading(false);
            }
        })();

    })}>
        <div className='py-10 mx-auto w-fit '>
            <label>Domyślna kwota miesięcznego budżetu
                <input
                    placeholder="Kwota miesięcznego budżetu"
                    disabled={loading}
                    type='number'
                    className='input input-bordered w-full mb-4'
                    {...register('defaultBudgetAmount', {
                        min: {
                            value: 100,
                            message: 'Minimalna kwota to 100 PLN.',
                        },
                        max: {
                            value: 999999.99,
                            message: 'Maksymalna kwota to 999 999.99 PLN.',
                        }
                    })}
                    required
                    min={0}
                />
            </label>
            {errors?.defaultBudgetAmount && <InputErrorMessage errorMessage={errors?.defaultBudgetAmount.message}/>}

            {!actualPeriod && <label>Kwota dotychczasowej poduszki finansowej
                <input
                    placeholder="Kwota dotychczasowej poduszki finansowej"
                    disabled={loading}
                    type='number'
                    className='input input-bordered w-full mb-4t'
                    {...register('financialCushion', {
                        min: {
                            value: 0,
                            message: 'Minimalna kwota to 0.00 PLN.',
                        },
                        max: {
                            value: 1000000,
                            message: 'Maksymalna kwota to 1 000 000.00 PLN.',
                        }
                    })}
                    required
                    min={0}
                />
            </label>}
            {errors?.financialCushion && <InputErrorMessage errorMessage={errors?.financialCushion.message}/>}
            <FormProvider {...methods}>
                <CheckboxInput name="addLocalizationByDefault"
                               title="Czy chcesz domyślnie dodawać lokalizację do płatności?"/>
            </FormProvider>
        </div>
        <button type='submit' className="btn btn-primary w-full" disabled={loading}>
            Zapisz
        </button>
    </form>
};