import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation: boolean = false;
  currentCard: string | undefined = '';
  currentRotation: number = 0;

  game: Game;

  constructor() {
    this.game = new Game();
    this.newGame();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();
      this.currentRotation = Math.random() * 360;

      setTimeout(() => {
        if (this.currentCard) {
          this.setPlayedCard(this.currentCard, this.currentRotation);
        }
      }, 1000);
    }
  }

  setPlayedCard(card: string, rotation: number) {
    this.game.playedCards.push({ name: card, rotation: rotation });
    console.log(this.game.playedCards);
    this.pickCardAnimation = false;
  }

  setRandomDegNumber(): number {
    return Math.floor(Math.random() * 180);
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  getTransformStyle(): string {
    return `scale(1) translateX(284px) translateY(-11px) rotate(${this.currentRotation}deg)`;
  }
}
