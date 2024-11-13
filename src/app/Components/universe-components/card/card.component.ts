import { Component, Input } from '@angular/core';
import { UniverseCharacter } from '../../../interfaces/universeCharacter.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input()
  character!: UniverseCharacter


}
