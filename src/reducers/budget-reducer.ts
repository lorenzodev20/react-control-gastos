import { v4 as uuidV4 } from "uuid";
import type { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'restart-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id']
}

const storageKeyBudget = 'budget';

const storageKeyExpenses = 'expenses';

const initialBudget = (): number => {
    const storage = localStorage.getItem(storageKeyBudget);
    return storage ? +storage : 0;
}

const initialExpenses = (): Expense[] => {
    const storage = localStorage.getItem(storageKeyExpenses)
    return storage ? JSON.parse(storage) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draft: DraftExpense): Expense => {
    return {
        ...draft,
        id: uuidV4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {

    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        };
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        };
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        };
    }
    if (action.type === 'add-expense') {
        return {
            ...state,
            expenses: [...state.expenses, createExpense(action.payload.expense)],
            modal: false
        };
    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
        };
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'restart-app') {

        localStorage.removeItem(storageKeyBudget);
        localStorage.removeItem(storageKeyExpenses);

        return {
            ...state,
            budget: 0,
            expenses: [],
            editingId: ''
        }
    }

    if(action.type === 'add-filter-category'){
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state;
}