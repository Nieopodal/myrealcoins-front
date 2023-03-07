import {toast} from "react-toastify";

export enum Toast {
    Success,
    Error,
    Warning,
    Info,
}

export const showToast = (type: Toast, message: string) => {
    switch (type) {
        case (Toast.Success): {
            toast.success(message);
            break;
        }
        case (Toast.Error): {
            toast.error(message);
            break;
        }
        case (Toast.Warning): {
            toast.warning(message);
            break;
        }
        case (Toast.Info): {
            toast.info(message);
            break;
        }
        default: break;
    }
};