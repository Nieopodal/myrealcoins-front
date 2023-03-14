import React from "react";
import {Card} from "../common/Card";
import {pricifyHandler} from "../../utils/pricify-handler";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const FinancialCushionCard = () => {
    const {actualUser} = useSelector((state: RootState) => state.user);

    return <Card>
        <div className="pl-7 pt-7 pb-8 mx-auto sm:mx-0 w-fit sm:w-auto">
            <div className="stat-title xl:text-lg font-semibold ">
                <h3>Poduszka finansowa [PLN]</h3>
            </div>
            <div className="stat-value">{pricifyHandler(actualUser.financialCushion)}</div>
        </div>
    </Card>
};