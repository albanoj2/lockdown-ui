import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'create-budget-item-dialog',
    templateUrl: 'create-budget-item.dialog.component.html',
    styleUrls: [
        'create-budget-item.dialog.component.css'
    ]
})
export class CreateBudgetItemDialog {

    private frequencies = [
        { text: 'Weekly', value: 'WEEKLY' },
        { text: 'Monthly', value: 'MONTHLY' },
    ]
  
    constructor(
        public dialogRef: MatDialogRef<CreateBudgetItemDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
        this.dialogRef.close();
    }
  
}