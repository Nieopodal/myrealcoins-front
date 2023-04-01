import React from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {PeriodEntity} from 'types';
import ThreeDots from "../common/Loader";
import {PageHeader} from "../common/PageHeader";
import {PageContainer} from "../common/PageContainer";
import {useActualPeriod} from "../../hooks/useActualPeriod";
import {ErrorMessage} from "../common/ErrorMessage";
import {AllMainCards} from "./AllMainCards";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {
    const [actualPeriod, loading, error] = useActualPeriod();


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
                    <AllMainCards actualPeriod={actualPeriod as PeriodEntity}/>
            </PageContainer>
    }

    if (actualPeriod === null) {
        return <p>Zacznijmy konfigurację</p>
    }
    return null;
};