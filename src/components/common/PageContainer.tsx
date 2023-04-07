import React from "react";

interface Props {
    children: React.ReactNode;
    classes?: string;
}

export const PageContainer = ({children, classes}: Props) => (
    <div className={classes ?? `container mx-auto pt-8 text-justify md:px-4 block min-h-[70vh]`}>{children}</div>
);