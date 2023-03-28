import React, {useContext} from "react";


import {OperationsTable} from "../common/OperationsTable";
import {AllOperationsContext} from "../../contexts/all-operations.context";

export const AllOperationsTable = () => {
    const {operations, loading} = useContext(AllOperationsContext);

    return <OperationsTable operations={operations ?? []} title={`Lista operacji`} loading={loading as boolean}/>
};