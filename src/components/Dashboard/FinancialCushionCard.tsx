import React from "react";
import {Card} from "../common/Card";
import {pricifyHandler} from "../../utils/handlers/pricify-handler";
import {PeriodEntity} from "types";
import useFindUser from "../../hooks/useFindUser";

interface Props {
    previousPeriod: PeriodEntity | null;
}

export const FinancialCushionCard = ({previousPeriod}: Props) => {
    const {user} = useFindUser();

    return <Card>
        <div className="pl-7 pt-7 pb-8 mx-auto my-auto sm:mx-0 w-fit sm:w-auto">
            <div className="stat-title xl:text-lg font-semibold ">
                <h3 className="flex items-center mr-2">
                    {previousPeriod ? `Zasilenie poduszki finansowej w danym okresie [PLN]` : `Poduszka finansowa [PLN]`}
                </h3>
            </div>
            {user && <div
                className="stat-value">
                {previousPeriod ? pricifyHandler(previousPeriod.freeCashAmount + previousPeriod.savingsAmount) : pricifyHandler(user.financialCushion)}
            </div>}
        </div>
    </Card>
};