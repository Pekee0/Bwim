import { Component } from '@angular/core';
import { UniverseCharacter } from '../interface/interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  character: UniverseCharacter | null = null

}
