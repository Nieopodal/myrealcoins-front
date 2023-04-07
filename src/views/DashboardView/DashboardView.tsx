import React, {useContext, useEffect} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {PeriodEntity} from 'types';
import ThreeDots from "../../components/common/Loader";
import {PageContainer} from "../../components/common/PageContainer";
import {AllMainCards} from "../../components/Dashboard/AllMainCards";
import {UserContext} from "../../contexts/user.context";
import {showToast, Toast} from "../../utils/show-toast";
import {InitConfig} from "../../components/Dashboard/InitConfig";
import useFindUser from "../../hooks/useFindUser";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DashboardView = () => {
    const {user, actualPeriod, isLoading} = useFindUser();
    const {isLoading: contextLoading, error} = useContext(UserContext);

    useEffect(() => {
        if (error) showToast(Toast.Error, error);
    }, [error]);

    if (isLoading || contextLoading) {
        return <PageContainer classes="content-center flex">
            <ThreeDots/>
        </PageContainer>
    }

    if (actualPeriod && user) {
        return <PageContainer>
            <AllMainCards actualPeriod={actualPeriod as PeriodEntity}/>
        </PageContainer>
    }

    if (actualPeriod === null && !isLoading) {
        return <InitConfig/>
    }
    return null;
};