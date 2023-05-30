import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <div mat-dialog-content>
      {{ message }}
    </div>
    <div mat-dialog-actions>
    <button mat-button mat-dialog-close color="primary">Cancel</button>
  <button mat-button mat-dialog [mat-dialog-close]="true" color="warn">Delete</button>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
}

