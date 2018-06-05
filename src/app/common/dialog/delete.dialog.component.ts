import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete.dialog.component.html'
})
export class DeleteDialog {
  
    constructor(
        public dialogRef: MatDialogRef<DeleteDialog>,
        @Inject(MAT_DIALOG_DATA) public payload: DeleteDialogPayload
    ) {}
  
    onNoClick(): void {
        this.dialogRef.close();
    }
}

export class DeleteDialogPayload {
    constructor(public title: string, public description: string) {}
}