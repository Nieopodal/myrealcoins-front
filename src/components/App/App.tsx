import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {OneOperation} from "../OneOperation/OneOperation";
import {AllOperations} from "../AllOperations/AllOperations";
import {AddOperation} from "../AddOperation/AddOperation";
import {store} from "../../store";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

    return <div className="">

        <Header/>
        <ToastContainer autoClose={10000}/>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/add-operation" element={<AddOperation/>}/>
                <Route path="/operation-list" element={<AllOperations/>}/>
                <Route path="/operation/:operationId" element={<OneOperation/>}/>
            </Routes>

        </Provider>
        <Footer/>
    </div>
};
