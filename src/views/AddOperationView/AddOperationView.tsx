import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Progress} from "../../components/AddOperation/Progress";
import {PageHeader} from "../../components/common/PageHeader";
import {PageContainer} from "../../components/common/PageContainer";
import {AddOperationForm} from "../../components/AddOperation/AddOperationForm";
import {LocalizationSource, UserEntity} from "types";
import ThreeDots from "../../components/common/Loader";

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

interface Props {
    actualUser: UserEntity | null;
}

export const AddOperationView = ({actualUser}: Props) => {

    const methods = useForm<FormData>({
        defaultValues: {
            type: '',
            otherType: '',
            category: '',
            amount: 0,
            description: '',
            isRepetitive: false,
            localization: actualUser ? actualUser.addLocalizationByDefault : false,
            localizationSource: actualUser ? actualUser.localizationSource : LocalizationSource.None,
            image: [] as File[],
            latFromDevice: 0,
            lonFromDevice: 0,
            latFromImage: 0,
            lonFromImage: 0,
        },
    });

    const {getValues} = methods;
    const localizationInput = getValues("localization");
    const localizationSourceInput = getValues("localizationSource");
    const typeInput = getValues("type");
    const amountInput = getValues("amount");

    const [progress, setProgress] = useState<number>(1);

    useEffect(() => {
        if (!getValues("type") && !getValues("amount")) setProgress(1);
        if (getValues("type") && !getValues("amount")) setProgress(2);
        if (getValues("type") && getValues("amount")) setProgress(3);
    }, [localizationInput, localizationSourceInput, typeInput, amountInput, getValues]);

    return <FormProvider {...methods}>
        <PageContainer>
            <PageHeader text="Dodaj operację"/>
            {!actualUser && <ThreeDots/>}
            {actualUser && <>
                <Progress progress={progress}/>
                <AddOperationForm/>
            </>}
        </PageContainer>
    </FormProvider>
};