<<<<<<< HEAD
import { Component } from '@angular/core';
import { OraculoComponent } from '../../Components/mingames-component/oraculo/oraculo.component';
=======
import { Component, inject } from '@angular/core';
import { OraculoComponent } from '../../Components/mingames-component/oraculo/oraculo.component';
import { Router, RouterLink } from '@angular/router';
import { TestPersonalidadComponent } from '../../Components/mingames-component/test-personalidad/test-personalidad.component';
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1

@Component({
  selector: 'app-minigames-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './minigames-page.component.html',
  styleUrl: './minigames-page.component.css'
})
export class MinigamesPageComponent {
<<<<<<< HEAD

=======
  router = inject(Router)
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1
}
