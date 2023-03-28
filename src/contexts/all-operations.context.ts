import {createContext} from "react";
import { OperationEntity } from "types";

interface AllOperationsContextInterface {
    operations: OperationEntity[] | null,
    loading: boolean,
}

export const AllOperationsContext = createContext<AllOperationsContextInterface>({
    operations: [],
    loading: false,
});