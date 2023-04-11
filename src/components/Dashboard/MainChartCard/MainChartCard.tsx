import React, {useState} from "react";
import {PeriodEntity} from "types";
import {Card} from "../../common/Card/Card";
import {ChartModal} from "./ChartModal";
import {Chart} from "../../common/Chart";

interface Props {
    actualPeriod: PeriodEntity,
}

export const MainChartCard = ({actualPeriod}: Props) => {

    const [open, setOpen] = useState(false);
    const handleToggle = () => setOpen((prev) => !prev);
    const {paymentsAmount, freeCashAmount, savingsAmount} = actualPeriod;

    return <Card btnAction={handleToggle} btnDescription="Zobacz strukturę wydatków">
        <Chart
            labels={['Wydatki', 'Oszczędności', 'Wolna gotówka']}
            amounts={[paymentsAmount, savingsAmount, freeCashAmount]}
            backgroundColors={['#9D3482', '#560df6', '#37cbbd']}
        />
        {open && <ChartModal open={open} handleToggle={handleToggle}/>}
    </Card>
};