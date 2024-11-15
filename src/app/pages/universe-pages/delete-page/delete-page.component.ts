import { Component } from '@angular/core';
import { CharacterDeleteComponent } from '../../../Components/universe-components/character-delete/character-delete.component';

@Component({
  selector: 'app-delete-page',
  standalone: true,
  imports: [CharacterDeleteComponent],
  templateUrl: './delete-page.component.html',
  styleUrl: './delete-page.component.css'
})
export class DeletePageComponent {

}
