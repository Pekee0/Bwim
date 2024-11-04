import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-scroll-reveal',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
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
