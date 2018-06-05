import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBudgetDialog } from './dialog/create-budget.dialog.component';
import { BudgetService } from './budgets.service';
import { Router } from '@angular/router';

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
        console.log("Create budget");

        let dialogRef = this.dialog.open(CreateBudgetDialog, {});
    
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
            if (result.shouldCreate) {
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