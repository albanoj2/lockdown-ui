import { Component, OnInit, Input } from '@angular/core';
import { BudgetService } from './service/budget.service';
import { Budget, BudgetWithItems, BudgetItem } from './domain/budget';
import { BudgetItemSnapshot } from './domain/budget-snapshot';

@Component({
    selector: '[budget-item]',
    templateUrl: 'budget-item.component.html'
})
export class BudgetItemComponent {

    @Input() snapshot: BudgetItemSnapshot;

    public asDecimalDollars(cents: number) {
        return cents / 100.0;
    }
}