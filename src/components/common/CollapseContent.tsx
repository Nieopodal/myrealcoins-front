import React, {ReactNode} from "react";

interface Props {
    children: ReactNode;
    title: string;
}

export const CollapseContent = ({children, title}: Props) => (
    <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-4">
        <input type="checkbox"/>
        <div className="collapse-title btn-md font-medium">
            {title}
        </div>
        <div className="collapse-content">
            {children}
        </div>
    </div>
);