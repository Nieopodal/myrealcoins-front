import React from "react";
import {Card} from "../common/Card";
import {pricifyHandler} from "../../utils/pricify-handler";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {PeriodEntity} from "types";

interface Props {
    previousPeriod: PeriodEntity | null;
}

export const FinancialCushionCard = ({previousPeriod}: Props) => {
    const {actualUser} = useSelector((state: RootState) => state.user);

    return <Card>
        <div className="pl-7 pt-7 pb-8 mx-auto sm:mx-0 w-fit sm:w-auto">
            <div className="stat-title xl:text-lg font-semibold ">
                <h3 className="flex items-center mr-2">{previousPeriod ? `Zasilenie poduszki finansowej w danym okresie [PLN]` : `Poduszka finansowa [PLN]`} </h3>

            </div>
            <div
                className="stat-value">{previousPeriod ? pricifyHandler(previousPeriod.freeCashAmount + previousPeriod.savingsAmount) : pricifyHandler(actualUser.financialCushion)}
            </div>

        </div>
    </Card>
};