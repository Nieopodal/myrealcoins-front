import {Doughnut} from "react-chartjs-2";
import React from "react";

interface Props {
    labels: string[];
    amounts: number[];
    backgroundColors: string[];
}

export const Chart = ({labels, amounts, backgroundColors}: Props) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Kwota',
            data: amounts,
            backgroundColor: backgroundColors,
        }],
    };

    return <div className=" h-72 sm:h-80 items-center mx-auto pt-5">
        <Doughnut data={data}/>
    </div>
};