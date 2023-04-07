import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Header} from "../Header/Header";
import {DashboardView} from "../../views/DashboardView/DashboardView";
import {Footer} from "../Footer/Footer";
import {OneOperationView} from "../../views/OneOperationView/OneOperationView";
import {AddOperationView} from "../../views/AddOperationView/AddOperationView";
import {AllOperationsView} from "../../views/AllOperationsView/AllOperationsView";
import {MapView} from "../../views/MapView/MapView";
import {PastPeriodsView} from "../../views/PastPeriodsView/PastPeriodsView";
import useFindUser from "../../hooks/useFindUser";
import {UserContext} from '../../contexts/user.context';
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import {HomeView} from "../../views/HomeView/HomeView";
import {LoginView} from "../../views/LoginView/LoginView";
import {RegisterView} from "../../views/RegisterView/RegisterView";
import {store} from "../../store";
import {UserSettingsView} from "../../views/UserSettingsView/UserSettingsView";
import {ActivateAccountView} from "../../views/ActivateAccountView/ActivateAccountView";
import {ResetPwdWithTokenView} from "../../views/ResetPwdWithTokenView/ResetPwdWithTokenView";
import {ResetPwdWithEmailView} from "../../views/ResetPwdWithEmailView/ResetPwdWithEmailView";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {About} from "../../views/About/About";

export const App = () => {
    const {user, setUser, isLoading, actualPeriod, setActualPeriod, error} = useFindUser();

    return <UserContext.Provider value={{user, setUser, isLoading, actualPeriod, setActualPeriod, error}}>
        <div className="AppContainer">
            <Header/>
            <ToastContainer autoClose={5000}/>
            <Provider store={store}>
                <main className=".Main my-auto">
                    <Routes>
                        <Route path="/" element={<HomeView/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<LoginView/>}/>
                        <Route path="/register" element={<RegisterView/>}/>
                        <Route path="/confirm/:code" element={<ActivateAccountView/>}/>
                        <Route path="/reset-password" element={<ResetPwdWithEmailView/>}/>
                        <Route path="/reset/:userId/:code" element={<ResetPwdWithTokenView/>}/>
                        <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>
                        <Route path="/settings" element={<PrivateRoute outlet={<UserSettingsView/>}/>}/>
                        <Route path="/add-operation"
                               element={<PrivateRoute outlet={<AddOperationView actualUser={user}/>}/>}/>
                        <Route path="/operation-list" element={<PrivateRoute outlet={<AllOperationsView/>}/>}/>
                        <Route path="/map" element={<PrivateRoute outlet={<MapView/>}/>}/>
                        <Route path="/operation/:operationId"
                               element={<PrivateRoute outlet={<OneOperationView/>}/>}/>
                        <Route path="/past-periods" element={<PrivateRoute outlet={<PastPeriodsView/>}/>}/>
                    </Routes>
                </main>
            </Provider>
            <Footer/>
        </div>
    </UserContext.Provider>
};
