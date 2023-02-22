import React from "react";
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Kwota',
            data: [20, 14, 24, 43, 23, 54],
            backgroundColor: '#9BD0F5'
        }],
    };

    return <>

        <div className="container mx-auto py-8 text-justify md:px-4 block">
            <h1 className="mx-auto text-4xl font-semibold w-fit mb-2">Aktualny okres</h1>
            <h3 className="mx-auto text-base pb-8 w-fit">Luty 2023</h3>

            <div className=" xl:grid xl:grid-cols-2 gap-10  w-full pb-10 xl:w-[90%] 2xl:w-[80%] mx-auto flex-nowrap">
                <div className="card border-[1px] shadow-md  mb-10 overflow-hidden xl:mb-0">

                    <div className="stats stats-horizontal h-[50%] border-b-[1px] rounded-none xl:py-5 ">
                        <div className="stat sm:px-auto ">
                            <div className="stat-title text-xs xl:text-base font-semibold">Budżet [PLN]</div>
                            <div className="stat-value text-base xl:text-2xl">500000,00</div>
                            <div className="stat-desc">Luty 2023</div>
                            <div className="stat-desc pt-2">
                                <button className="btn btn-xs btn-outline">Więcej</button>
                            </div>
                        </div>

                        <div className="stat px-2 sm:px-auto">
                            <div className="stat-title text-xs xl:text-base">Wydatki [PLN]</div>
                            <div className="stat-value text-base xl:text-2xl">400000,00</div>
                            <div className="stat-desc">80%</div>
                            <div className="stat-desc pt-2">
                                <button className="btn btn-xs btn-outline">Więcej</button>
                            </div>
                        </div>

                        <div className="stat px-2 sm:px-auto">
                            <div className="stat-title text-xs xl:text-base">Oszczędności [PLN]</div>
                            <div className="stat-value text-base xl:text-2xl">100000,00</div>
                            <div className="stat-desc">10%</div>
                            <div className="stat-desc pt-2">
                                <button className="btn btn-xs btn-outline">Więcej</button>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center card-body align-center">

                        <div className="flex">
                            <div className="">
                                <div className="stat-title xl:text-lg">Saldo bieżące [PLN]</div>
                                <div className="stat-value xl:text-5xl">34346,54</div>
                            </div>

                        </div>

                    </div>
                    <div className="card-actions justify-end pb-5 pr-5">
                        <button className="btn btn-outline btn-xs text-sm rounded-btn">Lokalizacje transakcji</button>
                    </div>

                </div>
                <div className="card shadow-md flex p-5 border-[1px]">
                    <div className="h-80 items-center mx-auto">
                        <Doughnut
                            data={data}
                        />
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-xs text-sm rounded-btn">Zobacz szczegóły</button>
                    </div>

                </div>

                <div className="card shadow-md border-[1px] mt-10 xl:mt-0 pl-7 pt-7 pb-8">
                    <div className="stat-title xl:text-lg ">
                        <h3>Całkowita poduszka finansowa [PLN]</h3>
                    </div>
                    <div className="stat-value">54503,45</div>
                </div>
            </div>


            <div
                className="mx-auto card bg-base-100 shadow-md xl:w-[90%] 2xl:w-[80%] pt-4 px-5 text-xs md:text-base border-[1px] block">
                <h2 className="card-title mx-auto w-fit pt-2">Ostatnie operacje</h2>
                <div className="overflow-x-auto card-body px-0 w-full">
                    <table className="table table-zebra w-full">

                        <thead>
                        <tr>
                            <th></th>
                            <th>Typ</th>
                            <th>Rodzaj</th>
                            <th>Kwota</th>
                            <th>Data</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>49,90</td>
                            <td>Blue</td>
                        </tr>

                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>49,90</td>
                            <td>Purple</td>
                        </tr>

                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>49,90</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="card-actions justify-center pt-4">
                        <button className="btn btn-outline btn-xs text-sm rounded-btn ">Lista operacji</button>
                    </div>
                </div>
            </div>

        </div>
    </>
};