import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budgets.service';
import { Budget, BudgetWithItems, BudgetItem } from './budget';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BudgetSnapshot, BudgetItemSnapshot } from './budget-snapshot';
import { BudgetSnapshotService } from './budget-snapshot.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteBudgetDialog } from './dialog/delete-budget.dialog.component';
import { SaveBudgetPayload, SaveBudgetDialog } from './dialog/save-budget.dialog.component';

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

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private budgetService: BudgetService,
        private budgetSnapshotService: BudgetSnapshotService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    public ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {

            let budgetId = params['budgetId'];

            if (budgetId !== undefined) {
                this.budgetSnapshotService.findById(budgetId)
                    .subscribe(snapshot => this.snapshot = snapshot);
            }
            else {
                this.snapshot = undefined;
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

    private showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    public openDeleteConfirmDialog(): void {
        let dialogRef = this.dialog.open(DeleteBudgetDialog, {});

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

    public openEditDialog() {
        let dialogRef = this.dialog.open(SaveBudgetDialog, {
            data: new SaveBudgetPayload('Update a Budget', 'Update', this.snapshot.budget)
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetService.update(result.budget)
                    .subscribe(savedBudget => {
                        console.log(result);
                        this.snapshot.budget.name = result.budget.name;
                        this.snapshot.budget.description = result.budget.description;
                        this.showNotification(`Budget ${this.snapshot.budget.name}`, 'Updated');
                    });
            }
        });
    }

    public hasItems(): boolean {
        return this.hasMonthlyItems() || this.hasWeeklyItems();
    }

    public hasMonthlyItems(): boolean {
        return this.getMonthlyBudgetItems().length > 0;
    }

    public hasWeeklyItems(): boolean {
        return this.getWeeklyBudgetItems().length > 0;
    }
}