import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation: boolean = false;
  currentCard: string | undefined = '';
  currentRotation: number = 0;

  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    this.newGame();
  }

  takeCard() {
    if (this.cardIsClickable()) {

      this.moveCardToTable();
      this.showCurrentPlayer();
      this.showNextPlayer();
    }
  }

  showCurrentPlayer() {
    if (this.game.currentPlayer < this.game.players.length - 1) {
      this.game.currentPlayer++;
    } else {
      this.game.currentPlayer = 0;
    }
  }

  showNextPlayer() {
    if (this.game.nextPlayer < this.game.players.length - 1) {
      this.game.nextPlayer++;
    } else {
      this.game.nextPlayer = 0;
    }
  }

  moveCardToTable() {
    this.pickCardAnimation = true;
    this.currentCard = this.game.stack.pop();
    this.currentRotation = Math.random() * 360;

    setTimeout(() => {
      if (this.currentCard) {
        this.setPlayedCard(this.currentCard, this.currentRotation);
      }
    }, 1000);
  }

  cardIsClickable() {
    return !this.pickCardAnimation && this.game.stack.length > 0 && this.game.players.length >= 2;
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

  setPlayer(name: string) {
    let image = this.game.playerProfileImages.pop();
    if (image !== undefined) {
      this.game.players.push({ name: name, image: image });
      this.updateNextPlayerIfNeeded();
    }
  }

  updateNextPlayerIfNeeded() {
    if (this.game.currentPlayer === this.game.players.length - 1) {
      this.game.nextPlayer = this.game.currentPlayer - 1;
    } else {
      this.game.nextPlayer = this.game.currentPlayer + 1;
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { playersLength: this.game.players.length }
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.setPlayer(name);
      }
    });
  }

  showCardStack(): number[] {
    let numberOfCards = Math.min(5, this.game.stack.length - 1);
    return Array.from({ length: numberOfCards }, (_, i) => i);
  }

  isCardStackEmpty() {
    return this.game.stack.length !== (this.game.stack.length - this.game.stack.length);
  }
}
