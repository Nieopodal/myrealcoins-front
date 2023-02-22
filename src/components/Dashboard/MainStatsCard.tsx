import React from "react";
import {OneStat} from "./OneStat";
import {Card} from "../common/Card";

export const MainStatsCard = () => {

    return <Card btnDescription="Lokalizacje transakcji" btnAction={()=>{}}>
        <div className="stats stats-horizontal h-[50%] border-b-[1px] rounded-none xl:py-5">
            <OneStat title="Budżet [PLN]" value={500000.00} description="Luty 2023" btnAction={()=>{}}
                     btnDescription="Więcej"/>
            <OneStat title="Wydatki [PLN]" value={400000.00} description="80%" btnAction={()=>{}} btnDescription="Więcej"/>
            <OneStat title="Oszczędności [PLN]" value={100000.03} description="10%" btnAction={()=>{}} btnDescription="Więcej"/>
        </div>

        <div className="flex justify-center card-body align-center">
            <OneStat title="Saldo bieżące [PLN]" value={34346.54} ownClasses="display:block"
                     ownTitleClasses="stat-title xl:text-lg font-semibold" ownValueClasses="stat-value xl:text-5xl"/>
        </div>
    </Card>
};