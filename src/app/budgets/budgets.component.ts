import { Component } from '@angular/core';

@Component({
    selector: 'budgets',
    templateUrl: 'budgets.component.html',
    styleUrls: [
        'budgets.component.css'
    ]
})
export class BudgetsComponent {

    private isSpeedDialOpen: boolean = false;

    public openSpeedDial() {
        this.isSpeedDialOpen = true;
    }

    public closeSpeedDial() {
        this.isSpeedDialOpen = false;
    }

    public createBudget() {
        console.log("Create budget");
    }

    public createMonthlyBudgetItem() {
        console.log("Create monthly budget item");
    }

    public createWeeklyBudgetItem() {
        console.log("Create weekly budget item");
    }
}