import React from "react";
import {Card} from "../common/Card";

export const LastOperationsCard = () => {

    return <Card additionalClasses="mx-auto xl:w-[90%] 2xl:w-[80%] pt-4 xl:px-2 text-xs md:text-base" btnDescription="Lista operacji" btnAction={()=>{}}>
        <h3 className="card-title mx-auto w-fit pt-2">Ostatnie operacje</h3>
        <div className="overflow-x-auto card-body px-0 w-full rounded-none pb-0">
            <table className="table table-zebra w-full">

                <thead>
                <tr>
                    <th>Rodzaj</th>
                    <th>Kwota</th>
                    <th>Data</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Quality Control</td>
                    <td>-49,90</td>
                    <td>2023.01.03</td>
                    <td><a href="/">Szczegóły</a></td>
                </tr>

                <tr>
                    <td>Desktop Support </td>
                    <td>-49,90</td>
                    <td>2023.01.03</td>
                    <td><a href="/">Szczegóły</a></td>
                </tr>

                <tr>
                    <td>Tax Accountant</td>
                    <td>+49,90</td>
                    <td>2023.01.03</td>
                    <td><a href="/">Szczegóły</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    </Card>
};