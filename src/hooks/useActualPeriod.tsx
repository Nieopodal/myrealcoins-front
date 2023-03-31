import {useFetch} from "./useFetch";
import {useEffect} from "react";
import {showToast, Toast} from "../utils/show-toast";
import {setActual} from "../features/period/period-slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {PeriodEntity} from "types";

export const useActualPeriod = () => {
    const dispatch = useDispatch();
    const {actualPeriod} = useSelector((state: RootState) => state.period);
    const [data, error, loading] = useFetch(`period/actual`);

    useEffect(() => {
        if (error) {
            showToast(Toast.Error, error as string);
        }
        if (data) {
            dispatch(setActual(data as PeriodEntity));
        }
        console.log('actual period', actualPeriod);

    }, [data]);

    return [actualPeriod, loading, error];
};