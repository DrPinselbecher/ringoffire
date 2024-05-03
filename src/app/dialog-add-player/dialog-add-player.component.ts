import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {

  name: string = '';

  constructor() { }

  onNoClick() {
    console.log(this.name);
  }
}
