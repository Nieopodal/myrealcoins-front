import {Modal} from "../common/Modal";
import React, {useEffect, useRef, useState} from "react";
import {Chart} from "../common/Chart";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {getPaymentsCategoriesAndAmountsHandler} from "../../utils/get-payment-categories-amounts-handler";
import ThreeDots from "../common/Loader";

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
    // '#4C8076', '#D70000', '#7C7484', '#372B47', '#E5F3FA', '#560DF6'
    const neutral = window.getComputedStyle(document.body).getPropertyValue('--n');
    const primary = window.getComputedStyle(document.body).getPropertyValue('--p');
    const warning = window.getComputedStyle(document.body).getPropertyValue('--wa');
    const success = window.getComputedStyle(document.body).getPropertyValue('--su');

    const neutralRef = useRef<HTMLDivElement>(null);
    const primaryRef = useRef<HTMLDivElement>(null);
    const warningRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (neutralRef.current &&
                primaryRef.current &&
                warningRef.current &&
                successRef.current
            ) {
                setColors([
                    neutralRef.current.style.backgroundColor,
                    primaryRef.current.style.backgroundColor,
                    warningRef.current.style.backgroundColor,
                    successRef.current.style.backgroundColor,
                ]);
            }
            const result = getPaymentsCategoriesAndAmountsHandler(operations);
            setAmounts(result.amounts);
            setCategories(result.categories);
            const categoriesLength = result.categories.length;
            setColors(prev => {
                const newColors = [...prev];
                newColors.length = categoriesLength;
                return newColors;
            });
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

                {(!loading && operations.length === 0) && <p className="w-fit mx-auto">Brak operacji do wyświetlenia.</p>}
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