import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Budget } from './budget';
import { BudgetService } from './budgets.service';

@Component({
    selector: 'budget',
    templateUrl: 'budget.component.html',
    styleUrls: [
        'budget.component.css'
    ]
})
export class BudgetComponent {

    @Input() budget: Budget;
    private description: string = "Some description";
    private isSelectedForDeletion: boolean = false;
    private isMousedOver: boolean = false;

    constructor(private budgetService: BudgetService, private snackBar: MatSnackBar) {}

    public selectForDeletion() {
        this.isSelectedForDeletion = true;
    }

    public delete() {
        this.budgetService.delete(this.budget)
            .toPromise()
            .then(budget => this.showNotification(`Budget ${budget.name}`, 'Deleted'));
        this.clearFlags();
    }

    private showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    private clearFlags() {
        this.isMousedOver = false;
        this.isSelectedForDeletion = false;
    }

    public cancel() {
        this.clearFlags();
    }

    public setMousedOver() {
        this.isMousedOver = true;
    }

    public setNotMousedOver() {
        this.isMousedOver = false;
    }

    public shouldShowIcons() {
        return this.isMousedOver;
    }
}