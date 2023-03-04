import { OperationType } from "types";

export const decodeOperationType = (type: OperationType) => {
    switch (type) {
        case (OperationType.AddToBudget): {
            return 'Wpłata do budżetu';
        }
        case (OperationType.Payment): {
            return 'Płatność';
        }
        case (OperationType.AddToSavings): {
            return 'Oszczędzanie';
        }
        case (OperationType.AddFromSavings): {
            return 'Wypłata z oszczędności';
        }
        case (OperationType.AddToCushion): {
            return 'Budowa poduszki finansowej';
        }
        case (OperationType.AddFromCushion): {
            return 'Wypłata z poduszki finansowej';
        }
        case (OperationType.BudgetReduction): {
            return 'Redukcja budżetu';
        }
        default: return 'Nieprawidłowy typ danych';
    }
};