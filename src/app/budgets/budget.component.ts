import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budgets.service';
import { Budget, BudgetWithItems, BudgetItem } from './budget';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'budget',
    templateUrl: 'budget.component.html',
    styleUrls: [
        'budget.component.css'
    ]
})
export class BudgetComponent implements OnInit {

    displayedColumns = ['name', 'description', 'amount', 'accumulated', 'amountRemaining', 'percentRemaining', 'percentOfBudget'];
    private budget: BudgetWithItems;
    private paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private budgetService: BudgetService
    ) {}

    public ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {

            let budgetId = params['budgetId'];

            if (budgetId !== undefined) {
                this.budgetService.findByIdWithItems(budgetId)
                    .then(budget => this.budget = budget);
            }
            else {
                this.budget = undefined;
            }
        });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    public getAmountAsDecimal(item: BudgetItem): number {
        return item.amountPerFrequency / 100.0; 
    }

    public getWeeklyBudgetItems(): BudgetItem[] {
        return this.getBudgetItemsWithFrequency('WEEKLY');
    }

    public getMonthlyBudgetItems(): BudgetItem[] {
        return this.getBudgetItemsWithFrequency('MONTHLY');
    }

    private getBudgetItemsWithFrequency(frequency: string): BudgetItem[] {
        if (this.budget === undefined) {
            return [];
        }
        else {
            return this.budget.items.filter(item => item.frequency == frequency);
        }
    }
}