import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Budget } from '../budget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'create-budget-dialog',
    templateUrl: 'create-budget.dialog.component.html'
})
export class CreateBudgetDialog implements OnInit {

    private budget: Budget = new Budget('', '');
    private formGroup: FormGroup;
  
    constructor(
        public dialogRef: MatDialogRef<CreateBudgetDialog>,
        private builder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.formGroup = this.builder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
  
    public getCreateResult() {
        return { shouldCreate: true, budget: this.budget };
    }

    public getCancelResult() {
        return { shouldCreate: false };
    }

    public nameIsEmpty(): boolean {
        console.log(this.budget.name.length < 1);
        return this.budget.name === undefined || this.budget.name.length < 1;
    }

    public canCreate(): boolean {
        console.log(this.formGroup.status);
        return this.formGroup.status == 'VALID';
    }
}