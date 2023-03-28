import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {OneOperation} from "../OneOperation/OneOperation";
import {AddOperation} from "../AddOperation/AddOperation";
import {setDefaultBudgetAmount, setFinancialCushion} from "../../features/user/user-slice";
import {AllOperationList} from "../AllOperations/AllOperationList";
import {ContainerForMap} from "../Map/ContainerForMap";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

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
                <Route path="/operation-list" element={<AllOperationList/>}/>
                <Route path="/map" element={<ContainerForMap/>}/>
                <Route path="/operation/:operationId" element={<OneOperation/>}/>
            </Routes>


        <Footer/>
    </div>
};
