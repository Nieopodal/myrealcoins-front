import { ApiResponse } from "types";

export const fetchDelete = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3001/operation/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
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