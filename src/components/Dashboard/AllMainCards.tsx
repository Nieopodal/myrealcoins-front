import {PeriodEntity} from "types";
import {PageHeader} from "../common/PageHeader";
import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";
import {MainStatsCard} from "./MainStatsCard";
import {MainChartCard} from "./MainChartCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";
import React from "react";
interface Props {
    actualPeriod: PeriodEntity;
    isPast?: boolean;
}
export const AllMainCards = ({actualPeriod, isPast}: Props) => {

    return <>
        {!isPast && <PageHeader text="Aktualny okres"/>}

        {!isPast &&
            <h2 className="mx-auto text-base pb-8 w-fit">{convertDateToMonthAndYearHandler(actualPeriod.starts, actualPeriod.ends)}</h2>}

        <div
            className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
            <MainStatsCard actualPeriod={actualPeriod} isPast={isPast}/>
            <MainChartCard actualPeriod={actualPeriod} isPast={isPast}/>
            {<FinancialCushionCard previousPeriod={isPast ? actualPeriod : null}/>}
        </div>
        {actualPeriod.id && <LastOperationsCard periodId={actualPeriod.id} isPast={isPast}/>}
    </>
};