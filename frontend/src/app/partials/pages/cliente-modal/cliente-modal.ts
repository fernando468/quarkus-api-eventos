import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomButton } from '../../../components/custom-button/custom-button';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    CustomButton,
  ],
  selector: 'app-cliente-modal',
  styleUrl: './cliente-modal.css',
  templateUrl: './cliente-modal.html',
})
export class ClienteModal {
  readonly dialogRef = inject(MatDialogRef<ClienteModal>);
  readonly data = inject(MAT_DIALOG_DATA);

  onCancel = (): void => {
    this.dialogRef.close();
  };

  onConfirm = (): void => {
    this.dialogRef.close();
  };
}
