import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {OperationsTable} from "../common/OperationsTable";

export const AllOperations = () => {
    const {operations} = useSelector((state: RootState) => state.operations);

    return <OperationsTable operations={operations} title="Lista operacji w obecnym okresie" btnAction={() => {}}/>;
};