import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {OneOperation} from "../OneOperation/OneOperation";
import {AddOperation} from "../AddOperation/AddOperation";
import {AllOperationList} from "../AllOperations/AllOperationList";
import {ContainerForMap} from "../Map/ContainerForMap";
import {PastPeriods} from "../PastPeriods/PastPeriods";
import useFindUser from "../../hooks/useFindUser";
import {UserContext} from '../../contexts/user.context';
import {PrivateRoute} from "../Auth/PrivateRoute";
import {Home} from "../../views/Home";
import {Login} from "../Login/Login";
import {Register} from "../Auth/Register";
import {store} from "../../store";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {

    const {user, setUser, isLoading, actualPeriod, setActualPeriod, error} = useFindUser();


    return <div>
        <UserContext.Provider value={{user, setUser, isLoading, actualPeriod, setActualPeriod, error}}>

            <Header/>

            <ToastContainer autoClose={5000}/>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/dashboard" element={<PrivateRoute outlet={<Dashboard/>}/>}/>
                    <Route path="/add-operation" element={<PrivateRoute outlet={<AddOperation actualUser={user}/>}/>}/>
                    <Route path="/operation-list" element={<PrivateRoute outlet={<AllOperationList/>}/>}/>
                    <Route path="/map" element={<PrivateRoute outlet={<ContainerForMap/>}/>}/>
                    <Route path="/operation/:operationId" element={<PrivateRoute outlet={<OneOperation/>}/>}/>
                    <Route path="/past-periods" element={<PrivateRoute outlet={<PastPeriods/>}/>}/>

                </Routes>
            </Provider>
            <Footer/>

        </UserContext.Provider>
    </div>
};
