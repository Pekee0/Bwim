import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortStoriesElements } from '../../interfaces/short-stories-elements';

@Component({
  selector: 'app-ss-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ss-menu.component.html',
  styleUrls: ['./ss-menu.component.css']
})
export class SsMenuComponent {
    
  shortStoriesArray: ShortStoriesElements[][] = [
    [
      {
        title: "Ecos Temporales",
        description: "Estuviste aquí antes, ¿verdad?",
        frontPage: 'assets/ETPortada.jpg',
        ssLinker: "/ecos-temporales"
      },
      {
        title: "Instantes",
        description: "¿Cual es el límite cuando tengo todo el tiempo del mundo?",
        frontPage: 'assets/FondoOficinaResized.png',
        ssLinker: "/instantes"
      }
    ]
  ];

  currentIndex = signal(0);

  nextSlide() {
    this.currentIndex.set((this.currentIndex() + 1) % this.shortStoriesArray[0].length);
  }

  prevSlide() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.shortStoriesArray[0].length) % this.shortStoriesArray[0].length
    );
  }
}