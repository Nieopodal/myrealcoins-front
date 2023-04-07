import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {StepHeader} from "./StepHeader";
import {DescriptionInput} from "../../common/form/inputs/DescriptionInput";
import {CheckboxInput} from "../../common/form/inputs/CheckboxInput";
import {RadioInput} from "../../common/form/inputs/RadioInput";
import {LocalizationSource} from "types";
import {InputErrorMessage} from "../../common/form/InputErrorMessage";
import {useDeviceGeolocation} from "../../../hooks/useDeviceGeolocation";
import {FileInput} from "../../common/form/inputs/FileInput";
import {HiddenCoordsInputs} from "../../common/form/inputs/HiddenCoordsInputs";
import {QuestionSvg} from "../../common/Svg/QuestionSvg";

export const StepThreeForm = () => {
    const {register, getValues, formState: {errors}, clearErrors, setValue} = useFormContext();
    const [latFromDevice, lonFromDevice, geolocationError] = useDeviceGeolocation();
    const [chosenOperationType, chosenLocalization] = getValues(["type", "localization", "localizationSource"]);

    useEffect(() => {
        clearErrors("localizationSource");
        if (latFromDevice && lonFromDevice) {
            setValue('latFromDevice', latFromDevice as number);
            setValue('lonFromDevice', lonFromDevice as number);
        }
        if (!chosenLocalization) clearErrors("localizationSource");
    }, [chosenLocalization, latFromDevice, lonFromDevice, clearErrors, setValue, useDeviceGeolocation]);

    return <div className="pb-4 w-fit mx-auto">
        <StepHeader text="Krok 3: Dodatkowe"/>
        <DescriptionInput/>
        <div className="flex">
            <CheckboxInput name="isRepetitive" title="Czy operacja jest cykliczna?"/>
            <QuestionSvg
                text="Zostanie utworzona operacja oraz schemat, na podstawie którego w kolejnych miesiącach automatycznie będzie można stworzyć taką samą operację (oprócz zdjęcia paragonu)."/>
        </div>
        {chosenOperationType === '1' && <div>
            <div className="flex">
                <CheckboxInput name="localization" title="Lokalizacja operacji"/>
                <QuestionSvg
                    text="Płatność zostanie oznaczona na mapie w postaci pinezki."/>
            </div>
            <InputErrorMessage errorMessage={errors.localizationSource?.message as string}/>

            {chosenLocalization && <div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Na podstawie bieżącej lokalizacji</span>
                        <input type="radio" {...register("localizationSource", {
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (Number(value) === LocalizationSource.UserDevice && geolocationError) return `${geolocationError}`
                            }
                        })} value={LocalizationSource.UserDevice}
                               className={`radio`}/>
                    </label>
                </div>

                <RadioInput value={LocalizationSource.Receipt} title="Na podstawie zdjęcia paragonu"
                            name="localizationSource" required={chosenLocalization ? "Wymagane" : false}/>
            </div>}

            <FileInput/>

            <HiddenCoordsInputs latName={`latFromDevice`} lonName={`lonFromDevice`}/>
        </div>}
    </div>
};