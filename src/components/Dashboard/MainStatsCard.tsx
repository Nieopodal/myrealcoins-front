import React from "react";
import {OneStat} from "./OneStat";
import {Card} from "../common/Card";
import {PeriodEntity} from 'types';
import {convertToPercentageHandler} from "../../utils/convert-to-percentage-handler";
import {pricifyHandler} from "../../utils/pricify-handler";
import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";

interface Props {
    actualPeriod: PeriodEntity;
}

export const MainStatsCard = ({actualPeriod}: Props) => {

    const {budgetAmount, paymentsAmount, savingsAmount, freeCashAmount, starts, ends} = actualPeriod;

    return <Card btnDescription="Zobacz mapę wydatków" btnAction={() => {
    }}>

        <div className="stats stats-horizontal h-[50%] border-b-[1px] rounded-none xl:py-5">
            <OneStat title="Budżet [PLN]" value={pricifyHandler(budgetAmount)}
                     description={convertDateToMonthAndYearHandler(starts, ends)}
                     btnAction={() => {
                     }}
                     btnDescription="Więcej"/>
            <OneStat title="Wydatki [PLN]" value={pricifyHandler(paymentsAmount)}
                     description={convertToPercentageHandler(paymentsAmount, budgetAmount)} btnAction={() => {
            }} btnDescription="Więcej"/>
            <OneStat title="Oszczędności [PLN]" value={pricifyHandler(savingsAmount)}
                     description={convertToPercentageHandler(savingsAmount, budgetAmount)} btnAction={() => {
            }} btnDescription="Więcej"/>
        </div>

        <div className="flex justify-center card-body pb-0">
            <OneStat title="Saldo bieżące [PLN]" value={pricifyHandler(freeCashAmount)} ownClasses="display:block"
                     ownTitleClasses="stat-title xl:text-lg font-semibold"
                     ownValueClasses="stat-value xl:text-5xl"/>
        </div>
    </Card>
};