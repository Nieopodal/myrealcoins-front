import {StepHeader} from "./StepHeader";
import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {DescriptionInput} from "../Form/DescriptionInput";
import {CheckboxInput} from "../Form/CheckboxInput";
import {AddressInput} from "../Form/AddressInput";
import {RadioInput} from "../Form/RadioInput";
import {LocalizationSource} from "types";
import {InputErrorMessage} from "../Form/InputErrorMessage";
import {useGeolocation} from "../../hooks/useGeolocation";
import {FileInput} from "../Form/FileInput";

export const StepThreeForm = () => {
    const {register, getValues, formState: {errors}, clearErrors, setValue} = useFormContext();
    const [lat, lon, geolocationError] = useGeolocation();
    const [chosenOperationType, chosenLocalization] = getValues(["type", "localization", "localizationSource"]);

    useEffect(() => {
        if (lat && lon) {
            setValue('lat', lat as number);
            setValue('lon', lon as number);
        }
        if (!chosenLocalization) clearErrors("localizationSource");
    }, [chosenLocalization, lat, lon, clearErrors, setValue]);

    return <div className="pb-4 w-fit mx-auto">
        <StepHeader text="Krok 3: Dodatkowe"/>
        <DescriptionInput/>
        <CheckboxInput name="isRepetitive" title="Czy operacja jest cykliczna?"/>

        {chosenOperationType === '1' && <div>
            <CheckboxInput name="localization" title="Lokalizacja operacji"/>
            <InputErrorMessage errorMessage={errors.localizationSource?.message as string}/>

            {chosenLocalization && <div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Na podstawie bieżącej lokalizacji</span>
                        <input type="radio" {...register("localizationSource", {
                            validate: (value: string) => {
                                if (value === LocalizationSource.UserDevice.toString() && geolocationError) return `${geolocationError}`
                            }
                        })} value={LocalizationSource.UserDevice}
                               className={`radio`}/>
                    </label>
                </div>

                <RadioInput value={LocalizationSource.Receipt} title="Na podstawie zdjęcia paragonu"
                            name="localizationSource" required={chosenLocalization ? "Wymagane" : false}/>
                <RadioInput value={LocalizationSource.Address} title="Na podstawie adresu" name="localizationSource"
                            required={chosenLocalization ? "Wymagane" : false}/>
                {getValues("localizationSource") === "3" &&
                    <div className="grid xl:grid-cols-2 gap-4 w-fit mx-auto py-4">
                        <AddressInput title="Kraj" name="country" minLength={3} maxLength={56}/>
                        <AddressInput title="Miasto" name="city" minLength={2} maxLength={58}/>
                        <AddressInput title="Kod pocztowy" name="zip" minLength={2} maxLength={11}/>
                        <AddressInput title="Ulica i numer budynku" name="street-and-number" minLength={2}
                                      maxLength={60}/>
                    </div>}
            </div>}

            <FileInput/>

            <div className="hidden">
                <input type="number" {...register('lat')}/>
                <input type="number" {...register('lon')}/>
            </div>

        </div>}
    </div>
};