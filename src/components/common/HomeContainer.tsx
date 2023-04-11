import React from "react";

interface Props {
    children: React.ReactNode;
}

export const HomeContainer = ({children}: Props) => (
    <div className="hero min-h-screen bg">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                {children}
            </div>
        </div>
    </div>
);