import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minigames-page',
  standalone: true,
  imports: [],
  templateUrl: './minigames-page.component.html',
  styleUrl: './minigames-page.component.css'
})
export class MinigamesPageComponent {
  router = inject(Router)
}
