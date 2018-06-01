import { Component, Input } from '@angular/core';
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
    private isEditing: boolean = false;
    private isDeleting: boolean = false;
    private isMousedOver: boolean = false;

    constructor(private budgetService: BudgetService) {}

    public commit() {
        if (this.isEditing) {
            this.budgetService.update(this.budget);
        }
        else if (this.isDeleting) {
            this.budgetService.delete(this.budget);
        }

        this.clearFlags();
    }

    private clearFlags() {
        this.isEditing = false;
        this.isDeleting = false;
        this.isMousedOver = false;
    }

    public startEdit() {
        this.isEditing = true;
    }

    public cancel() {
        this.clearFlags();
    }

    public startDelete() {
        this.isDeleting = true;
    }

    public getConfirmButtonText() {
        if (this.isEditing) {
            return "Save";
        }
        else if (this.isDeleting) {
            return "Delete";
        }
    }

    public setMousedOver() {
        this.isMousedOver = true;
    }

    public setNotMousedOver() {
        this.isMousedOver = false;
    }

    public shouldShowIcons() {
        return !this.shouldShowConfirmation() && this.isMousedOver;
    }

    public shouldShowConfirmation() {
        return this.isEditing || this.isDeleting;
    }
}