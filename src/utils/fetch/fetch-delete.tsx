import {ApiResponse} from "types";
import {fetchHandler} from "./fetch-handler";

export const fetchDelete = async (id: string) => {
    try {
        const res = await fetchHandler(`http://localhost:3001/operation/${id}`, "DELETE");
        const data: ApiResponse<boolean> = await res.json();

        if (data) {
            return data;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};