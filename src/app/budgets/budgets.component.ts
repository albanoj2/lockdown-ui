import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveBudgetDialog, SaveBudgetPayload } from './dialog/save-budget.dialog.component';
import { BudgetService } from './budgets.service';
import { Router } from '@angular/router';
import { Budget } from './budget';

@Component({
    selector: 'budgets',
    templateUrl: 'budgets.component.html',
    styleUrls: [
        'budgets.component.css'
    ]
})
export class BudgetsComponent {

    private isSpeedDialOpen: boolean = false;

    constructor(
        public dialog: MatDialog, 
        private budgetService: BudgetService,
        private router: Router) {}

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
        console.log("Create monthly budget item");
    }

    public createWeeklyBudgetItem() {
        console.log("Create weekly budget item");
    }
}