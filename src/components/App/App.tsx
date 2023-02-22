import React from 'react';

import './App.css';
import {Header} from "../Header/Header";
import {Dashboard} from "../Dashboard/Dashboard";
import {Footer} from "../Footer/Footer";

export const App = () => {

  return <>
    <Header/>
    <Dashboard/>
    <Footer/>
  </>
};
