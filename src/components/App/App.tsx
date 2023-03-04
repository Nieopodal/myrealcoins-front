import React from 'react';

import './App.css';
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";
import {Provider} from "react-redux";
import {store} from "../../store";

export const App = () => {

  return <>
    <Header/>
    <Provider store={store}>
    <Dashboard/>
    </Provider>
    <Footer/>
  </>
};
