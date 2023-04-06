import {PageContainer} from "../common/PageContainer";
import React from "react";
import {InitModal} from "./InitModal";

export const InitConfig = () => {
    return <PageContainer classes="min-h-[60vh] content-center flex">
        <InitModal/>
    </PageContainer>
};