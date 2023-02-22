import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Card} from "../common/Card";

export const MainChartCard = () => {

    const data = {
        labels: ['Wydatki', 'Oszczędności'],
        datasets: [{
            label: 'Kwota',
            data: [40000.00, 10000.00],
            backgroundColor: ['#560df6', '#37cbbd'],
        }],
    };

    return <Card btnAction={()=>{}} btnDescription="Zobacz szczegóły">
        <div className=" h-72 sm:h-80 items-center mx-auto pt-5">
            <Doughnut data={data}/>
        </div>
    </Card>
};