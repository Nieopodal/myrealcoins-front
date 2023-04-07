import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    loading: boolean;
}

export const EmailInput = ({loading}: Props) => {
    const {register} = useFormContext();
    return <input
        placeholder="E-mail"
        disabled={loading}
        type='email'
        className='input input-bordered w-full mb-4'
        {...register('email', {
            pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Podany email jest nieprawidłowy.',
            }
        })}
        required
    />
};