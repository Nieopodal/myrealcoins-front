import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Progress} from "./Progress";
import {PageHeader} from "../common/PageHeader";
import {PageContainer} from "../common/PageContainer";
import {AddForm} from "./AddForm";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { LocalizationSource } from "types";

export interface FormData {
    type: string;
    otherType: string;
    category: string;
    amount: number;
    description: string;
    isRepetitive: boolean;
    localization: boolean;
    localizationSource: LocalizationSource;
    image: File[];
    latFromDevice: number;
    lonFromDevice: number;
    latFromImage: number;
    lonFromImage: number;
}

export const AddOperation = () => {

    const {actualUser} = useSelector((state: RootState) => state.user);

    const methods = useForm<FormData>({
        defaultValues: {
            type: '',
            otherType: '',
            category: '',
            amount: 0,
            description: '',
            isRepetitive: false,
            localization: actualUser.addLocalizationByDefault,
            localizationSource: actualUser.localizationSource,
            image: [] as File[],
            latFromDevice: 0,
            lonFromDevice: 0,
            latFromImage: 0,
            lonFromImage: 0,
        },
    });

    const { getValues, watch} = methods;

    watch(["type", "localization", "localizationSource", "amount"]);
    const [progress, setProgress] = useState<number>(1);

    useEffect(() => {
        if (!getValues("type") && !getValues("amount")) setProgress(1);
        if (getValues("type") && !getValues("amount")) setProgress(2);
        if (getValues("type") && getValues("amount")) setProgress(3);
        // if (getValues("localization") === false) {
        //     setValue("localization-from-photo", false);
        // }
    }, [getValues("localization"), getValues("localizationSource"), getValues("type"), getValues("amount")])

    return <FormProvider {...methods}>

        <PageContainer>
            <PageHeader text="Dodaj operację"/>
            <Progress progress={progress}/>
            <AddForm/>
        </PageContainer>
    </FormProvider>
};