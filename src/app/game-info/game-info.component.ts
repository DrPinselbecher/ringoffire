import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../models/game';
import { GameService } from '../game/game.service';

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
      { title: 'Bust a jive', description: 'The first player performs a dance move. The next player repeats the move and adds their own. The game continues until a player makes a mistake. That player must drink.' },
      { title: 'Chicks', description: 'All girls drink.' },
      { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
      { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
      { title: 'Thumbmaster', description: 'You are the Thumbmaster! At any point, place your thumb on the table. Everyone else must do the same. The last person to do it must drink. You remain Thumbmaster until someone else draws the card.' },
      { title: 'Men', description: 'All men drink.' },
      { title: 'Coinmaster', description: 'You are the Coinmaster! After each drawn card, you may select a player and flip a coin with them. If its heads, the selected player must drink, but if its tails, nothing happens. You remain Coinmaster until someone else draws the card.' },
      { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
      { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' }
    ],
    'de': [
      { title: 'Wasserfall', description: 'Alle müssen gleichzeitig anfangen zu trinken. Sobald Spieler 1 aufhört, darf Spieler 2 aufhören. Spieler 3 darf aufhören, sobald Spieler 2 aufhört, und so weiter.' },
      { title: 'Du', description: 'Du entscheidest, wer trinkt.' },
      { title: 'Ich', description: 'Glückwunsch! Trink einen Schnaps!' },
      { title: 'Kategorie', description: 'Denke dir eine Kategorie aus (z.B. Farben). Jeder Spieler muss einen Gegenstand aus der Kategorie aufzählen.' },
      { title: 'Tanz', description: 'Der erste Spieler führt eine Tanzbewegung vor. Der nächste Spieler wiederholt die Bewegung und fügt eine eigene hinzu. So geht es weiter, bis ein Spieler einen Fehler macht. Dieser Spieler muss trinken.' },
      { title: 'Mädels', description: 'Alle Mädchen trinken.' },
      { title: 'Himmel', description: 'Hände hoch! Der letzte Spieler trinkt!' },
      { title: 'Kumpel', description: 'Wähle einen Kumpel. Dein Kumpel muss immer trinken, wenn du trinkst, und umgekehrt.' },
      { title: 'Daumenmaster', description: 'Du bist der Daumenmaster! Lege irgendwann deinen Daumen auf den Tisch. Alle anderen müssen dies ebenfalls tun. Der letzte, der es schafft, muss trinken. Du bleibst Daumenmaster, bis jemand anderes die Karte zieht.' },
      { title: 'Männer', description: 'Alle Männer trinken.' },
      { title: 'Coinmaster', description: 'Du bist der Coinmaster! Nach jeder gezogenen Karte darfst du einen Spieler auswählen und mit ihm eine Münze werfen. Bei Kopf muss der ausgewählte Spieler trinken, bei Zahl passiert nichts. Du bleibst Coinmaster, bis jemand anderes die Karte zieht.' },
      { title: 'Ich hab noch nie...', description: 'Sag etwas, das du noch nie gemacht hast. Jeder, der es gemacht hat, muss trinken.' },
      { title: 'Regel', description: 'Mache eine Regel. Jeder muss trinken, wenn er die Regel bricht.' }
    ]
  };

  @Input() game!: Game;
  @Input() card: string | undefined;

  gameService: GameService = inject(GameService);

  title: string = '';
  description: string = '';


  ngOnChanges() {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardActions[this.game.language][cardNumber - 1].title;
      this.description = this.cardActions[this.game.language][cardNumber - 1].description;
      this.gameService.updateGame();
    }
  }
}