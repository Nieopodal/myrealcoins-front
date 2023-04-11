import React, {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {UserSettingsForm} from "../../components/UserSettingsForm/UserSettingsForm";
import ThreeDots from "../../components/common/Loader";
import {SmallCard} from "../../components/common/Card/SmallCard";

export const UserSettingsView = () => {
    const {actualPeriod, isLoading, user} = useContext(UserContext);

    return <SmallCard title="Ustawienia">
        {isLoading && <ThreeDots/>}
        {user && !isLoading && <UserSettingsForm user={user} actualPeriod={actualPeriod}/>}
    </SmallCard>
};