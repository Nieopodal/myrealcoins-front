import {Additional, BasicNeeds, FreeTime, PaymentCategory, PaymentSubcategory, Unexpected} from "types";

export const decodePaymentType = (category: PaymentCategory): string => {
    switch (category) {
        case (PaymentCategory.BasicNeeds): {
            return "Podstawowe";
        }
        case (PaymentCategory.Additional): {
            return 'Opcjonalne';
        }
        case (PaymentCategory.FreeTime): {
            return 'Kultura i czas wolny';
        }
        case (PaymentCategory.Unexpected): {
            return 'Nieprzewidziane';
        }
        default:
            return 'Nieprawidłowa kategoria danych';
    }
};

export const decodeOperationSubtype = (category: PaymentCategory, subcategory: PaymentSubcategory) => {
    if (category === PaymentCategory.BasicNeeds) {
        switch (subcategory) {
            case (BasicNeeds.Supermarket): {
                return "Supermarket";
            }
            case (BasicNeeds.HousingFees): {
                return "Mieszkanie";
            }
            case (BasicNeeds.Health): {
                return "Zdrowie";
            }
            case (BasicNeeds.Transport): {
                return "Paliwo i transport";
            }
            case (BasicNeeds.Baby): {
                return "Wydatki na dzieci";
            }
            case (BasicNeeds.Animals): {
                return "Wydatki na zwierzęta";
            }
            case (BasicNeeds.Communication): {
                return "Internet i telefon";
            }
            case (BasicNeeds.Other): {
                return "Inne";
            }
            default:
                return "Błędna podkategoria danych";
        }
    } else if (category === PaymentCategory.FreeTime) {
        switch (subcategory) {
            case (FreeTime.Movie): {
                return "Kino i VOD";
            }
            case (FreeTime.Music): {
                return "Muzyka";
            }
            case (FreeTime.Books): {
                return "Książki";
            }
            case (FreeTime.EatingOut): {
                return "Jedzenie na mieście";
            }
            case (FreeTime.BarAndCoffee): {
                return "Kawiarnia, bar"; //@TODO fix this name children
            }
            case (FreeTime.Tourism): {
                return "Turystyka, wycieczki";
            }
            case (FreeTime.SpecificHobby): {
                return "Hobby";
            }
            case (FreeTime.Other): {
                return "Inne";
            }
            default:
                return "Błędna podkategoria danych";
        }
    } else if (category === PaymentCategory.Additional) {
        switch (subcategory) {
            case (Additional.Shopping): {
                return "Zakupy, ubrania";
            }
            case (Additional.Loan): {
                return "Spłata pożyczki";
            }
            case (Additional.Cosmetics): {
                return "Kosmetyki";
            }
            case (Additional.FurnitureAndWhiteGoods): {
                return "Meble i sprzęt AGD";
            }
            case (Additional.Electronics): {
                return "Elektronika";
            }
            case (Additional.Taxis): {
                return "Taxi";
            }
            case (Additional.Other): {
                return "Inne";
            }
            default:
                return "Błędna podkategoria danych";
        }
    } else if (category === PaymentCategory.Unexpected) {
        switch (subcategory) {
            case (Unexpected.BabySitter): {
                return "Opiekunka";
            }
            case (Unexpected.Fixes): {
                return "Usterki, naprawy";
            }
            case (Unexpected.Other): {
                return "Inne";
            }
            default:
                return "Błędna podkategoria danych";
        }
    } else {
        return "Wystąpił nieznany błąd.";
    }

};