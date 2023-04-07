import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import {EyeSvg} from "../../Svg/EyeSvg";

interface Props {
    name: string;
    loading: boolean;
    placeholder: string;
    noPattern?: boolean;
}

export const PasswordInput = ({name, loading, placeholder, noPattern}: Props) => {

    const [showPwd, setShowPwd] = useState<boolean>(false);

    const {register} = useFormContext();
    return <div className="relative"><input
        placeholder={placeholder}
        disabled={loading}
        type={showPwd ? 'text' : 'password'}
        className='input input-bordered w-full mb-4'
        {...register(name, {
            pattern: noPattern ? undefined : {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                message: 'Hasło powinno składać się z 7-15 znaków, w tym przynajmniej z 1 cyfry oraz znaku specjalnego.',
            }
        })}
        required
    />
        <button type="button" autoFocus={false} tabIndex={-1}
                className=" absolute inset-y-0 right-0 flex items-center pb-4 px-2"
                onClick={() => setShowPwd(prev => !prev)}>
            <EyeSvg showPwd={showPwd}/></button>
    </div>
};