import * as moment from 'moment';


export class Transaction {
    public id: string;
    public date: Date;
    public name: string;
    public description: string;
    private amount: number;
    public isPending: boolean;
    public comment: string;
    public budgetItemIdMappings: BudgetItemMapping[];

    public static fromJson(data: any): Transaction {
        let transaction = new Transaction();
        transaction.id = data.id;
        transaction.date = new Date(data.date);
        transaction.name = data.name;
        transaction.description = data.description;
        transaction.amount = +data.amount;
        transaction.isPending = data.isPending;
        transaction.comment = data.comment;
        transaction.budgetItemIdMappings = data.budgetItemIdMappings !== undefined ? data.budgetItemIdMappings.map(BudgetItemMapping.fromJson) : undefined;
        return transaction;
    }

    public get amountAsDecimal() {
        return this.amount / 100.0;
    }

    public get shortDate() {
        return this.moment.format("MM/DD/YYYY")
    }

    public get moment() {
        return moment(this.date.toString());
    }

    public get timestamp() {
        return +this.moment.format("x")
    }
}

export class BudgetItemMapping {
    
    public budgetItemId: string;
    public amount: number;

    public static fromJson(json: any): BudgetItemMapping {
        let mapping = new BudgetItemMapping();
        mapping.budgetItemId = json.budgetItemId;
        mapping.amount = +json.amount;
        return mapping;
    }
}