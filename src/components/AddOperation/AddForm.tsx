import {Card} from "../common/Card";
import {StepOneForm} from "./StepOneForm";
import {StepTwoForm} from "./StepTwoForm";
import {StepThreeForm} from "./StepThreeForm";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useActualPeriod} from "../../hooks/useActualPeriod";
import ThreeDots from "../common/Loader";
import {ErrorMessage} from "../common/ErrorMessage";
import {fetchForm} from "../../utils/fetchForm";
import {showToast, Toast} from "../../utils/show-toast";
import {useNavigate} from "react-router-dom";

export const AddForm = () => {
    const {handleSubmit} = useFormContext();
    const [actualPeriod, loading] = useActualPeriod();

    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [waitToSend, setWaitToSend] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) showToast(Toast.Error, error);
        if (output) showToast(Toast.Success, 'Pomyślnie dodano nową operację.');
        if (output) navigate('/', {replace: true});
    }, [error, output]);

    if (loading || waitToSend || output) return (
        <Card additionalClasses="mt-10">
            <ThreeDots/>
        </Card>);

    if (actualPeriod !== null) return <form noValidate className="mx-auto container justify-center xl:w-[80%]"
                                            onSubmit={handleSubmit((data) => {
                                                (async () => {
                                                    setWaitToSend(true);
                                                    const outputData = await fetchForm(data);
                                                    try {
                                                        if (outputData) {
                                                            if (outputData.success) {
                                                                setOutput(outputData.payload);
                                                            } else if (outputData.error) {
                                                                setError(outputData.error);
                                                            } else {
                                                                setError('Wystąpił nieznany błąd serwera. Spróbuj później.');
                                                            }
                                                        }
                                                    } catch (e) {
                                                        setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
                                                    } finally {
                                                        setWaitToSend(false);
                                                    }
                                                })();
                                            })
                                            }>
        <Card additionalClasses="mt-10">
            <StepOneForm/>
            <StepTwoForm/>
            <StepThreeForm/>
            <button className="btn btn-primary">Zapisz</button>
        </Card>
    </form>;

    else return <Card additionalClasses="mt-10">
        <ErrorMessage/>
    </Card>;
};