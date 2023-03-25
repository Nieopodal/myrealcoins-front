import {StepHeader} from "./StepHeader";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {InputErrorMessage} from "../Form/InputErrorMessage";
import {pricifyHandler} from "../../utils/pricify-handler";
import { PeriodEntity } from "types";
import {useActualPeriod} from "../../hooks/useActualPeriod";
import ThreeDots from "../common/Loader";

interface Props {
    hideTitle?: boolean;
    additionalAmount?: number;
}

export const StepTwoForm = ({hideTitle, additionalAmount = 0}: Props) => {
    const {register, getValues, formState: {errors}, watch} = useFormContext();
    const [actualPeriod, loading] = useActualPeriod();
    const {actualUser} = useSelector((state: RootState) => state.user);
    const [availableAmount, setAvailableAmount] = useState<number | null>(null);
    const watchAllFields = watch();
    const [chosenOperationType, chosenOtherOperationType] = getValues(["type", "otherType", "amount"]);

    const validationHandler = (value: number) => {
        if (value < 0.01 || value > (availableAmount ?? 999999999.99)) return `Wymagana kwota: 0.01 - ${availableAmount ?? 999999999.99}`
        return true;
    };

    useEffect(() => {
        if (actualPeriod && actualUser) {
            if (chosenOperationType === "1" || chosenOperationType === "2") setAvailableAmount((actualPeriod as PeriodEntity).freeCashAmount + additionalAmount);
            if (chosenOperationType === "9" && chosenOtherOperationType === "0") setAvailableAmount(null);
            if (chosenOperationType === "9" && chosenOtherOperationType === "3") setAvailableAmount((actualPeriod as PeriodEntity).savingsAmount + additionalAmount);
            if (chosenOperationType === "9" && chosenOtherOperationType === "6") setAvailableAmount((actualPeriod as PeriodEntity).freeCashAmount);
            if (chosenOperationType === "9" && chosenOtherOperationType === "5") setAvailableAmount(actualUser.financialCushion);
            if (chosenOperationType === "9" && chosenOtherOperationType === '') setAvailableAmount(null);
        }

    }, [watchAllFields]);

    return <div className={`${!hideTitle && `border-b-[1px]`} pb-8`}>
        {!hideTitle && <StepHeader text="Krok 2: Kwota"/>}

        {loading && <ThreeDots/>}

        {!loading && <div className="form-control w-fit max-w-xs block mx-auto">
            <label className="label">
                <span className="label-text text-base w-fit mx-auto">Kwota operacji [PLN]</span>
            </label>

            {errors.amount && <div>
                {errors.amount.type === 'min' && <InputErrorMessage errorMessage={`Wymagane: 0.01 - ${pricifyHandler(availableAmount ?? (999999999.99 - (actualPeriod as PeriodEntity).budgetAmount))} PLN`}/>}
                {errors.amount.type === 'max' && <InputErrorMessage errorMessage={`Wymagane: 0.01 - ${pricifyHandler(availableAmount ?? (999999999.99 - (actualPeriod as PeriodEntity).budgetAmount))} PLN`}/>}
                {errors.amount.type === 'required' && <InputErrorMessage errorMessage={`Wymagane: 0.01 - ${pricifyHandler(availableAmount ?? (999999999.99 - (actualPeriod as PeriodEntity).budgetAmount))} PLN`}/>}
            </div>}

            {actualPeriod && actualUser &&
                <input type="number" {...register("amount",
                {
                    required: `Wymagana kwota: 0.01 - ${availableAmount ?? 999999999.99}`,
                    valueAsNumber: true,
                    max: availableAmount ??  999999999.99,
                    min: 0.01,
                    validate: (value: number) => validationHandler(value)}
            )} min={0.01} max={availableAmount ?? 999999999.99} step="0.01" className="input input-bordered w-full max-w-xs"/>}

            {availableAmount !== null && <div>Dostępne środki: {pricifyHandler(availableAmount)} PLN</div>}
        </div>}
    </div>
};