import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {OneOperation} from "../OneOperation/OneOperation";
import {AllOperations} from "../AllOperations/AllOperations";
import {AddOperation} from "../AddOperation/AddOperation";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {setDefaultBudgetAmount, setFinancialCushion} from "../../features/user/user-slice";
import {Map} from "../Map/Map";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFinancialCushion(34543.44));
        dispatch(setDefaultBudgetAmount(5000));
    }, [dispatch]);

    return <div className="">

        <Header/>
        <ToastContainer autoClose={10000}/>

            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/add-operation" element={<AddOperation/>}/>
                <Route path="/operation-list" element={<AllOperations/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/operation/:operationId/:edit?" element={<OneOperation/>}/>
            </Routes>


        <Footer/>
    </div>
};
