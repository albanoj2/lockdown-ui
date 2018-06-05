import { Component, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Budget } from './budget';
import { BudgetService } from './budgets.service';
import { DeleteBudgetDialog } from './dialog/delete-budget.dialog.component';

@Component({
    selector: 'budget-list-entry',
    templateUrl: 'budget-list-entry.component.html',
    styleUrls: [
        'budget-list-entry.component.css'
    ]
})
export class BudgetListEntryComponent {

    @Input("entry") budget: Budget;

    constructor(
        private budgetService: BudgetService, 
        private snackBar: MatSnackBar,
        public dialog: MatDialog) {}

    public deleteBudget() {
        this.budgetService.delete(this.budget)
            .toPromise()
            .then(budget => this.showNotification(`Budget ${budget.name}`, 'Deleted'));
    }

    private showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    public openDeleteConfirmDialog(): void {
        let dialogRef = this.dialog.open(DeleteBudgetDialog, {});

        dialogRef.afterClosed().subscribe(shouldDelete => {
            if (shouldDelete) {
                this.deleteBudget();
            }
        });
    }
}