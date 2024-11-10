import { Component } from '@angular/core';
import { ScrollRevealComponent } from '../../../scroll-reveal/scroll-reveal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ScrollRevealComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
