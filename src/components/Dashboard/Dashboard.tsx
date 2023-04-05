import React, {useContext, useEffect} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {PeriodEntity} from 'types';
import ThreeDots from "../common/Loader";
import {PageContainer} from "../common/PageContainer";
import {AllMainCards} from "./AllMainCards";
import {UserContext} from "../../contexts/user.context";
import {showToast, Toast} from "../../utils/show-toast";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {

    const {actualPeriod, isLoading, user, error} = useContext(UserContext);

    useEffect(() => {
        if (error) showToast(Toast.Error, error);
    }, [error]);

    if (isLoading) {
        return <PageContainer classes="min-h-[60vh] content-center flex">
            <ThreeDots/>
        </PageContainer>
    }

    if (actualPeriod && user) {
        return <PageContainer>
                    <AllMainCards actualPeriod={actualPeriod as PeriodEntity}/>
            </PageContainer>
    }

    if (actualPeriod === null) {
        return <p>Zacznijmy konfigurację</p>
    }
    return null;
};