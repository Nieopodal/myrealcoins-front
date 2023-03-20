import React, {ChangeEvent, useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {InputErrorMessage} from "./InputErrorMessage";
import {HiddenCoordsInputs} from "./HiddenCoordsInputs";
import {getLocationFromImage} from "../../utils/get-location-from-image";
import { LocalizationSource } from "types";

export const FileInput = () => {
    const {register, getValues, formState: {errors}, watch, clearErrors, setValue} = useFormContext();
    const [coords, setCoords] = useState<{outputLat: number, outputLon: number} | null>(null);
    const watchLocalizationSource = watch("localizationSource");

    const imageChangedHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        clearErrors("image");
        if (e.target.files && Number(watchLocalizationSource) === LocalizationSource.Receipt) {
            const coords = await getLocationFromImage(e.target.files[0]);
            if (coords) {
                setCoords(coords);
                setValue("latFromImage", coords.outputLat);
                setValue("lonFromImage", coords.outputLon);
            }
            else {
                setValue("latFromImage", 0);
                setValue("lonFromImage", 0);
            }
        }
    };

    useEffect(() => {
        clearErrors("image");
    }, [clearErrors, watchLocalizationSource]);

    return (
        <div className="w-full">
            <label className="label w-fit mx-auto pt-4 block"><span
                className="block mx-auto w-fit py-4 font-semibold">Dodaj zdjęcie paragonu</span>

                <InputErrorMessage errorMessage={errors.image?.message as string}/>

                <input type="file"
                       className="file-input file-input-bordered w-fit mx-auto max-w-xs block"
                       accept="image/jpeg"
                       {...register('image', {
                           valueAsNumber: true,
                           validate: (files) => {
                               if (!files[0] && getValues("localizationSource") === "2") return "Wymagane!";
                               if (files[0] && files[0].type !== "image/jpeg") return "Wymagany plik .JPG!";
                               if (files[0] && files[0].size > 7000000) return "Maksymalna waga pliku to 7MB!";
                               if (files[0] && getValues("localizationSource") === "2" && !coords) return "Lokalizacja ze zdjęcia jest niedostępna.";
                               return true;
                           }
                       })}
                       onChange={async (e) => {
                       await imageChangedHandler(e)}
                       }/>
                <span className="label-text-alt">.JPG, MAX 7MB</span>
                {/*    @TODO how many bytes?*/}
            </label>

            <HiddenCoordsInputs latName="latFromImage" lonName="lonFromImage"/>
        </div>
    );
};