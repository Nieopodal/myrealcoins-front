import React, {useEffect, useState} from "react";
import {OperationsTable} from "../common/OperationsTable";
import {OperationEntity, PeriodEntity } from "types";
import {useFetch} from "../../hooks/useFetch";
import {usePeriods} from "../../hooks/usePeriods";
import {convertDateToMonthAndYearHandler} from "../../utils/convertDateToMonthAndYearHandler";

export const AllOperations = () => {

    const [periodsList, , loadingPeriods] = usePeriods();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [operations, setOperations] = useState<OperationEntity[] | null>(null);
    const [data, error, loading] = useFetch(`operation/get-period-operations/${selectedPeriod}`);

    useEffect(() => {
        console.log(selectedPeriod);
        if (error) {
            console.log('błąd', error);
        }
        if (data === null) {
            setOperations([]);
        }
        setOperations(data as OperationEntity[]);

    }, [data, error, loading, loadingPeriods, selectedPeriod]);


    return <div className="pt-10 pb:10 xl:pb-0">

        {!loadingPeriods && <div className="mx-auto w-fit pb-10">
            <span className="text-sm xl:text-base font-semibold mr-2">Wybrany okres</span>

            <select className="select select-primary select-xs xl:select-sm" defaultValue="" onChange={e => setSelectedPeriod(e.target.value)}>
                <option value="" disabled>Brak</option>
                {
                    periodsList && (periodsList as PeriodEntity[]).map(period => <option key={period.id} value={period.id}>{convertDateToMonthAndYearHandler(period.starts, period.ends)}</option> )
                }
            </select>
        </div>
        }

        {<OperationsTable operations={operations ?? []} title={`Lista operacji`} loading={loading as boolean}/>}
    </div>
};