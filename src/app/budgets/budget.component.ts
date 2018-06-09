import { Component, OnInit } from '@angular/core';
import { BudgetService } from './service/budget.service';
import { Budget, BudgetWithItems, BudgetItem } from './domain/budget';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BudgetSnapshot, BudgetItemSnapshot } from './domain/budget-snapshot';
import { BudgetSnapshotService } from './service/budget-snapshot.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialog, DeleteDialogPayload } from '../common/dialog/delete.dialog.component';
import { SaveBudgetPayload, SaveBudgetDialog } from './dialog/save-budget.dialog.component';
import { BudgetItemService } from './service/budget-item.service';
import { SaveBudgetItemDialog, SaveBudgetItemPayload, SaveBudgetItemResults } from './dialog/save-budget-item.dialog.component';

@Component({
    selector: 'budget',
    templateUrl: 'budget.component.html',
    styleUrls: [
        'budget.component.css'
    ]
})
export class BudgetComponent implements OnInit {

    private snapshot: BudgetSnapshot;
    private paramsSubscription: Subscription;
    private budgetItemsChangedSubscription: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private budgetService: BudgetService,
        private budgetItemService: BudgetItemService,
        private budgetSnapshotService: BudgetSnapshotService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    public ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {

            let budgetId = params['budgetId'];

            if (budgetId !== undefined) {
                this.reloadBudget(budgetId);

                if (this.budgetItemsChangedSubscription) {
                    this.budgetItemsChangedSubscription.unsubscribe();
                }

                this.budgetItemsChangedSubscription = this.budgetItemService.onBudgetItemsChanged(budgetId)
                    .subscribe(_ => {
                        this.reloadBudget(budgetId);
                    });
            }
            else {
                this.snapshot = undefined;
            }
        });
    }

    private reloadBudget(budgetId: string) {
        this.budgetSnapshotService.findById(budgetId).subscribe(snapshot => this.snapshot = snapshot);
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
            return this.snapshot.budgetItems.filter(budgetItemSnapshot => budgetItemSnapshot.budgetItem.frequency == frequency);
        }
    }

    private showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    public openDeleteConfirmDialog(): void {
        let dialogRef = this.dialog.open(DeleteDialog, {
            data: new DeleteDialogPayload('Delete Budget?', 'Are you sure you want to delete this budget?')
        });

        dialogRef.afterClosed().subscribe(shouldDelete => {
            if (shouldDelete) {
                this.budgetService.delete(this.snapshot.budget)
                .toPromise()
                .then(budget => {
                    this.showNotification(`Budget ${budget.name}`, 'Deleted');
                    this.router.navigate(['budgets']);
                });
            }
        });
    }

    public openDeleteItemConfirmDialog(snapshot: BudgetItemSnapshot): void {

        let dialogRef = this.dialog.open(DeleteDialog, {
            data: new DeleteDialogPayload('Delete Item?', 'Are you sure you want to delete this budget item?')
        });

        dialogRef.afterClosed().subscribe(shouldDelete => {
            if (shouldDelete) {
                this.budgetItemService.delete(this.snapshot.budget.id, snapshot.budgetItem)
                .then(budget => {
                    this.showNotification(`Budget Item ${snapshot.budgetItem.name}`, 'Deleted');
                });
            }
        });
    }

    public openEditDialog() {
        let dialogRef = this.dialog.open(SaveBudgetDialog, {
            data: new SaveBudgetPayload('Update a Budget', 'Update', this.snapshot.budget)
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetService.update(result.budget)
                    .subscribe(savedBudget => {
                        this.snapshot.budget.name = result.budget.name;
                        this.snapshot.budget.description = result.budget.description;
                        this.showNotification(`Budget ${this.snapshot.budget.name}`, 'Updated');
                    });
            }
        });
    }

    public openEditItemDialog(snapshot: BudgetItemSnapshot) {
        let dialogRef = this.dialog.open(SaveBudgetItemDialog, {
            data: new SaveBudgetItemPayload('Update a Budget Item', 'Update', snapshot.budgetItem)
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetItemService.update(this.snapshot.budget.id, result.budgetItem)
                    .then(updatedBudgetItem => {
                        this.reloadBudget(this.snapshot.budget.id);
                        this.showNotification(`Budget item ${updatedBudgetItem.name}`, 'Updated');
                    });
            }
        });
    }
}