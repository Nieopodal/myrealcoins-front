import React from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {MainChartCard} from "./MainChartCard";
import {MainStatsCard} from "./MainStatsCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";
import {PeriodEntity} from 'types';
import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";
import ThreeDots from "../common/Loader";
import {PageHeader} from "../common/PageHeader";
import {PageContainer} from "../common/PageContainer";
import {useActualPeriod} from "../../hooks/useActualPeriod";
import {ErrorMessage} from "../common/ErrorMessage";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {
    const actualPeriod = useActualPeriod()[0] as PeriodEntity;
    const loading = useActualPeriod()[1];
    const error = useActualPeriod()[2];

    if (loading) {
        return <PageContainer classes="min-h-[60vh] content-center flex">
            <ThreeDots/>
        </PageContainer>
    }

    if (error) {
        return <PageContainer>
            <PageHeader text="Aktualny okres"/>
            <ErrorMessage/>
        </PageContainer>
    }

    if (actualPeriod) {
        return <PageContainer>

                <PageHeader text="Aktualny okres"/>
                <h2 className="mx-auto text-base pb-8 w-fit">{convertDateToMonthAndYearHandler(actualPeriod.starts, actualPeriod.ends)}</h2>

                <div
                    className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                    <MainStatsCard actualPeriod={actualPeriod}/>
                    <MainChartCard actualPeriod={actualPeriod}/>
                    <FinancialCushionCard/>
                </div>
            {actualPeriod.id && <LastOperationsCard periodId={actualPeriod.id}/>}
            </PageContainer>

    }

    if (actualPeriod === null) {
        return <p>Zacznijmy konfigurację</p>
    }
    return null;
};