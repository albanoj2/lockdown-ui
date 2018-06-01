import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budgets.service';
import { Budget } from './budget';

@Component({
    selector: 'budget-list',
    templateUrl: 'budget-list.component.html',
    styleUrls: [
        'budget-list.component.css'
    ]
})
export class BudgetListComponent implements OnInit {

    private budgets: Budget[];

    constructor(private budgetService: BudgetService) {}

    public ngOnInit() {
        this.loadBudgetList();
        this.budgetService.whenUpdated().subscribe(updatedBudget => this.loadBudgetList());
        this.budgetService.whenDeleted().subscribe(updatedBudget => this.loadBudgetList());
    }

    private loadBudgetList() {
        this.budgetService.getBudgets()
            .subscribe(budgets => this.budgets = budgets);
    }

    public createBudget() {
        let budget = new Budget("foo");
        this.budgetService.createBudget(budget)
            .toPromise()
            .then(budget => this.loadBudgetList());
    }
}