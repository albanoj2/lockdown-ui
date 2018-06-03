import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budgets.service';
import { Budget, BudgetWithItems, BudgetItem } from './budget';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { BudgetSnapshot, BudgetItemSnapshot } from './budget-snapshot';
import { BudgetSnapshotService } from './budget-snapshot.service';

@Component({
    selector: 'budget',
    templateUrl: 'budget.component.html',
    styleUrls: [
        'budget.component.css'
    ]
})
export class BudgetComponent implements OnInit {

    private budget: BudgetWithItems;
    private snapshot: BudgetSnapshot;
    private paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private budgetService: BudgetService,
        private budgetSnapshotService: BudgetSnapshotService
    ) {}

    public ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {

            let budgetId = params['budgetId'];

            if (budgetId !== undefined) {
                this.budgetService.findByIdWithItems(budgetId)
                    .then(budget => this.budget = budget);

                this.budgetSnapshotService.findById(budgetId)
                    .subscribe(snapshot => this.snapshot = snapshot);
            }
            else {
                this.budget = undefined;
            }
        });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    public getAmountAsDecimal(snapshot: BudgetItemSnapshot): number {
        return snapshot.budgetItem.amountPerFrequency / 100.0; 
    }

    public asDecimalDollars(cents: number) {
        return cents / 100.0;
    }

    public getWeeklyBudgetItems(): BudgetItemSnapshot[] {
        return this.getBudgetItemsWithFrequency('WEEKLY');
    }

    public getMonthlyBudgetItems(): BudgetItemSnapshot[] {
        return this.getBudgetItemsWithFrequency('MONTHLY');
    }

    private getBudgetItemsWithFrequency(frequency: string): BudgetItemSnapshot[] {
        if (this.snapshot === undefined) {
            return [];
        }
        else {
            return this.snapshot.budgetItems.filter(snapshot => snapshot.budgetItem.frequency == frequency);
        }
    }
}