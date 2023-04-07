import React, {useEffect, useState} from "react";
import {usePeriods} from "../../hooks/usePeriods";
import {SelectPeriod} from "../../components/common/SelectPeriod";
import {ApiResponse, PeriodEntity} from "types";
import {Card} from "../../components/common/Card";
import {PageHeader} from "../../components/common/PageHeader";
import {PageContainer} from "../../components/common/PageContainer";
import {AllMainCards} from "../../components/Dashboard/AllMainCards/AllMainCards";
import ThreeDots from "../../components/common/Loader";
import {ErrorMessage} from "../../components/common/ErrorMessage";
import useFindUser from "../../hooks/useFindUser";
import {apiUrl} from "../../config/api";

export const PastPeriodsView = () => {
    const {actualPeriod, isLoading, error: errorActualPeriod} = useFindUser();

    const [periodsList, , loadingPeriods] = usePeriods();
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodEntity | null>(null);

    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (selectedPeriodId.length > 0) {
            (async () => {
                try {
                    const res = await fetch(`${apiUrl}/api/period/${selectedPeriodId}`, {
                        credentials: 'include',
                    });
                    const data: ApiResponse<PeriodEntity | null> = await res.json();
                    if (data.success) {
                        if (data.payload === null) {
                            setError('Wystąpił błąd.');
                        }
                        if (data.payload) {
                            setSelectedPeriod(data.payload as PeriodEntity);
                        }
                    } else {
                        setError('Wystąpił nieznany błąd serwera.')
                    }
                } catch {
                    setError('Wystąpił błąd serwera.');
                }
            })();
        }
    }, [selectedPeriodId]);

    if (!actualPeriod) return <ThreeDots/>

    return <PageContainer>
        <PageHeader text="Szczegóły minionego okresu"/>
        {!loadingPeriods &&
            <SelectPeriod
                selectedPeriod={selectedPeriodId}
                setSelectedPeriod={setSelectedPeriodId}
                periodsList={periodsList as PeriodEntity[]}
                disableActual
                actualPeriodId={(actualPeriod as PeriodEntity).id}
                additionalClasses="pt-4"
            />
        }
        {(isLoading || loadingPeriods) && <ThreeDots/>}
        {(error || errorActualPeriod) && <ErrorMessage/>}
        {!selectedPeriodId && !loadingPeriods &&
            <Card additionalClasses="text-center mx-auto xl:w-[90%] 2xl:w-[80%] py-8 xl:px-2 text-xs md:text-base">Nie
                wybrano okresu.</Card>}
        {selectedPeriod !== null && <AllMainCards actualPeriod={selectedPeriod} isPast/>}
    </PageContainer>
};