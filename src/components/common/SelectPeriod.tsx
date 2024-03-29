import React from "react";
import {convertDateToMonthAndYearHandler} from "../../utils/handlers/convert-date-to-month-and-year-handler";
import {PeriodEntity} from "types";

interface Props {
    setSelectedPeriod: (value: string) => void;
    periodsList: PeriodEntity[];
    selectedPeriod: string;
    disableActual?: boolean;
    actualPeriodId?: string;
    additionalClasses?: string;
    countOperationsWithGps?: number;
    onlyWithGps?: boolean;
}

export const SelectPeriod = ({
                                 setSelectedPeriod,
                                 periodsList,
                                 selectedPeriod,
                                 disableActual,
                                 actualPeriodId,
                                 additionalClasses,
                                 countOperationsWithGps,
                                 onlyWithGps,
                             }: Props) => {

    return <div className={`mx-auto w-fit pb-10 ${additionalClasses}`}>
        <span className="text-sm xl:text-base font-semibold mr-2">Wybierz okres</span>

        <select className="select select-primary select-xs xl:select-sm" defaultValue=""
                onChange={e => setSelectedPeriod(e.target.value)}>
            <option value="" disabled>Brak</option>
            {
                periodsList && (periodsList as PeriodEntity[])
                    .map(period =>
                        <option key={period.id}
                                disabled={disableActual ? period.id === actualPeriodId : false}
                                value={period.id}>
                            {convertDateToMonthAndYearHandler(period.starts, period.ends)}
                        </option>)
            }
        </select>

        {selectedPeriod === '' && <p className="text-red-600 font-semibold mx-auto w-fit mt-2">Wymagane.</p>}
        {onlyWithGps && selectedPeriod &&
            <p className="mx-auto w-fit mt-2">Znalezionych lokalizacji: {countOperationsWithGps}</p>
        }
    </div>
};