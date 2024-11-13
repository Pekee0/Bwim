import { Component } from '@angular/core';
import { OraculoComponent } from '../../mingames/oraculo/oraculo.component';

@Component({
  selector: 'app-minigames-page',
  standalone: true,
  imports: [OraculoComponent],
  templateUrl: './minigames-page.component.html',
  styleUrl: './minigames-page.component.css'
})
export class MinigamesPageComponent {
  
}
