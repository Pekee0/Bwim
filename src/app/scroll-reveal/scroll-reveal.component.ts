// import { CommonModule } from '@angular/common';
// import { Component, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-scroll-reveal',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './scroll-reveal.component.html',
//   styleUrl: './scroll-reveal.component.css'
// })
// export class ScrollRevealComponent {

//   isScrolled = false;

//   @HostListener('window:scroll', [])
//   onScroll(): void {
//     const scrollPosition = window.scrollY;
//     this.isScrolled = scrollPosition > window.innerHeight * 0.24; // Comienza la transición un poco antes
//   }

// }

import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-reveal.component.html',
  styleUrl: './scroll-reveal.component.css'
})
export class ScrollRevealComponent {

  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > window.innerHeight * 0.24; // Comienza la transición un poco antes
  }

}