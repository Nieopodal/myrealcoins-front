import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ApiResponse} from "types";
import ThreeDots from "../../components/common/Loader";
import {Card} from "../../components/common/Card";
import {MainHeaderBtn} from "../../components/Header/MainHeaderBtn";
import {ErrorMessage} from "../../components/common/ErrorMessage";
import {apiUrl} from "../../config/api";

export const ActivateAccountView = () => {
    const {code} = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [activated, setActivated] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/user/confirm/${code}`);
                const data: ApiResponse<string> = await res.json();
                if (data.success) {
                    setActivated(true);
                } else {
                    setError(data.error);
                }
            } catch {
                setError('Podczas próby wykonania zapytania wystąpił błąd.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return <Card additionalClasses="mt-10 mx-auto sm:w-[60%] md:max-w-md py-4 xl:px-2 text-xs md:text-base">
        <h3 className="card-title mx-auto w-fit pt-4">Aktywacja konta</h3>
        {loading && <ThreeDots/>}

        {!loading && activated && !error && <div className="pt-4 mx-auto w-fit font-semibold">Konto zostało aktywowane.
            <div className="modal-action justify-center">
                <MainHeaderBtn user={null}/>
            </div></div>}

        {!loading && error && <div className="mx-auto w-fit font-semibold"><ErrorMessage text={error}/></div>}
    </Card>
};