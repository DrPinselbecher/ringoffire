import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../game/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copie-link-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './copie-link-card.component.html',
  styleUrl: './copie-link-card.component.scss'
})
export class CopieLinkCardComponent {

  gameService: GameService = inject(GameService);

  fadeAnimation!: boolean;

  constructor() { }

  linkCopied() {
    this.copyToClipboard(window.location.href);
    this.fadeAnimation = true;
    setTimeout(() => {
      this.gameService.game.invLinkCopied = true;
      this.gameService.updateGame();
    }, 400);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
}
