import React, {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {InputErrorMessage} from "./InputErrorMessage";

export const FileInput = () => {
    const {register, getValues, formState: {errors}, watch, clearErrors} = useFormContext();
    const watchLocalizationSource = watch("localizationSource");

    useEffect(() => {
        clearErrors("image");
    }, [clearErrors, watchLocalizationSource]);

    return (
        <div className="w-full">
            <label className="label w-fit mx-auto pt-4 block"><span
                className="block mx-auto w-fit py-4 font-semibold">Dodaj zdjęcie paragonu</span>

                <InputErrorMessage errorMessage={errors.image?.message as string}/>

                <input type="file" className="file-input file-input-bordered w-fit mx-auto max-w-xs block"
                       accept="image/jpeg" {...register('image', {
                    validate: (files) => {
                        if (!files[0] && getValues("localizationSource") === "2") return "Wymagane!";
                        if (files[0] && files[0].type !== "image/jpeg") return "Wymagany plik .JPG!";
                        if (files[0] && files[0].size > 7000000) return "Maksymalna waga pliku to 7MB!";
                        return true;
                    }
                })}/>
                <span className="label-text-alt">.JPG, MAX 7MB</span>
                {/*    @TODO how many bytes?*/}
            </label>
        </div>
    )
}