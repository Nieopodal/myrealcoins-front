import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {MainChartCard} from "./MainChartCard";
import {MainStatsCard} from "./MainStatsCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {

    return <div className="container mx-auto py-8 text-justify md:px-4 block">
            <h1 className="mx-auto text-4xl font-semibold w-fit mb-2">Aktualny okres</h1>
            <h2 className="mx-auto text-base pb-8 w-fit">Luty 2023</h2>

            <div className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                <MainStatsCard/>
                <MainChartCard/>
                <FinancialCushionCard/>
            </div>
           <LastOperationsCard/>
        </div>
};