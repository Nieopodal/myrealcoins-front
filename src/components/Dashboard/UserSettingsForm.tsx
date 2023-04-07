import React, {useContext, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {CheckboxInput} from "../Form/CheckboxInput";
import {ApiResponse, PeriodEntity, UserEntity} from "types";
import {showToast, Toast} from "../../utils/show-toast";
import {UserContext} from "../../contexts/user.context";
import {InputErrorMessage} from "../Form/InputErrorMessage";
import {fetchHandler} from "../../utils/fetch/fetch-handler";

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
        setLoading(true);
        (async () => {
            try {
                const res = await fetchHandler('http://localhost:3001/user', "PUT", data, true, "application/json");
                const responseData: ApiResponse<UserEntity> = await res.json();
                if (responseData.success) {
                    setUser(responseData.payload);
                    if (!actualPeriod) {

                        try {
                            const res = await fetchHandler('http://localhost:3001/period', "POST");
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

            {actualPeriod && <div className="w-fit mx-auto pt-5">
                <NavLink to="/reset-password" className="btn btn-outline">Zmiana hasła</NavLink>
            </div>}
        </div>
        <button type='submit' className="btn btn-primary w-full" disabled={loading}>
            Zapisz
        </button>
    </form>
};