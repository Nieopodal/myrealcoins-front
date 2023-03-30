import {usePeriods} from "../../hooks/usePeriods";
import React, {useEffect, useState} from "react";
import {SelectPeriod} from "../common/SelectPeriod";
import {ApiResponse, PeriodEntity} from "types";
import {Card} from "../common/Card";
import {useActualPeriod} from "../../hooks/useActualPeriod";
import {PageHeader} from "../common/PageHeader";
import {PageContainer} from "../common/PageContainer";
import {AllMainCards} from "../Dashboard/AllMainCards";
import ThreeDots from "../common/Loader";
import {ErrorMessage} from "../common/ErrorMessage";

export const PastPeriods = () => {
    const [actualPeriod, loadingActualPeriod, errorActualPeriod] = useActualPeriod();

    const [periodsList, , loadingPeriods] = usePeriods();
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodEntity | null>(null);

    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (selectedPeriodId.length > 0) {
            (async () => {
                try {
                    const res = await fetch(`http://localhost:3001/period/${selectedPeriodId}`);
                    const data: ApiResponse<PeriodEntity | null> = await res.json();
                    if (data.success) {
                        if (data.payload === null) {
                            setError('Wystąpił błąd.');
                        }
                        if (data.payload) {
                            console.log(data.payload)
                            setSelectedPeriod(data.payload as PeriodEntity);
                        }
                    }
                    else {
                        setError('Wystąpił nieznany błąd serwera.')
                    }
                } catch {
                    setError('Wystąpił błąd serwera.');
                }
            })();
        }
    }, [selectedPeriodId]);

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
        {(loadingActualPeriod || loadingPeriods) && <ThreeDots/>}

        {(error || errorActualPeriod) && <ErrorMessage/>}

            {!selectedPeriodId && !loadingPeriods && <Card additionalClasses="text-center mx-auto xl:w-[90%] 2xl:w-[80%] py-8 xl:px-2 text-xs md:text-base">Nie wybrano okresu.</Card>}

            {selectedPeriod !== null && <AllMainCards actualPeriod={selectedPeriod} isPast/>}

        </PageContainer>
};