import { Component, Input } from '@angular/core';
import { Budget } from './domain/budget';

@Component({
    selector: 'budget-list-entry',
    templateUrl: 'budget-list-entry.component.html'
})
export class BudgetListEntryComponent {

    @Input("entry") budget: Budget;
}
