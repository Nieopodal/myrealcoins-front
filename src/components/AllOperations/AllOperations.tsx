import React, {useEffect, useState} from "react";
import {OperationEntity, PeriodEntity} from "types";
import {useFetch} from "../../hooks/useFetch";
import {usePeriods} from "../../hooks/usePeriods";
import {showToast, Toast} from "../../utils/show-toast";
import {SelectPeriod} from "../common/SelectPeriod";
import {AllOperationsContext} from "../../contexts/all-operations.context";

interface Props {
    children: React.ReactNode;
}

export const AllOperations = ({children}: Props) => {

    const [periodsList, , loadingPeriods] = usePeriods();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [operations, setOperations] = useState<OperationEntity[] | null>(null);
    const [data, error, loading] = useFetch(`operation/get-period-operations/${selectedPeriod}`);

    useEffect(() => {
        if (error) {
            showToast(Toast.Error, error as string);
        }
        if (data === null) {
            setOperations([]);
        }
        setOperations(data as OperationEntity[]);

    }, [data, error, loading, loadingPeriods, selectedPeriod]);

    return <div className="pt-10 pb:10 xl:pb-0">

        {!loadingPeriods &&
            <SelectPeriod
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                periodsList={periodsList as PeriodEntity[]}
            />
        }

        <AllOperationsContext.Provider value={{
            operations,
            loading,
        }}>
            {children}
        </AllOperationsContext.Provider>
    </div>
};
