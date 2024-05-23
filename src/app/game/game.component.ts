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
import { Firestore, addDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collection, onSnapshot } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';


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

  firestore: Firestore = inject(Firestore);
  route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  game: Game;
  docId!: string;

  constructor() {
    this.game = new Game();
    this.route.params.subscribe((params) => this.docId = params["id"]);
    this.getDocument();
  }

  getDocument() {
    let q = query(this.getGamesRef(), where('__name__', '==', this.docId));

    return onSnapshot(q, (list) => {
      list.forEach(el => {
        let data = el.data();
        this.processDocumentData(data);
        this.checkPlayerNames();
      });
    });
  }

  processDocumentData(data: any) {
    this.game.players = data["players"];
    this.game.playerProfileImages = data["playerProfileImages"];
    this.game.stack = data["stack"];
    this.game.playedCards = data["playedCards"];
    this.game.currentPlayer = data["currentPlayer"];
    this.game.nextPlayer = data["nextPlayer"];
    this.game.maximalPlayersAllowed = data["maximalPlayersAllowed"];
  }

  checkPlayerNames() {
    if (this.game.players.length >= 1) {
      this.game.players.forEach(player => {
        this.clearLocalStorage(player.name);
      });
    } else {
      this.resetLocalStorage();
    }
  }

  resetLocalStorage() {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      localStorage.removeItem('playerName');
    }
  }

  clearLocalStorage(nameInBackend: string) {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      let parsedPlayerName = JSON.parse(playerName);
      if (parsedPlayerName !== nameInBackend) {
        localStorage.removeItem('playerName');
      }
    }
  }

  async updateGame(item: {}) {
    let docRef = this.getSingleDocRef('games', this.docId);

    await updateDoc(docRef, item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log("Update from the server, the docRef is:", docRef) }
    );
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(callId: string, docId: string) {
    return doc(collection(this.firestore, callId), docId);
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

  getTransformStyle(): string {
    return `scale(1) translateX(284px) translateY(-11px) rotate(${this.currentRotation}deg)`;
  }

  async setPlayer(name: string) {
    let image = this.game.playerProfileImages.pop();
    if (image !== undefined) {
      this.game.players.push({ name: name, image: image });
      this.updateNextPlayerIfNeeded();
      this.savePlayerToLocalStorage(name);
      await this.updateGame(this.game.toJson());
    }
  }

  savePlayerToLocalStorage(name: string) {
    localStorage.setItem('playerName', JSON.stringify(name));
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
    this.currentCard = undefined;
  }

  isSafariBrowserOnSmartphone() {
    let userAgent = navigator.userAgent;

    let isSafari = /safari/i.test(userAgent) && /version/i.test(userAgent) && !/chrome/i.test(userAgent);
    let isMobile = /iPhone|iPod/i.test(userAgent);

    return isSafari && isMobile;
  }
}
