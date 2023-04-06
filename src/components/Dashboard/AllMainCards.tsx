import {ApiResponse, OperationEntity, PeriodEntity} from "types";
import {PageHeader} from "../common/PageHeader";
import {convertDateToMonthAndYearHandler} from "../../utils/convert-date-to-month-and-year-handler";
import {MainStatsCard} from "./MainStatsCard";
import {MainChartCard} from "./MainChartCard";
import {FinancialCushionCard} from "./FinancialCushionCard";
import {LastOperationsCard} from "./LastOperationsCard";
import React, {useEffect, useState} from "react";
import {isAfter} from "date-fns";
import {showToast, Toast} from "../../utils/show-toast";
import {useNavigate} from "react-router-dom";
import ThreeDots from "../common/Loader";
import {RestoreOperationsModal} from "./RestoreOperationsModal";

interface Props {
    actualPeriod: PeriodEntity;
    isPast?: boolean;
}

export const AllMainCards = ({actualPeriod, isPast}: Props) => {
    const navigate = useNavigate();

    const [operationsToRestore, setOperationsToRestore] = useState<OperationEntity[] | null>(null);
    const [shouldEnd, setShouldEnd] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [openRestoreModal, setOpenRestoreModal] = useState<boolean>(false);

    const handleToggle = () => {
        setLoading(true);
        setOpenRestoreModal((prev) => !prev);
    };

    useEffect(() => {
        if (operationsToRestore) {

            handleToggle();
        }
        if (error) {
            showToast(Toast.Error, error);
        }
        if (!loading) {
            setShouldEnd(isAfter(new Date(), new Date(actualPeriod.ends)));

        }

    }, [shouldEnd, error, operationsToRestore]);

    const createNewPeriodHandler = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/period', {
                method: 'POST',
                credentials: 'include',
            });

            const data: ApiResponse<OperationEntity[]> = await res.json();

            if (data.success) {
                console.log('data payload', data.payload)
                setOperationsToRestore(data.payload);
                showToast(Toast.Success, 'Utworzono nowy okres.');
                navigate('/dashboard', {replace: true});
            } else {
                setError(data.error);
            }
        } catch {
            setError('Wystąpił problem podczas próby wykonania zapytania. Spróbuj później');
        } finally {
            setLoading(false);
        }
    };

    return <>

        {openRestoreModal && operationsToRestore &&
            <RestoreOperationsModal open={openRestoreModal} operations={operationsToRestore}/>}
        {!isPast && <PageHeader text="Aktualny okres"/>}

        {!isPast &&
            <h2 className="mx-auto text-base pb-8 w-fit">{convertDateToMonthAndYearHandler(actualPeriod.starts, actualPeriod.ends)}</h2>}

        {!isPast && shouldEnd && <div className="mx-auto w-fit pb-4">
            <button className="btn btn-warning mx-auto flex" onClick={createNewPeriodHandler} disabled={loading}>Zakończ bieżący
                okres
            </button>
            <p className="pt-4 font-semibold text-red-600">Uwaga! bieżący okres powinien zostać zakończony.</p>
        </div>}

        {loading && <ThreeDots/>}

        {!loading && <>
            <div
                className=" xl:grid xl:grid-cols-2 gap-10 w-full pb-0 xl:pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                <MainStatsCard actualPeriod={actualPeriod} isPast={isPast}/>
                <MainChartCard actualPeriod={actualPeriod}/>
                {<FinancialCushionCard previousPeriod={isPast ? actualPeriod : null}/>}
            </div>
            {actualPeriod.id && <LastOperationsCard periodId={actualPeriod.id} isPast={isPast}/>}
        </>
        }
    </>
};