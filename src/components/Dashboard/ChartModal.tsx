import {Modal} from "../common/Modal";
import React, {useEffect, useState} from "react";
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
    useEffect(() => {
        try {
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

            <div className="py-4 w-fit mx-auto">
                {loading && <ThreeDots/>}

                {!loading &&<Chart labels={categories} amounts={amounts}
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