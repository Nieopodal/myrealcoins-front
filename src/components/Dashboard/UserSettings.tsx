import {Card} from "../common/Card";
import React, {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {UserSettingsForm} from "./UserSettingsForm";
import ThreeDots from "../common/Loader";

export const UserSettings = () => {
    const {actualPeriod, isLoading, user} = useContext(UserContext);

    return <Card additionalClasses="mt-10 mx-auto sm:w-[60%]  md:max-w-md py-4 xl:px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4">Ustawienia</h3>
        {isLoading && <ThreeDots/>}
        {user && !isLoading && <UserSettingsForm user={user} actualPeriod={actualPeriod}/>}
    </Card>
};