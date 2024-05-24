import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Game } from '../../models/game';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() game!: Game;
  gameService: GameService = inject(GameService);

  isCurrentUser(playerName: string): boolean {
    let currentPlayerName = localStorage.getItem('playerName');
    return currentPlayerName ? JSON.parse(currentPlayerName) === playerName : false;
  }

  deletePlayer(i: number) {
    this.game.players.splice(i, 1);
    localStorage.removeItem('playerName');
    this.gameService.updateGame();
  }
}