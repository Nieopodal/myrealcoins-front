import {ApiResponse} from "types";
import {fetchHandler} from "./fetch-handler";
import {apiUrl} from "../../config/api";

export const fetchDelete = async (id: string) => {
    try {
        const res = await fetchHandler(`${apiUrl}/api/operation/${id}`, "DELETE");
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