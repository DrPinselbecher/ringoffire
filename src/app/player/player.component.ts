import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() game!: Game;

  isCurrentUser(playerName: string): boolean {
    let currentPlayerName = localStorage.getItem('playerName');
    return currentPlayerName ? JSON.parse(currentPlayerName) === playerName : false;
  }
}