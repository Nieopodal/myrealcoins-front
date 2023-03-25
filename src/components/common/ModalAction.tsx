import React from "react";

interface Props {
    primaryBtnTitle: string;
    primaryBtnDisabled: boolean;
    primaryBtnHandler?: () => void;
    isBtnSubmit?: boolean;
    cancelBtnDisabled: boolean;
    cancelBtnHandler: () => void;
    loading: boolean;
}

export const ModalAction = ({
                                cancelBtnHandler,
                                cancelBtnDisabled,
                                primaryBtnHandler,
                                primaryBtnTitle,
                                primaryBtnDisabled,
                                loading,
                                isBtnSubmit,
                            }: Props) => (
    <div className="modal-action justify-center">
        <button disabled={primaryBtnDisabled}
                className={`btn btn-primary ${loading ? 'loading' : ``}`}
                type={isBtnSubmit ? `submit` : `button`}
            onClick={primaryBtnHandler}>
            {loading ? `Proszę czekać` : primaryBtnTitle}
        </button>
        <button disabled={cancelBtnDisabled} className="btn btn-outline" onClick={cancelBtnHandler}>
            Anuluj
        </button>
    </div>
);