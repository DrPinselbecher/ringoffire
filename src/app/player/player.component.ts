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

  setImgToPlayer() {
    let image = this.game.playerProfileImages.pop();
    console.log(image);
    return image;
  }
}
