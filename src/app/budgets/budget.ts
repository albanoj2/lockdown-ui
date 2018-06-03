import { Link } from "../service/link";

export class Budget {

    constructor(public name: string, public description: string) {}

    public links: Link[];
    public id: string;
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
    public start: string;
    public end: string;
    public isActive: boolean;
}