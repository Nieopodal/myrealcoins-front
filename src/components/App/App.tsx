import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {store} from "../../store";
import {AllOperations} from "../AllOperations/AllOperations";

import './App.css';
import {OneOperation} from "../OneOperation/OneOperation";

export const App = () => {

    return <>

        <Header/>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/operation-list" element={<AllOperations/>}/>
                <Route path="/operation/:operationId" element={<OneOperation/>}/>
            </Routes>
        </Provider>
        <Footer/>
    </>
};
