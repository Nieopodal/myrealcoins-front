import {Card} from "../../components/common/Card";
import {NavLink} from "react-router-dom";

export const NotFoundView = () => {
    return <Card additionalClasses="mt-10 mx-auto sm:w-[60%] md:max-w-md py-10 xl:px-2 text-xs md:text-base">
        <p className="w-fit mx-auto pb-8 font-semibold text-red-600">Nie odnaleziono zasobu.</p>
        <NavLink to="/" className="btn btn-sm btn-outline w-fit mx-auto">Strona główna</NavLink>
    </Card>
};