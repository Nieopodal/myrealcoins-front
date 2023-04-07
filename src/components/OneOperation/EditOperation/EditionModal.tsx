import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Modal} from "../../common/Modal/Modal";
import ThreeDots from "../../common/Loader";
import {ErrorMessage} from "../../common/ErrorMessage";
import {OperationEntity, OperationType} from "types";
import {showToast, Toast} from "../../../utils/show-toast";
import {useFetch} from "../../../hooks/useFetch";
import {PaymentCategoryRadios} from "../../common/form/inputs/PaymentCategoryRadios";
import {StepTwoForm} from "../../AddOperation/steps/StepTwoForm";
import {DescriptionInput} from "../../common/form/inputs/DescriptionInput";
import {fetchForm} from "../../../utils/fetch/fetch-form";
import {CollapseContent} from "../../common/CollapseContent";
import {ModalAction} from "../../common/Modal/ModalAction";

interface Props {
    isOperationSchema: boolean;
    operationId: string;
    open: boolean;
    handleToggle: () => void;
    reloadHandler: () => void;
}

export const EditionModal = ({isOperationSchema, operationId, open, handleToggle, reloadHandler}: Props) => {
    const [data, errorFetch, loadingFetch] = useFetch(`operation/${operationId}`);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [responseId, setResponseId] = useState<null | string>(null);
    const [additionalAmount, setAdditionalAmount] = useState<number>(0);
    const [changeAmount, setChangeAmount] = useState<boolean>(false);

    const methods = useForm({
        defaultValues: {
            type: '',
            otherType: '',
            category: '',
            amount: 0,
            description: '',
            lat: 0,
            lon: 0,
        },
    });

    const {setValue, handleSubmit} = methods;
    useEffect(() => {
        if (responseId) {
            showToast(Toast.Success, `Pomyślnie zaktualizowano ${isOperationSchema ? `schemat` : `operację`}.`);
            handleToggle();
        }

        if (data) {
            setValue("type", ((data as OperationEntity).type) + '');
            if ((data as OperationEntity).type === OperationType.Payment) {
                setValue("category", `${(data as OperationEntity).category!}#${(data as OperationEntity).subcategory!}`);
            }
            if ([OperationType.AddToBudget,
                OperationType.AddFromSavings,
                OperationType.AddFromCushion,
                OperationType.BudgetReduction,
            ].includes((data as OperationEntity).type)) {
                setValue("otherType", ((data as OperationEntity).type) + '');
            }

            if (methods.getValues("type") === "1" || methods.getValues("type") === "2" || methods.getValues("otherType") === "3") {
                setChangeAmount(true);
            }

            setValue("description", (data as OperationEntity).description + '');
            setValue("amount", (data as OperationEntity).amount < 0 ? ((data as OperationEntity).amount) * -1 : (data as OperationEntity).amount);
            setAdditionalAmount((data as OperationEntity).amount < 0 ? ((data as OperationEntity).amount) * -1 : (data as OperationEntity).amount);
        }
        setLoading(loadingFetch as boolean);
        setError(errorFetch ? errorFetch as string : null);
        if (error) {
            if (error) showToast(Toast.Error, error);
            setError(null);
        }

    }, [error, loading, loadingFetch, errorFetch, responseId, data]);

    return <FormProvider {...methods}>
        <Modal open={open}>
            <form className="w-fit mx-auto whitespace-normal" onSubmit={handleSubmit(async data => {
                setError(null);
                setLoading(true);

                const outputData = (await fetchForm(data, true, operationId));
                try {
                    if (outputData) {
                        if (outputData.success) {
                            setResponseId(outputData.payload);

                        } else if (outputData.error) {
                            setError(outputData.error);
                        } else {
                            setError('Wystąpił nieznany błąd serwera. Spróbuj później.');
                        }
                    }
                } catch (e) {
                    setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
                } finally {
                    setLoading(false);
                    reloadHandler();
                }
            })
            }>
                {loading && <ThreeDots/>}
                {!loading && error && <ErrorMessage text={error}/>}

                {!loading && data && <div>
                    <h3 className="font-bold text-lg w-fit mx-auto">
                        Edycja {isOperationSchema ? `schematu` : `operacji`}
                    </h3>

                    {(data as OperationEntity).type === OperationType.Payment &&
                        <CollapseContent title="Zmień kategorię płatności">
                            <PaymentCategoryRadios/>
                        </CollapseContent>
                    }

                    <CollapseContent title="Zmień kwotę operacji">
                        {changeAmount && <div>
                            <StepTwoForm hideTitle additionalAmount={additionalAmount}/>
                            <p className="text-red-600 w-fit mx-auto">*włączając aktualną
                                kwotę {isOperationSchema ? `schematu, która może się różnić od kwoty operacji` : `operacji`}
                            </p>
                        </div>
                        }
                        {!changeAmount && <p>Brak możliwości zmiany kwoty dla wybranej operacji.</p>}
                    </CollapseContent>

                    <CollapseContent title="Zmień opis">
                        <div className="mx-auto w-fit">
                            <DescriptionInput/>
                        </div>
                    </CollapseContent>
                </div>
                }
                <ModalAction
                    primaryBtnTitle='Zapisz'
                    primaryBtnDisabled={loading}
                    isBtnSubmit
                    cancelBtnDisabled={loading}
                    cancelBtnHandler={handleToggle}
                    loading={loading}
                />
            </form>
        </Modal>
    </FormProvider>
};