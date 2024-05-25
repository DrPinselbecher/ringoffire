import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './game.service';


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
  firestore: Firestore = inject(Firestore);
  route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  game: Game;
  gameService: GameService = inject(GameService);
  firstPick: boolean = false;

  constructor() {
    this.route.params.subscribe((params) => this.gameService.docId = params["id"]);
    this.gameService.getDocument();
    this.game = this.gameService.game;
  }

  async takeCard() {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      let parsedPlayerName = JSON.parse(playerName);
      if (parsedPlayerName === this.game.players[0].name && !this.firstPick) {
        if (this.cardIsClickable()) {
          await this.moveCardToTable();
          await this.showCurrentPlayer();
          await this.showNextPlayer();
          await this.gameService.updateGame();
          this.firstPick = true;
        }
      } else {
        if (parsedPlayerName === this.game.players[this.game.nextPlayer].name) {
          if (this.cardIsClickable()) {
            await this.moveCardToTable();
            await this.showCurrentPlayer();
            await this.showNextPlayer();
            await this.gameService.updateGame();
          }
        }
      }
    }
    console.log(this.game.players[this.game.nextPlayer].name);
  }

  async showCurrentPlayer() {
    if (this.game.currentPlayer < this.game.players.length - 1) {
      this.game.currentPlayer++;
      await this.gameService.updateGame();
    } else {
      this.game.currentPlayer = 0;
      await this.gameService.updateGame();
    }
  }

  async showNextPlayer() {
    if (this.game.nextPlayer < this.game.players.length - 1) {
      this.game.nextPlayer++;
      await this.gameService.updateGame();
    } else {
      this.game.nextPlayer = 0;
      await this.gameService.updateGame();
    }
  }

  async moveCardToTable() {
    this.game.pickCardAnimation = true;
    this.game.currentCard = this.game.stack.pop();
    this.game.currentRotation = Math.random() * 360;
    await this.gameService.updateGame();

    setTimeout(() => {
      if (this.game.currentCard) {
        this.setPlayedCard(this.game.currentCard, this.game.currentRotation);
        this.gameService.updateGame();
      }
    }, 1000);
  }

  cardIsClickable() {
    return !this.game.pickCardAnimation && this.game.stack.length > 0 && this.game.players.length >= 2;
  }

  async setPlayedCard(card: string, rotation: number) {
    this.game.playedCards.push({ name: card, rotation: rotation });
    this.game.pickCardAnimation = false;
    await this.gameService.updateGame();
  }

  setRandomDegNumber(): number {
    return Math.floor(Math.random() * 180);
  }

  getTransformStyle(): string {
    return `scale(1) translateX(284px) translateY(-11px) rotate(${this.game.currentRotation}deg)`;
  }

  async setPlayer(name: string) {
    let image = this.game.playerProfileImages.pop();
    if (image !== undefined) {
      this.game.players.push({ name: name, image: image });
      this.updateNextPlayerIfNeeded();
      await this.gameService.updateGame();
      this.savePlayerToLocalStorage(name);
    }
  }

  savePlayerToLocalStorage(name: string) {
    localStorage.setItem('playerName', JSON.stringify(name));
  }

  async updateNextPlayerIfNeeded() {
    if (this.game.currentPlayer === this.game.players.length - 1) {
      this.game.nextPlayer = this.game.currentPlayer - 1;
      await this.gameService.updateGame();
    } else {
      this.game.nextPlayer = this.game.currentPlayer + 1;
      await this.gameService.updateGame();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: {
        players: this.game.players,
        language: this.game.language,
        maxPlayers: this.game.maximalPlayersAllowed
      }
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

  switchLanguage(language: "en" | "de") {
    this.game.language = language;
  }

  restartGame() {
    this.game.playedCards = [];
    this.game.setCards();
    this.game.currentCard = undefined;
  }

  isSafariBrowserOnSmartphone() {
    let userAgent = navigator.userAgent;

    let isSafari = /safari/i.test(userAgent) && /version/i.test(userAgent) && !/chrome/i.test(userAgent);
    let isMobile = /iPhone|iPod/i.test(userAgent);

    return isSafari && isMobile;
  }
}
