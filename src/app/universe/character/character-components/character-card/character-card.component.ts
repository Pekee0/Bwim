import { Component, Input } from '@angular/core';
import { Character } from '../../interface/interface';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input()
  character!: Character
}
