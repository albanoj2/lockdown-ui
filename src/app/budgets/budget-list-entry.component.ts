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
    private isSelectedForDeletion: boolean = false;
    private isMousedOver: boolean = false;

    constructor(
        private budgetService: BudgetService, 
        private snackBar: MatSnackBar,
        public dialog: MatDialog) {}

    public selectForDeletion() {
        this.isSelectedForDeletion = true;
    }

    public deleteBudget() {
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

    public openDeleteConfirmDialog(): void {
        let dialogRef = this.dialog.open(DeleteBudgetDialog, {});

        dialogRef.afterClosed().subscribe(shouldDelete => {
            if (shouldDelete) {
                this.deleteBudget();
            }
        });
    }
}