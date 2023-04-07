import React, {useEffect, useRef, useState} from "react";
import {Modal} from "../common/Modal/Modal";
import {Chart} from "../common/Chart";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {getPaymentsCategoriesAndAmountsHandler} from "../../utils/handlers/get-payment-categories-amounts-handler";
import ThreeDots from "../common/Loader";
import {chartColorHandler} from "../../utils/handlers/chart-color-handler";

interface Props {
    open: boolean;
    handleToggle: () => void;
}

export const ChartModal = ({open, handleToggle}: Props) => {

    const {operations} = useSelector((state: RootState) => state.operations);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [amounts, setAmounts] = useState<number[]>([]);
    const [colors, setColors] = useState<string[]>(['#0066FF', '#FF0074', '#FF7244', '#FFBE3A',]);

    const neutral = window.getComputedStyle(document.body).getPropertyValue('--n');
    const primary = window.getComputedStyle(document.body).getPropertyValue('--p');
    const warning = window.getComputedStyle(document.body).getPropertyValue('--wa');
    const success = window.getComputedStyle(document.body).getPropertyValue('--su');

    const neutralRef = useRef<HTMLDivElement>(null);
    const primaryRef = useRef<HTMLDivElement>(null);
    const warningRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const result = getPaymentsCategoriesAndAmountsHandler(operations);
        setCategories(result.categories);
        setAmounts(result.amounts);
        try {
            if (neutralRef.current &&
                primaryRef.current &&
                warningRef.current &&
                successRef.current
            ) {
                const sortedColors = chartColorHandler(
                    result.colors,
                    neutralRef.current!.style.backgroundColor,
                    primaryRef.current!.style.backgroundColor,
                    warningRef.current!.style.backgroundColor,
                    successRef.current!.style.backgroundColor
                )
                setColors(sortedColors);
            }
        } finally {
            setLoading(false);
        }
    }, [operations]);

    return (
        <Modal open={open}>
            <h3 className="font-bold text-lg w-fit mx-auto">
                Struktura wydatków
            </h3>
            <div className="hidden">
                <div ref={neutralRef} style={{
                    background: `hsl(${neutral})`,
                }}>
                </div>
                <div ref={primaryRef} style={{
                    background: `hsl(${primary})`,
                }}>
                </div>
                <div ref={warningRef} style={{
                    background: `hsl(${warning})`,
                }}>
                </div>
                <div ref={successRef} style={{
                    background: `hsl(${success})`,
                }}>
                </div>
            </div>

            <div className="py-4 w-fit mx-auto">
                {loading && <ThreeDots/>}

                {(!loading && operations.length === 0) &&
                    <p className="w-fit mx-auto">Brak operacji do wyświetlenia.</p>}
                {!loading && <Chart labels={categories} amounts={amounts}
                                    backgroundColors={colors}/>}
            </div>

            <div className="modal-action">
                <button className="btn btn-primary" onClick={handleToggle}>
                    Zamknij
                </button>
            </div>
        </Modal>
    );
};