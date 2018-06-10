import { Link } from "../../common/domain/link";

export class Budget {

    constructor(public name: string, public description: string) {}

    public links: Link[];
    public id: string;

    public static copy(budget: Budget): Budget {
        let copy = new Budget(budget.name, budget.description);
        copy.id = budget.id;
        return copy;
    }
}

export class BudgetWithItems extends Budget {

    constructor(budget: Budget, public items: BudgetItem[]) {
        super(budget.name, budget.description);
        this.id = budget.id;
    }
}

export class BudgetItem {

    public id: string;
    public name: string;
    public description: string;
    public amountPerFrequency: number;
    public frequency: string;
    public start: string;
    public end: string;
    public isActive: boolean;

    public static copy(item: BudgetItem): BudgetItem {
        let copy = new BudgetItem();
        copy.id = item.id;
        copy.name = item.name;
        copy.description = item.description;
        copy.amountPerFrequency = item.amountPerFrequency;
        copy.frequency = item.frequency;
        copy.start = item.start;
        copy.end = item.end;
        copy.isActive = item.isActive;

        return copy;
    }
}

export class ActiveBudget {
    public budgetId: string;
    public name: string;
    public items: ActiveBudgetItem[];
}

export class ActiveBudgetItem {
    public budgetItemId: string;
    public name: string;
}