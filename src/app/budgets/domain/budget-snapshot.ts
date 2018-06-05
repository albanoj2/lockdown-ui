import { BudgetItem, Budget } from "./budget";

export class BudgetSnapshot {
    public budget: Budget;
    public budgetItems: BudgetItemSnapshot[];
    public totalAccumulated: number;
    public totalDeposited: number;
    public totalExpensed: number;
    public totalRemaining: number;
}

export class BudgetItemSnapshot {
    public budgetItem: BudgetItem;
    public accumulated: number;
    public deposited: number;
    public expensed: number;
    public remaining: number;
}