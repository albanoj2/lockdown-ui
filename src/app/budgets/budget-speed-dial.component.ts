import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveBudgetDialog, SaveBudgetPayload } from './dialog/save-budget.dialog.component';
import { BudgetService } from './service/budget.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget, BudgetItem } from './domain/budget';
import { SaveBudgetItemPayload, SaveBudgetItemDialog } from './dialog/save-budget-item.dialog.component';
import { BudgetItemService } from './service/budget-item.service';

@Component({
    selector: 'budget-speed-dial',
    templateUrl: 'budget-speed-dial.component.html',
    styleUrls: [
        'budget-speed-dial.component.css'
    ]
})
export class BudgetSpeedDialComponent implements OnInit {

    private budgetId: string;
    private isSpeedDialOpen: boolean = false;

    constructor(
        public dialog: MatDialog,
        private budgetService: BudgetService,
        private budgetItemService: BudgetItemService,
        private route: ActivatedRoute,
        private router: Router) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.budgetId = params['budgetId'];
        });
    }

    public get hasBudget() {
        return this.budgetId !== undefined;
    }

    public openSpeedDial() {
        this.isSpeedDialOpen = true;
    }

    public closeSpeedDial() {
        this.isSpeedDialOpen = false;
    }

    public createBudget() {
        let dialogRef = this.dialog.open(SaveBudgetDialog, {
            data: new SaveBudgetPayload('Create a Budget', 'Create', new Budget('', ''))
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetService.create(result.budget)
                    .subscribe(createdBudget => {
                        this.router.navigate(['budgets', createdBudget.id]);
                    });
            }
        });
    }

    public createMonthlyBudgetItem() {
        this.createBudgetItem('MONTHLY');
    }

    public createWeeklyBudgetItem() {
        this.createBudgetItem('WEEKLY');
    }

    private createBudgetItem(frequency: string) {
        let budgetItem = new BudgetItem();
        budgetItem.frequency = frequency;

        let dialogRef = this.dialog.open(SaveBudgetItemDialog, {
            data: new SaveBudgetItemPayload('Create a Budget Item', 'Create', budgetItem)
        });
    
        dialogRef.afterClosed().subscribe(result => {            
            if (result.shouldSave) {
                this.budgetItemService.create(this.budgetId, result.budgetItem);
            }
        });
    }
}