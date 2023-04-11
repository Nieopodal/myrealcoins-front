import React from "react";
import {HomeContainer} from "../../components/common/HomeContainer";
import {SmallCard} from "../../components/common/Card/SmallCard";

export const About = () => {
    return <HomeContainer>
        <SmallCard innerClasses="mt-10 mx-auto p-4 xl:px-2 text-xs md:text-base">
            <div>
                <p className="w-fit mx-auto pb-2 md:font-semibold text-lg">
                    Copyright by Niepodal - 2023
                </p>

                <p className="w-fit mx-auto pb-2 hover:underline">
                    <a href="mailto:nieopodal.dev@gmail.com">contact</a>
                </p>

                <p className="w-fit mx-auto text-sm">
                    Favicon: &nbsp;
                    <a href="https://www.flaticon.com/free-icons/budget" className="underline"
                       title="budget icons">Budget icons created by nangicon - Flaticon
                    </a>
                </p>

                <p className="w-fit mx-auto text-sm">
                    Main photo: &nbsp;
                    <a className=" underline"
                       href="https://unsplash.com/@tfrants?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Tyler Franta
                    </a> &nbsp; on &nbsp;
                    <a className="underline"
                       href="https://unsplash.com/photos/iusJ25iYu1c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Unsplash
                    </a>
                </p>
            </div>
        </SmallCard>
    </HomeContainer>
};