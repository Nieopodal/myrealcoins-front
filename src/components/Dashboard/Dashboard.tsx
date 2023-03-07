import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {MainChartCard} from "./MainChartCard";
import {MainStatsCard} from "./MainStatsCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";
import {RootState} from "../../store";
import {PeriodEntity} from 'types';
import {setActual} from "../../features/period/period-slice";
import {convertDateToMonthAndYearHandler} from "../../utils/convertDateToMonthAndYearHandler";
import {useFetch} from "../../hooks/useFetch";
import ThreeDots from "../common/Loader";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {
    const dispatch = useDispatch();
    const {actualPeriod} = useSelector((state: RootState) => state.period);
    const [data, error, loading] = useFetch(`period/actual`);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            dispatch(setActual(data as PeriodEntity));
        }
        //
        // console.log('actual Period: ', data)
        console.log('actual period', actualPeriod);

    }, [data, error, dispatch, loading, actualPeriod]);

    if (loading) {
        return <div className="min-h-[50vh] content-center flex">
            <ThreeDots/>
        </div>
    }



    if (actualPeriod) {
        return <div className="container mx-auto pt-8 text-justify md:px-4 block">
                <h1 className="mx-auto text-4xl font-semibold w-fit mb-2">Aktualny okres</h1>
                <h2 className="mx-auto text-base pb-8 w-fit">{convertDateToMonthAndYearHandler(actualPeriod.starts, actualPeriod.ends)}</h2>

                <div
                    className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                    <MainStatsCard actualPeriod={actualPeriod}/>
                    <MainChartCard actualPeriod={actualPeriod}/>
                    <FinancialCushionCard/>
                </div>
            {actualPeriod.id && <LastOperationsCard periodId={actualPeriod.id}/>}
            </div>

    } else return <p>Zacznijmy konfigurację!</p>;
};