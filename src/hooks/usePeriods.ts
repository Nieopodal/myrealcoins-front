import {useEffect, useState} from "react";
import { PeriodEntity } from "types";
import {showToast, Toast} from "../utils/show-toast";
import {useFetch} from "./useFetch";

export const usePeriods = () => {
    const [data, error, loading] = useFetch(`period`);

    const [periodList, setPeriodList] = useState<PeriodEntity[] | null>(null);
    const [loadingPeriods, setLoadingPeriods] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            if (error) {
                showToast(Toast.Error, error as string);
            } else if (data === null) {
                setPeriodList(([]));
            } else if (data) {
                setPeriodList(data as PeriodEntity[]);
                setLoadingPeriods(false);
            }
        })();
    }, [error, loading]);

    return [periodList, setPeriodList, loadingPeriods];
};