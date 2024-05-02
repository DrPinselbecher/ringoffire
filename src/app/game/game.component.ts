import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule],
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

  setPlayer() {
    let image = this.game.playerProfileImages.pop();

    if (image !== undefined) {
      this.game.players.push({ name: 'HANSI FRANZI JIPII', image: image });
      console.log(image);
    }
  }
}
