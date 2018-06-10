import { Component, OnInit, Input } from '@angular/core';
import { BudgetService } from './service/budget.service';
import { Budget, BudgetWithItems, BudgetItem } from './domain/budget';
import { BudgetItemSnapshot } from './domain/budget-snapshot';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialog, DeleteDialogPayload } from '../common/dialog/delete.dialog.component';
import { BudgetItemService } from './service/budget-item.service';
import { SaveBudgetItemPayload, SaveBudgetItemDialog } from './dialog/save-budget-item.dialog.component';

@Component({
    selector: '[budget-item]',
    templateUrl: 'budget-item.component.html'
})
export class BudgetItemComponent {

    @Input() snapshot: BudgetItemSnapshot;
    @Input() budgetId: string;

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private budgetItemService: BudgetItemService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    public asDecimalDollars(cents: number) {
        return cents / 100.0;
    }

    public openDeleteItemConfirmDialog(snapshot: BudgetItemSnapshot): void {

        let dialogRef = this.dialog.open(DeleteDialog, {
            data: new DeleteDialogPayload('Delete Item?', 'Are you sure you want to delete this budget item?')
        });

        dialogRef.afterClosed().subscribe(shouldDelete => {
            if (shouldDelete) {
                this.budgetItemService.delete(this.budgetId, snapshot.budgetItem)
                .then(budget => {
                    this.showNotification(`Budget Item ${snapshot.budgetItem.name}`, 'Deleted');
                });
            }
        });
    }

    private showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    public openEditItemDialog(snapshot: BudgetItemSnapshot) {
        let dialogRef = this.dialog.open(SaveBudgetItemDialog, {
            data: new SaveBudgetItemPayload('Update a Budget Item', 'Update', snapshot.budgetItem)
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetItemService.update(this.budgetId, result.budgetItem)
                    .then(updatedBudgetItem => {
                        this.snapshot.budgetItem = updatedBudgetItem;
                        this.showNotification(`Budget item ${updatedBudgetItem.name}`, 'Updated');
                    });
            }
        });
    }

    public get isRemainingPositive() {
        return this.snapshot.remaining > 0;
    }

    public get isRemainingNegative() {
        return this.snapshot.remaining < 0;
    }
}