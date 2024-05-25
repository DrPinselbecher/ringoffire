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

  async deletePlayer(i: number) {
    if (this.deletedPlayerIsLastPlayerInTheRowWithNextMove()) this.setNextPlayerToFirstPlayer();
    if (this.deletedPlayerIsLastPlayerInTheRowToMoved()) this.setRightIndexFromMovedPlayer();

    this.pushDeletedImageBack(i);
    this.game.players.splice(i, 1);
    await this.gameService.updateGame();
    localStorage.removeItem('playerName');
  }

  pushDeletedImageBack(i: number) {
    let deletedImage = this.game.players[i].image;
    let randomIndex = Math.floor(Math.random() * (this.game.playerProfileImages.length + 1));

    this.game.playerProfileImages.splice(randomIndex, 0, deletedImage);
  }

  setNextPlayerToFirstPlayer() {
    return this.game.nextPlayer = 0;
  }

  setRightIndexFromMovedPlayer() {
    return this.game.currentPlayer = -1;
  }

  deletedPlayerIsLastPlayerInTheRowWithNextMove() {
    return this.game.players.length - 1 === this.game.nextPlayer;
  }

  deletedPlayerIsLastPlayerInTheRowToMoved() {
    return this.game.players.length - 1 === this.game.nextPlayer;
  }
}