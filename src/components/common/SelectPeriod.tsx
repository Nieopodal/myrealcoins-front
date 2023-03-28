import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";
import React from "react";
import { PeriodEntity } from "types";

interface Props {
    setSelectedPeriod: (value: string) => void;
    periodsList: PeriodEntity[];
    selectedPeriod: string;
}

export const SelectPeriod = ({setSelectedPeriod, periodsList, selectedPeriod, }: Props) => {

    return <div className="mx-auto w-fit pb-10">
        <span className="text-sm xl:text-base font-semibold mr-2">Wybierz okres</span>

        <select className="select select-primary select-xs xl:select-sm" defaultValue="" onChange={e => setSelectedPeriod(e.target.value)}>
            <option value="" disabled>Brak</option>
            {
                periodsList && (periodsList as PeriodEntity[]).map(period => <option key={period.id} value={period.id}>{convertDateToMonthAndYearHandler(period.starts, period.ends)}</option> )
            }
        </select>

        {selectedPeriod === '' && <p className="text-red-600 font-semibold mx-auto w-fit">Wymagane.</p>}
    </div>
};