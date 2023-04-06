import React from "react";
import {OneStat} from "./OneStat";
import {Card} from "../common/Card";
import {PeriodEntity} from 'types';
import {convertToPercentageHandler} from "../../utils/convert-to-percentage-handler";
import {pricifyHandler} from "../../utils/pricify-handler";
import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";
import {useNavigate} from "react-router-dom";

interface Props {
    actualPeriod: PeriodEntity;
    isPast?: boolean;
}

export const MainStatsCard = ({actualPeriod, isPast}: Props) => {
    const navigate = useNavigate();

    const {budgetAmount, paymentsAmount, savingsAmount, freeCashAmount, starts, ends} = actualPeriod;

    if (actualPeriod) return <Card btnDescription="Zobacz mapę wydatków" btnAction={() => {
        navigate('/map', {
            replace: true,
        })
    }}>

        <div className={`stats stats-horizontal h-[50%] border-b-[1px] rounded-none xl:py-5`}>
            <OneStat title="Budżet [PLN]" value={pricifyHandler(budgetAmount)}
                     isPast={isPast}
                     description={convertDateToMonthAndYearHandler(starts, ends)}
                     btnAction={() => {
                     }}
                     btnDescription={`Jeśli chcesz zmienić kwotę dostępnego budżetu - dodaj operację "Wpłata do budżetu" lub "Redukcja budżetu". Aby zmienić domyślną kwotę w przyszłych miesiącach - przejdź do Ustawień.`}/>
            <OneStat title="Wydatki [PLN]" value={pricifyHandler(paymentsAmount)}
                     isPast={isPast}
                     description={convertToPercentageHandler(paymentsAmount, budgetAmount)} btnAction={() => {
            }} btnDescription={`Jest to suma wszystkich płatności w danym okresie. Szczegółowy podział płatności ze względu na kategorię otworzysz klikając "Zobacz strukturę wydatków".`}/>
            <OneStat title="Oszczędności [PLN]" value={pricifyHandler(savingsAmount)}
                     isPast={isPast}
                     description={convertToPercentageHandler(savingsAmount, budgetAmount)} btnAction={() => {
            }} btnDescription={`Aktualnie zaoszczędzona kwota w danym okresie. Możesz zwiększyć ją poprzez dodanie operacji "Oszczędzanie". Uwaga! Po zakończeniu każdego z okresów kwota ta wraz z saldem bieżącym zostanie dodana do Twojej poduszki finansowej.`}/>
        </div>

        <div className="flex justify-center card-body pb-0">
            <OneStat title={isPast ? `Niewykorzystane środki [PLN]` : `Saldo bieżące [PLN]`}
                     value={pricifyHandler(freeCashAmount)} ownClasses="display:block"
                     ownTitleClasses="stat-title xl:text-lg font-semibold"
                     ownValueClasses="stat-value xl:text-5xl"/>
        </div>
    </Card>

    return null;
};