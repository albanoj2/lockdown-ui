import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BudgetItem } from '../domain/budget';


@Component({
    selector: 'save-budget-item-dialog',
    templateUrl: 'save-budget-item.dialog.component.html'
})
export class SaveBudgetItemDialog {

    private formGroup: FormGroup;
  
    constructor(
        public dialogRef: MatDialogRef<SaveBudgetItemDialog>,
        private builder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public payload: SaveBudgetItemPayload
    ) {}

    ngOnInit() {
        this.formGroup = this.builder.group({
            name: [this.payload.budgetItem.name, Validators.required],
            description: [this.payload.budgetItem.description, Validators.required],
            amount: [this.payload.budgetItem.amountPerFrequency, Validators.required]
        });
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }

    public getSaveResults() {
        let budgetItem = BudgetItem.copy(this.payload.budgetItem);
        budgetItem.name = this.formName;
        budgetItem.description = this.formDescription;
        budgetItem.amountPerFrequency = +this.formAmount * 100;
        return new SaveBudgetItemResults(true, budgetItem);
    }

    private get formName() {
        return this.formGroup.get('name').value;
    }

    private get formDescription() {
        return this.formGroup.get('description').value;
    }

    private get formAmount() {
        return this.formGroup.get('amount').value;
    }

    public getCancelResults() {
        return new SaveBudgetItemResults(false);
    }

    public canSave(): boolean {
        return this.formGroup.status == 'VALID';
    }
  
}

export class SaveBudgetItemPayload {
    constructor(public title: string, public saveButtonText: string, public budgetItem: BudgetItem) {}
}

export class SaveBudgetItemResults {
    constructor(public shouldSave: boolean = false, public budgetItem: BudgetItem = undefined) {}
}