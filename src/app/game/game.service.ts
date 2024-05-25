import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;
  firestore: Firestore = inject(Firestore);
  docId!: string;

  constructor() {
    this.game = new Game();
  }

  getDocument() {
    let q = query(this.getGamesRef(), where('__name__', '==', this.docId));

    return onSnapshot(q, (list) => {
      list.forEach(el => {
        let data = el.data();
        this.processDocumentData(data);
        this.checkLocalStorageIfPlayerExist();
      });
      this.deleteLobbyIn10Hours(this.docId);
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
    this.game.pickCardAnimation = data["pickCardAnimation"];
    this.game.currentCard = data["currentCard"];
    this.game.currentRotation = data["currentRotation"];
    this.game.invLinkCopied = data["invLinkCopied"];
  }

  async deleteLobbyIn10Hours(docId: string) {
    setTimeout(async () => {
      let docRef = doc(this.firestore, 'games', docId);
      await deleteDoc(docRef);
    }, 10 * 60 * 60 * 1000);
  }

  checkLocalStorageIfPlayerExist() {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      let parsedPlayerName = JSON.parse(playerName);
      if (!this.game.players.find(player => player.name === parsedPlayerName)) {
        this.clearLocalStorage();
      }
    }
  }

  sclearLocalStorage(nameInBackend: string) {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      let parsedPlayerName = JSON.parse(playerName);
      if (parsedPlayerName !== nameInBackend) {
        localStorage.removeItem('playerName');
      }
    }
  }

  clearLocalStorage() {
    let playerName = localStorage.getItem('playerName');
    if (playerName) {
      localStorage.removeItem('playerName');
    }
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(callId: string, docId: string) {
    return doc(collection(this.firestore, callId), docId);
  }

  async updateGame() {
    let docRef = this.getSingleDocRef('games', this.docId);
    let newGame = this.game.toJson();

    await updateDoc(docRef, newGame).catch((err) => {
      console.error(err);
    }).then(() => {
      console.log('Update from the server, the docRef is:', docRef.id);
    });
  }
}
