import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    loading: boolean;
}

export const NameInput = ({loading}: Props) => {
    const {register} = useFormContext();
    return <input
        maxLength={20}
        placeholder="Login"
        disabled={loading}
        type='text'
        className='input input-bordered w-full mb-4'
        {...register('name', {
            pattern: {
                value: /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/,
                message: 'Użyto niedozwolonych znaków.',
            }
        })}
        required
    />
};