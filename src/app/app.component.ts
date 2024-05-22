import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './shared/background/background.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { CommonModule } from '@angular/common';
import { LandscapeMessageComponent } from './shared/landscape-massage/landscape-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent, StartScreenComponent, CommonModule, LandscapeMessageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ringoffire';
  isInLandscapeMode: boolean = false;

  constructor() {
    this.checkDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkDimensions();
  }

  onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  ngOnInit(): void {
    this.checkDimensions();
  }

  private checkDimensions() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let userAgent = navigator.userAgent;
    let isMobile = /iPhone|iPod|android.*mobile/i.test(userAgent);

    this.isInLandscapeMode = width < 1000 && height < width && isMobile;
  }
}
