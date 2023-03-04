import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {MainChartCard} from "./MainChartCard";
import {MainStatsCard} from "./MainStatsCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";
import {RootState} from "../../store";
import {ApiResponse, PeriodEntity} from 'types';
import {setActual} from "../../features/period/period-slice";
import {convertDateToMonthAndYearHandler} from "../../utils/convertDateToMonthAndYearHandler";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {
    const dispatch = useDispatch();
    const {actualPeriod} = useSelector((state: RootState) => state.period);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            console.log('starting')
            try {
                const res = await fetch(`http://localhost:3001/period/actual`);
                const data: ApiResponse<PeriodEntity | null> = await res.json();
                if (data.success) {
                    if (data.payload === null) {
                        console.log('Brak aktywnego okresu.');
                    } else {
                        console.log('Pobrano okres:', data.payload);
                        dispatch(setActual(data.payload));
                    }
                } else if (data.error) {
                    console.log('Błąd:', data.error);
                } else {
                    console.log('Błąd!');
                }
            } catch (e) {
                console.log(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch]);

    if (loading) {
        return <p>Ładowanie</p>
    }

    if (actualPeriod) {

        return <div className="container mx-auto py-8 text-justify md:px-4 block">
                <h1 className="mx-auto text-4xl font-semibold w-fit mb-2">Aktualny okres</h1>
                <h2 className="mx-auto text-base pb-8 w-fit">{convertDateToMonthAndYearHandler(actualPeriod.starts, actualPeriod.ends)}</h2>

                <div
                    className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                    <MainStatsCard actualPeriod={actualPeriod}/>
                    <MainChartCard actualPeriod={actualPeriod}/>
                    <FinancialCushionCard/>
                </div>
                <LastOperationsCard periodId={actualPeriod.id}/>
            </div>
    }

    else return <p>Zacznijmy konfigurację!</p>;
};