import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game;

  constructor() {
    this.game = new Game();
    this.newGame();
  }

  takeCard() {
    this.pickCardAnimation = true;
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
}
