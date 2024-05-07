import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  maxLettersToWriteName: number = 14;
  name: string = '';
  addedPlayers: any;
  buttonDisableToSetName: boolean = true;
  playerLength: number;
  language: string;


  constructor(
    private dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { playersLength: number, language: string }
  ) {
    this.playerLength = data.playersLength;
    this.language = data.language;
  }

  closeDialog() {
    this.dialogRef.close(this.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInput(event: any) {
    let inputLength = event.target.value.length;
    this.maxLettersToWriteName = 14 - inputLength;
    this.buttonDisableToSetName = inputLength === 0 || this.playerLength === 9;
  }

  isPlayerExist(): boolean {
    return localStorage.getItem('playerName') !== null;
  }
}
