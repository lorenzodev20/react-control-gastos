import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react";
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

/**
 * Esta es la definición del Context
 * Se debe agregar a la aplicación de React
 */

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state])

    const remainingBudget = state.budget - totalExpenses;

    return (
        <BudgetContext.Provider value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget
        }}>
            {children}
        </BudgetContext.Provider>
    );
}