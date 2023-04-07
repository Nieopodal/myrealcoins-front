import {Additional, BasicNeeds, FreeTime, Unexpected } from "types";

export const allPaymentCategories = {
    basicNeeds: [
        BasicNeeds.Supermarket,
        BasicNeeds.HousingFees,
        BasicNeeds.Health,
        BasicNeeds.Transport,
        BasicNeeds.Baby,
        BasicNeeds.Animals,
        BasicNeeds.Communication,
        BasicNeeds.Other,
    ],
    freeTime: [
        FreeTime.Movie,
        FreeTime.Music,
        FreeTime.Books,
        FreeTime.EatingOut,
        FreeTime.BarAndCoffee,
        FreeTime.Tourism,
        FreeTime.SpecificHobby,
        FreeTime.Other,
    ],
    additional: [
        Additional.Shopping,
        Additional.Loan,
        Additional.Cosmetics,
        Additional.FurnitureAndWhiteGoods,
        Additional.Electronics,
        Additional.Taxis,
        Additional.Other,
    ],
    unexpected: [
        Unexpected.BabySitter,
        Unexpected.Fixes,
        Unexpected.Other,
    ],
};