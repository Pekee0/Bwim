
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-scroll-reveal',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './scroll-reveal.component.html',
  styleUrl: './scroll-reveal.component.css'
})
export class ScrollRevealComponent {

  scrolledPastImage = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;

    // Ajusta la altura para cuando la imagen desaparece y el texto empieza a aparecer
    const triggerHeight = window.innerHeight * 0.7; // Reducido para empezar antes si es necesario

    this.scrolledPastImage = scrollPosition > triggerHeight;
  }
}
