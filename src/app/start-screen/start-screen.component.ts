import { Component, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  game: Game = new Game();
  docRef?: string;

  constructor() { }

  async newGame() {
    await this.addGame(this.game.toJson());
    if (this.docRef) {
      this.router.navigate(['/game/', this.docRef]);
    }
  }

  async addGame(item: {}) {
    try {
      let docRef: DocumentReference<DocumentData> = await addDoc(this.getGamesRef(), item);
      this.docRef = docRef.id;
    } catch (err) {
      console.error(err);
    }
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }
}
