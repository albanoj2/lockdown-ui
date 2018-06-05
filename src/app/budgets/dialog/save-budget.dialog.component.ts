import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Budget } from '../domain/budget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'save-budget-dialog',
    templateUrl: 'save-budget.dialog.component.html'
})
export class SaveBudgetDialog implements OnInit {

    private formGroup: FormGroup;
  
    constructor(
        public dialogRef: MatDialogRef<SaveBudgetDialog>,
        private builder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private payload: SaveBudgetPayload
    ) {}

    ngOnInit() {
        this.formGroup = this.builder.group({
            name: [this.payload.budget.name, Validators.required],
            description: [this.payload.budget.description, Validators.required],
        });
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
  
    public getSaveResults() {
        let budget = Budget.copy(this.payload.budget);
        budget.name = this.formName;
        budget.description = this.formDescription;
        return new SaveBudgetResults(true, budget);
    }

    private get formName() {
        return this.formGroup.get('name').value;
    }

    private get formDescription() {
        return this.formGroup.get('description').value;
    }

    public getCancelResults() {
        return new SaveBudgetResults(false);
    }

    public canSave(): boolean {
        return this.formGroup.status == 'VALID';
    }
}

export class SaveBudgetPayload {
    constructor(public title: string, public saveButtonText: string, public budget: Budget) {}
}

export class SaveBudgetResults {
    constructor(public shouldSave: boolean = false, public budget: Budget = undefined) {}
}