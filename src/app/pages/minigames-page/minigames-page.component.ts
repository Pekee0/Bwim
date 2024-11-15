import { Component, inject } from '@angular/core';
import { OraculoComponent } from '../../Components/mingames-component/oraculo/oraculo.component';
import { Router, RouterLink } from '@angular/router';
import { TestPersonalidadComponent } from '../../Components/mingames-component/test-personalidad/test-personalidad.component';

@Component({
  selector: 'app-minigames-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './minigames-page.component.html',
  styleUrl: './minigames-page.component.css'
})
export class MinigamesPageComponent {
  router = inject(Router)
}
