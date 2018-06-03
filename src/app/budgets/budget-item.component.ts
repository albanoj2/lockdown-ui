import { Component, OnInit, Input } from '@angular/core';
import { BudgetService } from './budgets.service';
import { Budget, BudgetWithItems, BudgetItem } from './budget';

@Component({
    selector: 'budget-item',
    templateUrl: 'budget-item.component.html',
    styleUrls: [
        'budget-item.component.css'
    ]
})
export class BudgetItemComponent {

    @Input() item: BudgetItem;

    public getAmountAsDecimal(): number {
        console.log(this);
        return this.item.amountPerFrequency / 100.0; 
    }
}