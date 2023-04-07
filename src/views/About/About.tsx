import {Card} from "../../components/common/Card";
import React from "react";

export const About = () => {
    return <div className="hero min-h-screen bg">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <Card additionalClasses="mt-10 mx-auto p-4 xl:px-2 text-xs md:text-base">
                    <div>
                        <p className="w-fit mx-auto pb-2 md:font-semibold text-lg">
                            Copyright by Niepodal - 2023
                        </p>

                        <p className="w-fit mx-auto pb-2 hover:underline">
                            <a href="mailto:nieopodal.dev@gmail.com">contact me</a>
                        </p>

                        <p className="w-fit mx-auto text-sm underline">
                            <a href="https://www.flaticon.com/free-icons/budget"
                               title="budget icons">Favicon: Budget icons created by nangicon - Flaticon
                            </a>
                        </p>

                        <p className="w-fit mx-auto text-sm">
                            Main photo by: &nbsp;
                            <a className=" underline"
                               href="https://unsplash.com/@tfrants?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                Tyler Franta
                            </a> on &nbsp;
                            <a className="underline"
                               href="https://unsplash.com/photos/iusJ25iYu1c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                Unsplash
                            </a>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    </div>
};