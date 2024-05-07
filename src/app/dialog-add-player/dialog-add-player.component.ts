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
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  maxLettersToWriteName: number = 14;
  name: string = '';
  addedPlayers: any;
  buttonDisableToSetName: boolean = true;
  players: { name: string, image: string }[];
  language: string;

  constructor(
    private dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { players: { name: string, image: string }[], language: string }
  ) {
    this.players = data.players;
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
    this.buttonDisableToSetName = inputLength === 0 || this.players.length === 9 || this.isNameExist(event.target.value);
  }

  isNameExist(name: string): boolean {
    return this.players.some(player => player.name.toLowerCase().trim() === name.toLowerCase().trim());
  }

  isPlayerExist(): boolean {
    return localStorage.getItem('playerName') !== null;
  }
}
