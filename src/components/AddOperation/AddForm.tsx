import {Card} from "../common/Card";
import {StepOneForm} from "./StepOneForm";
import {StepTwoForm} from "./StepTwoForm";
import {StepThreeForm} from "./StepThreeForm";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import ThreeDots from "../common/Loader";
import {ErrorMessage} from "../common/ErrorMessage";
import {fetchForm} from "../../utils/fetch/fetch-form";
import {showToast, Toast} from "../../utils/show-toast";
import {useNavigate} from "react-router-dom";
import useFindUser from "../../hooks/useFindUser";

export const AddForm = () => {
    const {handleSubmit, formState: {errors: formErrors}} = useFormContext();
    const {actualPeriod, isLoading} = useFindUser();

    const [output, setOutput] = useState<string | null>(null);
    const [errors, setErrors] = useState<string | null>(null);

    const [waitToSend, setWaitToSend] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {

        const firstErrorKey = Object.keys(formErrors).find((key) => formErrors[key]);
        if (firstErrorKey) {
            (document.querySelector(
                `input[name="${firstErrorKey}"]`
            ) as HTMLInputElement | null)?.focus();
        }

        if (errors) {
            showToast(Toast.Error, errors);
            setErrors(null);
        }
        if (output) showToast(Toast.Success, 'Pomyślnie dodano nową operację.');
        if (output) navigate('/', {replace: true});
    }, [errors, output, Object.keys(formErrors)]);

    if (isLoading || waitToSend || output) return (
        <Card additionalClasses="mt-10">
            <ThreeDots/>
        </Card>);

    if (actualPeriod !== null) return <form
        noValidate className="mx-auto container justify-center xl:w-[80%]"
        onSubmit={handleSubmit((data) => {
            (async () => {
                setWaitToSend(true);
                const outputData = await fetchForm(data, false);
                try {
                    if (outputData) {
                        if (outputData.success) {
                            setOutput(outputData.payload);
                        } else if (outputData.error) {
                            setErrors(outputData.error);
                        } else {
                            setErrors('Wystąpił nieznany błąd serwera. Spróbuj później.');
                        }
                    }
                } catch (e) {
                    setErrors(`Wystąpił błąd podczas próby wykonania zapytania.`);
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