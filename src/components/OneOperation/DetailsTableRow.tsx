import React, {ReactNode} from "react";

interface Props {
    children: ReactNode;
    title: string;
}

export const DetailsTableRow = ({title, children}: Props) => (
    <tr>
        <th>{title}</th>
        <td>
            {children}
        </td>
    </tr>
);