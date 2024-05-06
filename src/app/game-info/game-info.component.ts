import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent {

  cardActions = {
    'en': [
      { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
      { title: 'You', description: 'You decide who drinks' },
      { title: 'Me', description: 'Congrats! Drink a shot!' },
      { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
      { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
      { title: 'Chicks', description: 'All girls drink.' },
      { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
      { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
      { title: 'Thumbmaster', description: '' },
      { title: 'Men', description: 'All men drink.' },
      { title: 'Quizmaster', description: '' },
      { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
      { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' }
    ],
    'de': [
      { title: 'Wasserfall', description: 'Alle müssen gleichzeitig anfangen zu trinken. Sobald Spieler 1 aufhört, darf Spieler 2 aufhören. Spieler 3 darf aufhören, sobald Spieler 2 aufhört, und so weiter.' },
      { title: 'Du', description: 'Du entscheidest, wer trinkt.' },
      { title: 'Ich', description: 'Glückwunsch! Trink einen Schnaps!' },
      { title: 'Kategorie', description: 'Denke dir eine Kategorie aus (z.B. Farben). Jeder Spieler muss einen Gegenstand aus der Kategorie aufzählen.' },
      { title: 'Tanz', description: 'Spieler 1 macht eine Tanzbewegung. Spieler 2 wiederholt die Tanzbewegung und fügt eine zweite hinzu.' },
      { title: 'Mädels', description: 'Alle Mädchen trinken.' },
      { title: 'Himmel', description: 'Hände hoch! Der letzte Spieler trinkt!' },
      { title: 'Kumpel', description: 'Wähle einen Kumpel. Dein Kumpel muss immer trinken, wenn du trinkst, und umgekehrt.' },
      { title: 'Daumenmaster', description: '' },
      { title: 'Männer', description: 'Alle Männer trinken.' },
      { title: 'Quizmaster', description: '' },
      { title: 'Ich hab noch nie...', description: 'Sag etwas, das du noch nie gemacht hast. Jeder, der es gemacht hat, muss trinken.' },
      { title: 'Regel', description: 'Mache eine Regel. Jeder muss trinken, wenn er die Regel bricht.' }
    ]
  };

  @Input() game!: Game;
  @Input() card: string | undefined;

  title: string = '';
  description: string = '';


  ngOnChanges() {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardActions[this.game.language][cardNumber - 1].title;
      this.description = this.cardActions[this.game.language][cardNumber - 1].description;
    }
  }

}