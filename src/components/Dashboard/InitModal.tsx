import {Modal} from "../common/Modal";
import React, { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import './InitModal.css'

export const InitModal = () => {

    const navigate = useNavigate();
    const [disableBtn, setDisableBtn] = useState<boolean>(true);

    const listOfFunctions = [
        'Aplikacja ułatwia zarządzanie budżetem poprzez m.in.:',
        'Automatyczne tworzenie miesięcznych budżetów',
        'Tworzenie szczegółowych analiz operacji z wykorzystaniem wykresów',
        'Szybkie dodawanie operacji z podziałem na wiele kategorii',
        'Dodawanie paragonów do płatności',
        'Możliwość oznaczania płatności na mapie',
        'Planowanie przyszłości poprzez dodawanie operacji cyklicznych (tzw. schematy)',
        'Pomoc w tworzeniu poduszki finansowej',
        'Możliwość przeglądania poprzednich okresów',
    ];

    const animStr = (i: number, duration: number, delay: number) => `fadeIn ${duration}ms ease-out ${delay * (i + 1)}ms forwards`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisableBtn(false);
        }, 20000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);


    return <Modal open={true}>

        <h3 className="font-bold text-xl w-fit mx-auto block">
            Witaj w MyRealCoins!
        </h3>

        <div className=" mx-auto w-fit p-4">
            <ul className="p-2">
                {
                    listOfFunctions.map(
                        (el, index) => <li
                            key={index}
                            className={index === 0 ? 'font-semibold pb-4' : 'list-disc'}
                            style={{
                                opacity: 0,
                                animation: animStr(index, 500, 2000),
                            }}>{el}
                        </li>)
                }
            </ul>
        </div>
        <div className="modal-action justify-center ">

                <button className={`btn btn-outline ${disableBtn ? 'hidden' : ''}`} onClick={() => navigate('/settings', {replace: true})} disabled={disableBtn}>
                    Rozpocznij konfigurację
                </button>

        </div>

    </Modal>
};